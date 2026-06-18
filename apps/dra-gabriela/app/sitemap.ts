import type { MetadataRoute } from 'next'
import { buildAlternates } from '@/lib/seo'
import enBlog from '@/content/en/blog.json'
import esBlog from '@/content/es/blog.json'
import { promises as fs } from 'fs'
import path from 'path'

// Site URL (matches SITE_URL in lib/seo.ts)
const SITE_URL = 'https://dragabriela.paragu-ai.com'

// All canonical (EN) slugs that have a corresponding page
const TOP_LEVEL_SLUGS = [
  { slug: '', priority: 1.0, freq: 'weekly' as const },
  { slug: 'about', priority: 0.8, freq: 'monthly' as const },
  { slug: 'philosophy', priority: 0.6, freq: 'monthly' as const },
  { slug: 'services', priority: 0.9, freq: 'monthly' as const },
  { slug: 'pricing', priority: 0.9, freq: 'monthly' as const },
  { slug: 'contact', priority: 0.8, freq: 'monthly' as const },
  { slug: 'faq', priority: 0.7, freq: 'monthly' as const },
  { slug: 'second-opinion', priority: 0.95, freq: 'monthly' as const }, // high priority = lead conversion
  { slug: 'expat', priority: 0.7, freq: 'monthly' as const },
  { slug: 'blog', priority: 0.7, freq: 'weekly' as const },
  { slug: 'process', priority: 0.6, freq: 'monthly' as const },
  { slug: 'reviews', priority: 0.8, freq: 'weekly' as const },
  { slug: 'first-visit', priority: 0.7, freq: 'monthly' as const },
  { slug: 'insurance', priority: 0.7, freq: 'monthly' as const },
  { slug: 'privacy', priority: 0.3, freq: 'yearly' as const },
  { slug: 'terms', priority: 0.3, freq: 'yearly' as const },
]

const SERVICE_SLUGS = [
  { slug: 'second-opinion', priority: 0.85 },
  { slug: 'treatment-planning', priority: 0.8 },
  { slug: 'general-dentistry', priority: 0.75 },
  { slug: 'cosmetic-dentistry', priority: 0.75 },
  { slug: 'oral-rehabilitation', priority: 0.75 },
]

const LOCALES = ['en', 'es'] as const

// Get lastmod from a content file's mtime
async function getLastModified(slug: string): Promise<Date> {
  try {
    // Try the EN content directory
    const parts = slug === '' ? ['content', 'en', 'site.json'] : ['content', 'en', `${slug}.json`]
    const fp = path.join(process.cwd(), ...parts)
    const stat = await fs.stat(fp)
    return stat.mtime
  } catch {
    return new Date()
  }
}

function entryFor(slug: string, priority: number, freq: 'weekly' | 'monthly' | 'yearly', lastmod: Date) {
  const alts = buildAlternates(slug)
  return {
    url: alts.canonical,
    lastModified: lastmod,
    changeFrequency: freq,
    priority,
    alternates: {
      languages: {
        en: alts.languages.en,
        es: alts.languages.es,
        'x-default': alts.languages['x-default'],
      },
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  // Top-level pages
  for (const { slug, priority, freq } of TOP_LEVEL_SLUGS) {
    entries.push(entryFor(slug, priority, freq, await getLastModified(slug)))
  }

  // Service detail pages
  for (const { slug, priority } of SERVICE_SLUGS) {
    entries.push(entryFor(`services/${slug}`, priority, 'monthly', await getLastModified(`services/${slug}`)))
  }

  // Blog posts
  for (const post of enBlog.posts || []) {
    if (post.slug) {
      entries.push(entryFor(`blog/${post.slug}`, 0.6, 'monthly', new Date(post.date)))
    }
  }

  return entries
}
