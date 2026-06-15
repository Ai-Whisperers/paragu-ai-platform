import type { MetadataRoute } from 'next'

const SITE = 'https://www.ai-whisperers.org'
const LOCALES = ['en', 'es', 'nl', 'pt']
const PAGES = ['', '/services', '/portfolio', '/process', '/open-source', '/pricing', '/faq', '/changelog', '/about', '/contact', '/sales-sheet', '/what-we-dont-do']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return LOCALES.flatMap(lang =>
    PAGES.map(p => ({
      url: `${SITE}/${lang}${p}`,
      lastModified: now,
      changeFrequency: p === '' || p === '/changelog' ? 'weekly' : 'monthly',
      priority: p === '' ? 1.0 : p === '/services' || p === '/portfolio' ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map(alt => [`${SITE}/${alt}${p}`, alt])
        ),
      },
    }))
  )
}
