import type { MetadataRoute } from 'next'

const SITE = 'https://bufete-mendez.paragu-ai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${SITE}/`,         lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE}/servicios`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/equipo`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/casos`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/faq`,       lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/contacto`,  lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]
}
