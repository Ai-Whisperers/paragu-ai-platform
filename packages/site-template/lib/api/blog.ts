import { getBlogPosts, getBlogPost } from '@/lib/content/blog';

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  tags: string[]
  image: string
  content: string
}

export const READING_TIME_WPM = 200

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / READING_TIME_WPM))
}

// The underlying content-loader returns `Record<string, unknown>` because
// blog posts are dynamically imported JSON. We assert to `BlogPost` at this
// boundary — call sites treat these as strongly typed.
export async function getAllPosts(lang: 'es' | 'en'): Promise<BlogPost[]> {
  return (await getBlogPosts(lang)) as unknown as BlogPost[]
}

export async function getPostBySlug(slug: string, lang: 'es' | 'en'): Promise<BlogPost | undefined> {
  const post = await getBlogPost(lang, slug)
  return (post ?? undefined) as BlogPost | undefined
}

export async function getRelatedPosts(slug: string, category: string, lang: 'es' | 'en'): Promise<BlogPost[]> {
  const posts = (await getBlogPosts(lang)) as unknown as BlogPost[]
  return posts.filter((p) => p.slug !== slug && p.category === category).slice(0, 3)
}
