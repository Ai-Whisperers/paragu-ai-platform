import type { MetadataRoute } from 'next'

const SITE = 'https://cabral.paragu-ai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${SITE}/`,          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE}/productos`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/mayorista`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/delivery`,  lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/faq`,       lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
