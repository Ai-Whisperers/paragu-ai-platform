import { MetadataRoute } from 'next'
import { existsSync, readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { LOCALES } from '../lib/locales'

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://nexaparaguay.com.py'

/**
 * Read the features flag from site.json to determine if blog is enabled.
 * Default: false (matches features.blog = false in site.json).
 */
function isBlogEnabled(): boolean {
  try {
    const siteJsonPath = join(process.cwd(), 'site.json')
    if (!existsSync(siteJsonPath)) return false
    const data = JSON.parse(readFileSync(siteJsonPath, 'utf-8'))
    return Boolean(data?.features?.blog)
  } catch {
    return false
  }
}

function getStaticSlugs(): string[] {
  const pagesDir = join(process.cwd(), 'nexa-pages')
  if (!existsSync(pagesDir)) return ['home']

  const slugs = readdirSync(pagesDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''))

  return Array.from(new Set(slugs))
}

function getBlogSlugsByLocale(): Record<string, Array<{ slug: string; date?: string }>> {
  const result: Record<string, Array<{ slug: string; date?: string }>> = {}

  for (const loc of LOCALES) {
    const blogPath = join(process.cwd(), 'content', 'blog', `posts-${loc}.json`)
    if (!existsSync(blogPath)) {
      result[loc] = []
      continue
    }

    try {
      const postsJson = JSON.parse(readFileSync(blogPath, 'utf-8'))
      const posts = (postsJson.posts || []) as Array<{ slug?: string; date?: string }>
      result[loc] = posts.filter((p) => p.slug).map((p) => ({ slug: p.slug!, date: p.date }))
    } catch {
      result[loc] = []
    }
  }

  return result
}

function alternatesForPath(path: string) {
  return Object.fromEntries(LOCALES.map((loc) => [loc, `${BASE}/${loc}${path ? `/${path}` : ''}`]))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const staticSlugs = getStaticSlugs()
  const blogSlugsByLocale = getBlogSlugsByLocale()
  const blogEnabled = isBlogEnabled()

  for (const slug of staticSlugs) {
    // Skip blog index page if blog is disabled in site.json features
    if (slug === 'blog' && !blogEnabled) continue
    const path = slug === 'home' ? '' : slug
    entries.push({
      url: `${BASE}/es${path ? `/${path}` : ''}`,
      lastModified: new Date(),
      changeFrequency: slug === 'home' ? 'daily' : slug === 'blog' ? 'weekly' : 'monthly',
      priority: slug === 'home' ? 1.0 : slug === 'blog' ? 0.8 : 0.6,
      alternates: {
        languages: {
          'x-default': `${BASE}/es${path ? `/${path}` : ''}`,
          ...alternatesForPath(path),
        },
      },
    })
  }

  // Blog posts per locale (localized slugs) — only when blog is enabled
  if (blogEnabled) {
    for (const locale of LOCALES) {
      for (const post of blogSlugsByLocale[locale] || []) {
        entries.push({
          url: `${BASE}/${locale}/blog/${post.slug}`,
          lastModified: post.date ? new Date(post.date) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: {
              'x-default': `${BASE}/${locale}/blog/${post.slug}`,
              ...Object.fromEntries(
                LOCALES.map((l) => {
                  const localized = blogSlugsByLocale[l]?.find((p) => p.slug === post.slug)
                  return [l, `${BASE}/${l}/blog/${localized?.slug || post.slug}`]
                }),
              ),
            },
          },
        })
      }
    }
  }

  return entries
}
