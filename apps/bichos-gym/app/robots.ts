import type { MetadataRoute } from "next"
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://bichos-gym.paragu-ai.com/sitemap.xml",
  }
}
