// app/api/health/route.js
//
// Weekly health check for the enquiry form, run by Vercel Cron (see
// vercel.json). It does two jobs:
//
// 1. KEEP-ALIVE - Upstash archives free databases after 30+ days with no
//    use. This route writes to Redis every week, so ours never goes quiet.
// 2. SMOKE TEST - checks each part of the enquiry pipeline without going
//    through the public form (which Turnstile deliberately blocks bots
//    from, and we don't want a bypass for):
//      - Upstash env vars present + Redis write/read round trip
//      - the rate limiter itself (same code path as the real form)
//      - every recipient key resolves to an address (env vars set)
//      - SMTP login to Fasthosts (transporter.verify(), sends nothing)
//      - on the FIRST run of each month, a real test email to the
//        website@ mailbox only - never to a trustee's address
//
// If anything fails it returns 500 (visible in Vercel's Cron Jobs / Logs)
// and, if SMTP still works, emails an alert to the website@ mailbox.
//
// Security: Vercel Cron sends "Authorization: Bearer <CRON_SECRET>"
// automatically once CRON_SECRET is set in the project's env vars. Every
// other caller gets a 401, so nobody can use this to trigger emails.
//
// Manual run (e.g. after rotating Upstash/SMTP credentials):
//   curl -H "Authorization: Bearer <CRON_SECRET>" \
//     "https://helenatkinrda.org.uk/api/health?sendTestEmail=1"

import { timingSafeEqual } from 'node:crypto';
import { Redis } from '@upstash/redis';
import { checkRateLimit } from '../../../lib/rate-limit';
import { RECIPIENTS, resolveRecipient } from '../../../lib/enquiry-recipients';
import { getTransporter, fromAddress } from '../../../lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // never cache - must hit Redis every run

const LAST_RUN_KEY = 'healthcheck:last-run';
const LAST_EMAIL_KEY = 'healthcheck:last-test-email'; // stores "YYYY-MM"

function isAuthorised(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // fail closed if the secret isn't configured
  const expected = Buffer.from(`Bearer ${secret}`);
  const actual = Buffer.from(request.headers.get('authorization') || '');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

// Runs one named check, recording pass/fail and any error message without
// letting one failure stop the remaining checks.
async function runCheck(results, name, fn) {
  try {
    const detail = await fn();
    results.push({ name, ok: true, ...(detail ? { detail } : {}) });
  } catch (err) {
    results.push({ name, ok: false, error: err?.message || String(err) });
  }
}

export async function GET(request) {
  if (!isAuthorised(request)) {
    return Response.json({ ok: false, error: 'Unauthorised' }, { status: 401 });
  }

  const now = new Date();
  const thisMonth = now.toISOString().slice(0, 7); // "YYYY-MM"
  const forceEmail = new URL(request.url).searchParams.get('sendTestEmail') === '1';
  const results = [];
  let redis = null;

  await runCheck(results, 'upstash-redis', async () => {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      // The exact problem we hit before: Vercel's integration set REDIS_URL
      // instead of the REST URL/token pair that Redis.fromEnv() needs.
      throw new Error('UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not set');
    }
    redis = Redis.fromEnv();
    const stamp = now.toISOString();
    await redis.set(LAST_RUN_KEY, stamp); // the write is the keep-alive
    const readBack = await redis.get(LAST_RUN_KEY);
    if (readBack !== stamp) throw new Error('Redis read-back did not match the write');
    return `wrote and read ${LAST_RUN_KEY}`;
  });

  await runCheck(results, 'rate-limiter', async () => {
    // Uses a fixed identifier that no real visitor IP can match. Once a
    // week is nowhere near the 5/hour limit, so this should always pass;
    // success:false here means the limiter is misconfigured (in production
    // checkRateLimit fails closed when Upstash env vars are missing).
    const { success } = await checkRateLimit('internal-healthcheck');
    if (!success) throw new Error('checkRateLimit returned success:false');
  });

  await runCheck(results, 'recipients', async () => {
    const missing = Object.keys(RECIPIENTS).filter((key) => !resolveRecipient(key));
    if (missing.length) throw new Error(`No address set for: ${missing.join(', ')}`);
    return `${Object.keys(RECIPIENTS).length} recipients resolve`;
  });

  await runCheck(results, 'smtp-login', async () => {
    await getTransporter().verify(); // logs in to Fasthosts, sends nothing
  });

  // Monthly real send - only to the website@ mailbox (the "accessibility"
  // recipient), and only if SMTP login worked.
  const smtpOk = results.find((r) => r.name === 'smtp-login')?.ok;
  if (smtpOk) {
    let sentThisMonth = false;
    if (redis) {
      try {
        sentThisMonth = (await redis.get(LAST_EMAIL_KEY)) === thisMonth;
      } catch {
        // If Redis is down that check has already failed above; skip the
        // dedupe rather than risk sending every week.
        sentThisMonth = true;
      }
    }
    if (forceEmail || !sentThisMonth) {
      await runCheck(results, 'monthly-test-email', async () => {
        const to = resolveRecipient('accessibility')?.address;
        if (!to) throw new Error('ENQUIRY_EMAIL_ACCESSIBILITY not set');
        await getTransporter().sendMail({
          from: fromAddress(),
          to,
          subject: `[Website health check] Enquiry form test - ${thisMonth}`,
          text: [
            'This is the automatic monthly test email from the Helen Atkin RDA website.',
            '',
            'If you are reading this, the enquiry form can send email through Fasthosts.',
            'If it landed in spam, mark it as "not spam" - that tells us real enquiries may be going there too.',
            '',
            'Checks run:',
            ...results.map((r) => `  ${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.error ? ` - ${r.error}` : ''}`),
            '',
            `Sent ${now.toISOString()} by /api/health (Vercel Cron). No action needed.`,
          ].join('\n'),
        });
        if (redis) await redis.set(LAST_EMAIL_KEY, thisMonth);
        return 'sent to the website@ mailbox';
      });
    }
  }

  const failures = results.filter((r) => !r.ok);

  if (failures.length) {
    console.error('Health check failed', failures);
    // Best-effort alert. If SMTP itself is the broken part this will fail
    // too, and the 500 in Vercel's logs is the only signal.
    try {
      const to = resolveRecipient('accessibility')?.address;
      if (to && smtpOk) {
        await getTransporter().sendMail({
          from: fromAddress(),
          to,
          subject: '[Website health check] FAILED - the enquiry form may be broken',
          text: [
            'The weekly website health check found a problem:',
            '',
            ...failures.map((f) => `  FAIL  ${f.name} - ${f.error}`),
            '',
            'Check Vercel > Project > Settings > Environment Variables, and the',
            '"Local dev gotchas" section of enquiry-form-architecture.md.',
          ].join('\n'),
        });
      }
    } catch (err) {
      console.error('Could not send health-check alert email', err);
    }
  }

  return Response.json(
    { ok: failures.length === 0, ranAt: now.toISOString(), results },
    { status: failures.length ? 500 : 200 }
  );
}
