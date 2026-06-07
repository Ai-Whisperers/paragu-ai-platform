import { MetadataRoute } from "next"

const base = "https://granjacabral.paragu-ai.com"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `https://granjacabral.paragu-ai.com/admin/content`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ]
}
