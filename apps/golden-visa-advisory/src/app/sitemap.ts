import type { MetadataRoute } from 'next'

const SITE = 'https://goldenvisa.paragu-ai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${SITE}/`,            lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/investor`,    lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/business`,    lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ]
}
