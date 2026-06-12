import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: 'https://arnos.paragu-ai.com/sitemap.xml',
    host: 'https://arnos.paragu-ai.com',
  }
}
