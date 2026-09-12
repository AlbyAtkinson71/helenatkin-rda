// lib/rate-limit.js
//
// Per-IP rate limiting for the enquiry endpoint, backed by Upstash Redis.
// Vercel functions are stateless between invocations, so an in-memory
// counter would only ever limit requests landing on the same warm
// instance - it would let a script through most of the time. Upstash's
// free tier (10k commands/day) is comfortably enough for a low-traffic
// charity contact form.
//
// Setup: add the "Upstash Redis" integration from the Vercel Marketplace
// (or create a free database at upstash.com) - it sets
// UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN automatically.
//
// npm install @upstash/redis @upstash/ratelimit

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let ratelimit = null;

function getRatelimit() {
  if (ratelimit) return ratelimit;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    // 5 submissions per IP per hour - generous for a genuine visitor,
    // tight enough to stop a script hammering the endpoint.
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    analytics: false,
    prefix: 'enquiry-form',
  });
  return ratelimit;
}

/**
 * Returns { success: boolean }. If Upstash isn't configured, fails CLOSED
 * in production (reject the request) but open in development, so local
 * work isn't blocked by missing env vars while a misconfigured production
 * deploy doesn't silently drop rate limiting.
 */
export async function checkRateLimit(ip) {
  const rl = getRatelimit();
  if (!rl) {
    return { success: process.env.NODE_ENV !== 'production' };
  }
  const { success } = await rl.limit(ip);
  return { success };
}
