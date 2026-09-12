/** @type {import('next').NextConfig} */

const securityHeaders = [
{
  key: 'Content-Security-Policy',
  value: [
    "default-src 'self'",
    // https://challenges.cloudflare.com added for the Turnstile widget used
    // by the enquiry form (app/components/EnquiryModal.jsx) - it loads a
    // script, renders in an iframe, and calls back to Cloudflare as part of
    // the challenge, so it needs all three of script-src/frame-src/connect-src.
    `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://challenges.cloudflare.com",
    "frame-src 'self' https://www.youtube-nocookie.com https://challenges.cloudflare.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
},
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig = {
  reactCompiler: true,

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  images: {
    // Whitelist only trusted image domains (fixed typo + updated to remotePatterns)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'helenatkinrda.org.uk',
      },
      {
        protocol: 'https',
        hostname: 'buxtonrda.org.uk',
      },
    ],
    // Disallow SVGs from remote sources to prevent XSS via SVG
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;