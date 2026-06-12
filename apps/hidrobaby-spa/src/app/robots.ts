import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: 'https://hidrobaby-spa.paragu-ai.com/sitemap.xml',
    host: 'https://hidrobaby-spa.paragu-ai.com',
  }
}
