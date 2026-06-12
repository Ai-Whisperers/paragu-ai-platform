import type { MetadataRoute } from 'next'

const SITE = 'https://superspuma.paragu-ai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${SITE}/`,           lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE}/tienda`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE}/nosotros`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/tiendas`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/guias`,      lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/garantia`,   lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/envios`,     lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/financiacion`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/promociones`, lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE}/combos`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
  ]
}
