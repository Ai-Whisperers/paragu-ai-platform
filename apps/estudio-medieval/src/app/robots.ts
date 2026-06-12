import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: 'https://estudio-medieval.paragu-ai.com/sitemap.xml',
    host: 'https://estudio-medieval.paragu-ai.com',
  }
}
