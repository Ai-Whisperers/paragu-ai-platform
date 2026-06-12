import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: 'https://de-abasto-a-casa.paragu-ai.com/sitemap.xml',
    host: 'https://de-abasto-a-casa.paragu-ai.com',
  }
}
