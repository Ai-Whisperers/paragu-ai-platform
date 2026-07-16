import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: 'https://golden-visa-advisory.paragu-ai.com/sitemap.xml',
    host: 'https://golden-visa-advisory.paragu-ai.com',
  }
}
