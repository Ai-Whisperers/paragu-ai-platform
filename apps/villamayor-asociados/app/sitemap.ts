import type { MetadataRoute } from "next"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const content = raw as unknown as Content
const base = "https://villamayor.paragu-ai.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/servicios`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/nosotros`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${base}/contacto`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  ]

  const blogPages = content.blog.posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
