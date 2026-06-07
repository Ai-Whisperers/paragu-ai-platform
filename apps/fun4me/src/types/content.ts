/**
 * Content types matching es.json structure
 */
export interface ContentProduct {
  id: number
  slug: string
  name: string
  price: number
  currency: string
  category: string
  description: string
  features: string[]
  image: string
  featured: boolean
  new: boolean
  rating: number
  reviews: number
  faq: { q: string; a: string }[]
  level: string
  sound: number
  body_safe: boolean
  waterproof: boolean
  rechargeable: boolean
  material: string
  battery: string
  weight: string
  stock: string
}

export interface ContentCategory {
  id: string
  name: string
  description: string
  image: string
  icon: string
}

export interface ContentKink {
  id: string
  name: string
  description: string
  image: string
  icon: string
  productSlugs: string[]
}

export interface ContentSite {
  siteName: string
  businessName: string
  tagline: string
  metaDescription: string
  navigation: {
    businessName: string
    ctaText: string
    ctaHref: string
    items: { label: string; href: string }[]
  }
  home: Record<string, unknown>
  categories: ContentCategory[]
  kinks: ContentKink[]
  products: ContentProduct[]
}
