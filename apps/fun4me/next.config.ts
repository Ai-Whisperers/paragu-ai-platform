import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      { source: '/images/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
  async redirects() {
    return [
      { source: '/producto/:id(\\\\\\\\d+)', destination: '/tienda', permanent: true },
      { source: '/carrito', destination: '/tienda', permanent: true },
      { source: '/ofertas', destination: '/promociones', permanent: true },
    ];
  },
};

export default nextConfig;
