import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: 'https://reina-de-copas.paragu-ai.com/sitemap.xml',
    host: 'https://reina-de-copas.paragu-ai.com',
  }
}
