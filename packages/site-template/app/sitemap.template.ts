import type { MetadataRoute } from 'next'

/**
 * Multi-locale sitemap template — copy this into `app/sitemap.ts` when
 * adding i18n to a single-locale site. Pattern proven in cuidadaomiga.
 *
 * Reference: apps/cuidadoamiga/app/sitemap.ts (the original implementation)
 *
 * Usage:
 *   1. Copy this file to <your-app>/app/sitemap.ts
 *   2. Replace SITE_URL with your domain
 *   3. Replace SUPPORTED_LANGS with your locale list
 *   4. Replace STATIC_PAGES with your actual routes
 *   5. (Optional) Add dynamic entries from your DB
 *   6. Test: visit /sitemap.xml and verify hreflang tags appear
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://YOUR-DOMAIN.com'
const SUPPORTED_LANGS = ['es', 'en', 'pt'] as const
const DEFAULT_LANG = 'es' as const

const STATIC_PAGES = [
  '',            // home
  '/about',
  '/services',
  '/contact',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Per-locale entries with full hreflang alternates
  for (const lang of SUPPORTED_LANGS) {
    for (const page of STATIC_PAGES) {
      entries.push({
        url: `${SITE_URL}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            SUPPORTED_LANGS.map((l) => [l, `${SITE_URL}/${l}${page}`])
          ),
        },
      })
    }
  }

  return entries
}
