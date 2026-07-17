import type { NextConfig } from "next"
export default {
  output: "standalone",
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: true },
} as NextConfig
