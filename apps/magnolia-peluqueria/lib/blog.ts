import postsEsData from "@/content/blog/posts-es.json"

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

const posts = postsEsData.posts as BlogPost[]

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / READING_TIME_WPM))
}

export function getAllPosts(): BlogPost[] {
  return posts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getRelatedPosts(slug: string, category: string): BlogPost[] {
  return posts.filter((p) => p.slug !== slug && p.category === category).slice(0, 3)
}