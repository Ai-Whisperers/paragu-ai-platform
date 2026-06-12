import type { MetadataRoute } from 'next'

const SITE = 'https://portas-barber.paragu-ai.com'

const ROUTES = [
    { path: "/", changefreq: "weekly", priority: 1.0 }
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
