import type { MetadataRoute } from 'next'

const SITE = 'https://meal-prep.paragu-ai.com'

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>

const ROUTES: { path: string; changefreq: ChangeFreq; priority: number }[] = [
    { path: "/", changefreq: "weekly", priority: 1.0 }
  ]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return ROUTES.map(r => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changefreq,
    priority: r.priority,
  }))
}
