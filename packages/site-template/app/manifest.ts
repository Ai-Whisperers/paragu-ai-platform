import type { MetadataRoute } from "next"
import { getSiteName } from "@/lib/config/config"
export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  const siteName = getSiteName()
  return {
    name: siteName,
    short_name: siteName,
    description: "Sitio web profesional",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f9fa",
    theme_color: "#1a1a2e",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  }
}