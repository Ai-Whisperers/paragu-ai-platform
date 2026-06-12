import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: 'https://camilo-acosta.paragu-ai.com/sitemap.xml',
    host: 'https://camilo-acosta.paragu-ai.com',
  }
}
