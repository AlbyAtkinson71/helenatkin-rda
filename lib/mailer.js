// lib/mailer.js
//
// Shared nodemailer transporter for the Fasthosts SMTP mailbox. Used by
// the enquiry form (app/api/enquiry/route.js) and the weekly health check
// (app/api/health/route.js), so both always use the same SMTP settings.
// Server-only - never import this from a client component.

import nodemailer from 'nodemailer';

let transporter = null;

export function getTransporter() {
  if (transporter) return transporter;
  const port = Number(process.env.SMTP_PORT || 465);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g. smtp.livemail.co.uk - confirm exact value in the Fasthosts control panel
    port,
    secure: port === 465, // true for port 465 (SSL/TLS), false for 587 (STARTTLS)
    auth: {
      user: process.env.SMTP_USER, // full mailbox address, e.g. noreply@helenatkinrda.org.uk - a DEDICATED mailbox, not a trustee's personal one
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

// A dedicated no-reply mailbox on the site's own domain - never a
// trustee's personal inbox - so the credentials sitting in the function's
// environment variables are low-value if ever exposed.
export function fromAddress() {
  return `"Helen Atkin RDA website" <${process.env.SMTP_USER}>`;
}
