import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: 'https://bufete-mendez.paragu-ai.com/sitemap.xml',
    host: 'https://bufete-mendez.paragu-ai.com',
  }
}
