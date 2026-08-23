/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self';",
  },
];

// Detect build target via env var:
//   NEXT_BUILD_TARGET=export   → static export (GitHub Pages)
//   (unset)                     → standalone (Docker Swarm / VPS)
const isStaticExport = process.env.NEXT_BUILD_TARGET === 'export';

// /api/health only exists in standalone mode (Docker Swarm healthcheck).
// For static export, we move it to a dynamic route that gets tree-shaken.
// See src/app/api/health/route.ts — it uses dynamic = 'force-dynamic'
const nextConfig = {
  output: isStaticExport ? 'export' : 'standalone',
  trailingSlash: true,
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: true,
};

export default nextConfig;
