import type { MetadataRoute } from 'next'
import es from '@/content/es.json'
import en from '@/content/en.json'
import type { SiteContent } from '@/types/content'

const esContent = es as unknown as SiteContent
const enContent = en as unknown as SiteContent
const baseUrl = esContent.site.url

const staticPages = [
  { url: '', priority: 1.0 },
  { url: '/obra', priority: 0.9 },
  { url: '/galeria', priority: 0.9 },
  { url: '/murales', priority: 0.8 },
  { url: '/biografia', priority: 0.7 },
  { url: '/prensa', priority: 0.6 },
  { url: '/blog', priority: 0.7 },
  { url: '/tienda', priority: 0.6 },
  { url: '/contacto', priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Static pages
  for (const page of staticPages) {
    entries.push({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: page.url === '' ? 'weekly' : 'monthly',
      priority: page.priority,
    })
  }

  // Obra items
  for (const item of esContent.obra.items) {
    entries.push({
      url: `${baseUrl}/obra/${item.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  // Blog posts
  for (const post of esContent.blog.items) {
    entries.push({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  // English versions
  for (const page of staticPages) {
    entries.push({
      url: `${baseUrl}/en${page.url}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  }

  return entries
}
