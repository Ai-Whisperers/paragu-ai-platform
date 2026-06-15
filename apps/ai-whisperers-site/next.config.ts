import type { NextConfig } from "next"

const config: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    return [
      // apex + www → default lang
      { source: "/", destination: "/en", permanent: false },
      // legacy root-redirect
      { source: "/es", destination: "/es/", permanent: true },
      { source: "/nl", destination: "/nl/", permanent: true },
      { source: "/pt", destination: "/pt/", permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none'" },
        ],
      },
    ]
  },
}

export default config
