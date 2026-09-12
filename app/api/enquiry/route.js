// app/api/enquiry/route.js
//
// Server-side handler for the on-page enquiry form. This is the only place
// that ever sees a real mailbox address - the browser only ever posts a
// recipient *key* (see lib/enquiry-recipients.js) plus the visitor's own
// details, and gets back a plain { ok: true/false } with no address in it.
//
// Sends via the Fasthosts mailbox's own SMTP server (nodemailer), rather
// than a transactional email API - see the "SMTP via Fasthosts" section of
// claude/enquiry-form-architecture.md for the tradeoffs and setup steps.
//
// npm install nodemailer

import nodemailer from 'nodemailer';
import { resolveRecipient } from '../../../lib/enquiry-recipients';
import { checkRateLimit } from '../../../lib/rate-limit';

export const runtime = 'nodejs'; // nodemailer needs Node, not the edge runtime

const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g. smtp.livemail.co.uk - confirm exact value in the Fasthosts control panel
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465, // true for port 465 (SSL/TLS), false for 587 (STARTTLS)
    auth: {
      user: process.env.SMTP_USER, // full mailbox address, e.g. noreply@helenatkinrda.org.uk - a DEDICATED mailbox, not a trustee's personal one
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

// Strips characters that have no business in a plain-text form field but
// could otherwise be used to inject headers or markup - not a full HTML
// sanitiser, because none of these fields are ever rendered as HTML.
function clean(value) {
  return String(value ?? '')
    .replace(/[\r\n\t]/g, ' ')
    .replace(/[<>]/g, '')
    .trim();
}

function getClientIp(request) {
  // Vercel sets x-forwarded-for; take the first (client) address.
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || '0.0.0.0';
}

async function verifyTurnstile(token, ip) {
  if (!token) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip,
    }),
  });
  const data = await res.json();
  return data.success === true;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Malformed request.' }, { status: 400 });
  }

  const {
    recipient,
    name,
    email,
    message,
    // Hidden field, kept empty by real visitors and styled off-screen with
    // CSS (not display:none, which some bots detect) - see EnquiryModal.js.
    company,
    turnstileToken,
  } = body || {};

  const recipientEntry = resolveRecipient(recipient);
  if (!recipientEntry) {
    return Response.json({ ok: false, error: 'Unknown recipient.' }, { status: 400 });
  }

  // Honeypot: real users never see or fill this field. Return a fake
  // success so scripts that check the response can't tell it was dropped.
  if (company) {
    return Response.json({ ok: true });
  }

  const ip = getClientIp(request);

  const { success: withinRateLimit } = await checkRateLimit(ip);
  if (!withinRateLimit) {
    return Response.json(
      { ok: false, error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  const turnstileOk = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileOk) {
    return Response.json({ ok: false, error: 'Verification failed. Please try again.' }, { status: 400 });
  }

  const cleanName = clean(name).slice(0, MAX_NAME_LENGTH);
  const cleanEmail = clean(email);
  const cleanMessage = clean(message).slice(0, MAX_MESSAGE_LENGTH);

  if (!cleanName || !cleanMessage || !EMAIL_RE.test(cleanEmail)) {
    return Response.json({ ok: false, error: 'Please fill in every field with a valid email.' }, { status: 400 });
  }

  try {
    await getTransporter().sendMail({
      // A dedicated no-reply mailbox on the site's own domain - never a
      // trustee's personal inbox - so the credentials sitting in this
      // function's environment variables are low-value if ever exposed.
      from: `"Helen Atkin RDA website" <${process.env.SMTP_USER}>`,
      to: recipientEntry.address,
      replyTo: cleanEmail,
      subject: `${recipientEntry.subject} - ${cleanName}`,
      text: `From: ${cleanName} <${cleanEmail}>\n\n${cleanMessage}`,
    });
  } catch (err) {
    console.error('Enquiry email failed to send', err);
    return Response.json({ ok: false, error: 'Could not send your message. Please try again shortly.' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
