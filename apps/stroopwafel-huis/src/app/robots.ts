import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://stroopwafel-huis.paragu-ai.com/sitemap.xml',
  }
}
