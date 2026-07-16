const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://qyvokpribmbrosafntqa.supabase.co; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.google-analytics.com https://static.cloudflareinsights.com https://qyvokpribmbrosafntqa.supabase.co; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';",
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: true },
  serverExternalPackages: ['@supabase/supabase-js', 'pg'],
  // Map @ai-whisperers/* workspace packages to their compiled dist/ for Turbopack
  turbopack: {
    resolveAlias: {
      "@ai-whisperers/admin": "../../packages/@ai-whisperers/admin",
      "@ai-whisperers/auth": "../../packages/@ai-whisperers/auth",
      "@ai-whisperers/catalog": "../../packages/@ai-whisperers/catalog",
      "@ai-whisperers/checkout": "../../packages/@ai-whisperers/checkout",
      "@ai-whisperers/client-kit": "../../packages/@ai-whisperers/client-kit",
      "@ai-whisperers/commerce": "../../packages/@ai-whisperers/commerce",
      "@ai-whisperers/content": "../../packages/@ai-whisperers/content",
      "@ai-whisperers/product": "../../packages/@ai-whisperers/product",
      "@ai-whisperers/seo": "../../packages/@ai-whisperers/seo",
      "@ai-whisperers/sections": "../../packages/@ai-whisperers/sections",
      "@ai-whisperers/theme": "../../packages/@ai-whisperers/theme",
      "@ai-whisperers/ui": "../../packages/@ai-whisperers/ui",
      "@ai-whisperers/ui-extras": "../../packages/@ai-whisperers/ui-extras",
      "@ai-whisperers/whatsapp": "../../packages/@ai-whisperers/whatsapp",
      "@ai-whisperers/payments": "../../packages/@ai-whisperers/payments",
      "@ai-whisperers/api-helpers": "../../packages/@ai-whisperers/api-helpers",
      "@ai-whisperers/i18n": "../../packages/@ai-whisperers/i18n",
    },
  },
  transpilePackages: [
    "@ai-whisperers/*",
  ],
  experimental: {
    webpackBuildWorker: false,
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      { source: '/images/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/fonts/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/favicon.ico', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }] },
    ]
  }
}

module.exports = nextConfig
