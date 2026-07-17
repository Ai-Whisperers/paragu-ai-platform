import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co https://www.googletagmanager.com https://*.google-analytics.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https://*.supabase.co https://nominatim.openstreetmap.org https://*.tile.openstreetmap.org https://api.resend.com https://*.google-analytics.com https://*.googletagmanager.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" },
];

const config: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  trailingSlash: false,
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      { source: '/images/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      // Note: Next.js handles Cache-Control for /_next/* internally with content-hashed
      // filenames. Setting a custom Cache-Control there breaks dev behavior — leave it
      // to the framework.
    ]
  },
}
export default config
