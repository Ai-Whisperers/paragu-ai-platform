import type { MetadataRoute } from "next"
import content from "@/content/es.json"

const base = "https://fun4me.paragu-ai.com"
const pages = ["", "/tienda", "/envio", "/faq", "/contacto", "/privacidad", "/terminos", "/nosotros", "/promociones", "/blog"]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = pages.map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: (path === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: path === "" ? 1 : 0.8,
  }))

  const blogPosts = (content.blog?.posts || []).map((post: any) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const productPages = (content.products || []).map((p: any) => ({
    url: `${base}/producto/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPosts, ...productPages]
}
