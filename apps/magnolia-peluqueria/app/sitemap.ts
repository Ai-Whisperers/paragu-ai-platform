import type { MetadataRoute } from "next"

export const dynamic = "force-static"

// Direct import from JSON so we don't need to fight ESM/CJS
import postsEs from "@/content/blog/posts-es.json"

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = "https://magnolia-peluqueria.paragu-ai.com"

  const staticPages = [
    { path: "/es", priority: 1.0, freq: "weekly" as const },
    { path: "/es/servicios", priority: 0.9, freq: "monthly" as const },
    { path: "/es/contacto", priority: 0.6, freq: "monthly" as const },
    { path: "/es/nosotros", priority: 0.6, freq: "monthly" as const },
    { path: "/es/faq", priority: 0.6, freq: "monthly" as const },
    { path: "/es/booking", priority: 0.9, freq: "weekly" as const },
    { path: "/es/privacidad", priority: 0.3, freq: "yearly" as const },
    { path: "/es/terminos", priority: 0.3, freq: "yearly" as const },
    { path: "/es/blog", priority: 0.8, freq: "weekly" as const },
    { path: "/es/ofertas", priority: 0.7, freq: "weekly" as const },
    { path: "/es/tarjetas-de-regalo", priority: 0.7, freq: "monthly" as const },
  ]

  const allPosts = postsEs.posts ?? []
  const blogPages = allPosts.map((p: { slug: string }) => ({
    url: `${domain}/es/blog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    ...staticPages.map(({ path, priority, freq }) => ({
      url: `${domain}${path}`,
      lastModified: new Date(),
      changeFrequency: freq,
      priority,
    })),
    ...blogPages,
  ]
}