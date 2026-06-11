import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://stroopwafelhuis.paragu-ai.com'
  const pages = ['', '/menu', '/historia', '/ubicacion', '/catering', '/faq', '/contacto', '/privacidad', '/terminos']
  return pages.map((p) => ({
    url: base + p,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1.0 : 0.8,
  }))
}
