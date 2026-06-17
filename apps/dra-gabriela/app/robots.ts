import type { MetadataRoute } from 'next'

const SITE_URL = 'https://dragabriela.paragu-ai.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Block any /api/ paths if they exist (none currently, future-proof)
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
