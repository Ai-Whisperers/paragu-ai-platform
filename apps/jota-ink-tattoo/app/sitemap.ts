import type { MetadataRoute } from "next"
import content from "@/content/es.json"

const c = content as Record<string, any>
const base = "https://jota-ink-tattoo.paragu-ai.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: base, priority: 1.0 },
    { url: `${base}/trabajo`, priority: 0.9 },
    { url: `${base}/servicios`, priority: 0.8 },
    { url: `${base}/faq`, priority: 0.7 },
    { url: `${base}/contacto`, priority: 0.6 },
  ]

  return staticPages.map(({ url, priority }) => ({
    url,
    lastModified: new Date(),
    changeFrequency: url === base ? "weekly" as const : "monthly" as const,
    priority,
  }))
}
