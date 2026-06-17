import type { MetadataRoute } from 'next'
import { buildAlternates } from '@/lib/seo'

// Site URL (matches SITE_URL in lib/seo.ts)
const SITE_URL = 'https://dragabriela.paragu-ai.com'

// All canonical (EN) slugs that have a corresponding page
const TOP_LEVEL_SLUGS = [
  '', // home
  'about',
  'philosophy',
  'services',
  'pricing',
  'contact',
  'faq',
  'second-opinion',
  'expat',
  'blog',
  'process',
  'privacy',
  'terms',
]

const SERVICE_SLUGS = [
  'second-opinion',
  'treatment-planning',
  'general-dentistry',
  'cosmetic-dentistry',
  'oral-rehabilitation',
]

const LOCALES = ['en', 'es'] as const

// Build the canonical URL for a slug, including all hreflang alternates
function entryFor(slug: string) {
  const alts = buildAlternates(slug)
  return {
    url: alts.canonical,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: slug === '' ? 1.0 : 0.7,
    alternates: {
      languages: {
        en: alts.languages.en,
        es: alts.languages.es,
        'x-default': alts.languages['x-default'],
      },
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Top-level pages
  for (const slug of TOP_LEVEL_SLUGS) {
    entries.push(entryFor(slug))
  }

  // Service detail pages
  for (const slug of SERVICE_SLUGS) {
    entries.push(entryFor(`services/${slug}`))
  }

  return entries
}
