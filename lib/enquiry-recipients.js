// lib/enquiry-recipients.js
//
// Server-only recipient directory. This file is imported ONLY by the API
// route (app/api/enquiry/route.js) - never by a client component - so the
// real mailbox addresses never reach the browser bundle. Client code only
// ever knows a recipient *key* (e.g. "new-rider"), never the address behind
// it.
//
// The actual addresses live in environment variables (set in Vercel's
// Project Settings > Environment Variables, not committed to the repo),
// so the .js source itself never contains a real inbox either - useful if
// this file is ever viewed publicly (e.g. accidentally committed, or via a
// source map) and it stops the address changing from requiring a deploy.

export const RECIPIENTS = {
  'new-rider': {
    name: 'Janine Frost',
    role: 'Chairperson',
    subject: 'New rider enquiry',
    envVar: 'ENQUIRY_EMAIL_NEW_RIDER',
  },
  volunteering: {
    name: 'Deborah Ward',
    role: 'Secretary',
    subject: 'Volunteering enquiry',
    envVar: 'ENQUIRY_EMAIL_VOLUNTEERING',
  },
  accessibility: {
    // Not a named trustee - this is the site's own website@ mailbox
    // (already used on the accessibility statement), kept as a separate
    // recipient key/env var so it stays swappable without touching code.
    name: 'the website team',
    role: '',
    subject: 'Accessibility feedback',
    envVar: 'ENQUIRY_EMAIL_ACCESSIBILITY',
  },
};

/**
 * Resolve a client-supplied recipient key to the real mailbox address.
 * Returns null if the key is unknown or the env var isn't set - callers
 * must treat either case as "reject the request", not fall back to a
 * default address.
 */
export function resolveRecipient(key) {
  const entry = RECIPIENTS[key];
  if (!entry) return null;
  const address = process.env[entry.envVar];
  if (!address) return null;
  return { ...entry, address };
}
