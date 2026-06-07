import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },

  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif)',
        locale: false,
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:all*(js|css)',
        locale: false,
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  experimental: {
    optimizePackageImports: ['lucide-react', '@ai-whisperers/ui'],
  },

  serverExternalPackages: ['@supabase/supabase-js', 'stripe', '@node-rs/argon2'],
}

export default nextConfig