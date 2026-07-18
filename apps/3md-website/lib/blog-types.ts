export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content?: string
  category: string
  date?: string
  readTime?: string
}

export type BlogContent = {
  title?: string
  subtitle?: string
  categories?: string[]
  posts: BlogPost[]
}

export type SiteContent = {
  siteName?: string
  blog?: BlogContent
}
