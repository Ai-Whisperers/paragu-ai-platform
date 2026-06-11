import type { NextConfig } from "next"

const config: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/reservar",
        destination: "https://wa.me/595974202025?text=Hola!%20Quiero%20reservar%20una%20sesi%C3%B3n%20de%20depilaci%C3%B3n%20l%C3%A1ser%20IPL",
        permanent: true,
      },
      {
        source: "/admin",
        destination: "https://wa.me/595974202025",
        permanent: true,
      },
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
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self'; connect-src 'self' https:; frame-ancestors 'none'" },
        ],
      },
      {
        source: "/depiflash/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/favicon(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/apple-touch-icon.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ]
  },
}
export default config
