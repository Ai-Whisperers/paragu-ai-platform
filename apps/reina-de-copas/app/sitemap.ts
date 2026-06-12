import type { MetadataRoute } from 'next'

const SITE = 'https://reina-de-copas.paragu-ai.com'

const ROUTES = [
    { path: "/", changefreq: "weekly", priority: 1.0 },
    { path: "/nosotros", changefreq: "monthly", priority: 0.7 },
    { path: "/tienda", changefreq: "monthly", priority: 0.7 },
    { path: "/comunidad", changefreq: "monthly", priority: 0.7 },
    { path: "/faq", changefreq: "monthly", priority: 0.7 },
    { path: "/producto", changefreq: "monthly", priority: 0.7 },
    { path: "/guia", changefreq: "monthly", priority: 0.7 },
    { path: "/quiz", changefreq: "monthly", priority: 0.7 }
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
