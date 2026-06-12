import type { MetadataRoute } from 'next'

const SITE = 'https://hidrobaby-spa.paragu-ai.com'

const ROUTES = [
    { path: "/", changefreq: "weekly", priority: 1.0 },
    { path: "/nosotros", changefreq: "monthly", priority: 0.7 },
    { path: "/servicios", changefreq: "monthly", priority: 0.7 },
    { path: "/contacto", changefreq: "monthly", priority: 0.7 }
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
