import type { NextConfig } from "next"
export default {
  output: "standalone",
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
} as NextConfig
