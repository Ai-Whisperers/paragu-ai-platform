import type { MetadataRoute } from 'next'

const SITE = 'https://fun4me-store.paragu-ai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
  ]
}
