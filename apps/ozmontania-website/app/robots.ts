import type { MetadataRoute } from 'next'
import es from '@/content/es.json'
import type { SiteContent } from '@/types/content'

const content = es as unknown as SiteContent

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/admin/'],
    },
    sitemap: `${content.site.url}/sitemap.xml`,
  }
}
