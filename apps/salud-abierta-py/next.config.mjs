/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
  // CSP: NO third-party tracking. NO analytics. NO Meta Pixel.
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self';",
  },
];

const nextConfig = {
  output: 'standalone',  // Docker Swarm compatible (vs 'export' for static)
  trailingSlash: true,   // match static export behavior
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: true,
};

export default nextConfig;
