import type { MetadataRoute } from 'next'

const SITE = 'https://camilo-acosta.paragu-ai.com'

const ROUTES = [
    { path: "/", changefreq: "weekly", priority: 1.0 },
    { path: "/shows", changefreq: "monthly", priority: 0.7 },
    { path: "/bio", changefreq: "monthly", priority: 0.7 },
    { path: "/contacto", changefreq: "monthly", priority: 0.7 },
    { path: "/videos", changefreq: "monthly", priority: 0.7 }
  ]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return ROUTES.map(r => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changefreq as any,
    priority: r.priority,
  }))
}
