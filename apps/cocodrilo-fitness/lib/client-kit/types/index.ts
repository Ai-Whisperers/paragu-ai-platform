// Shared types for all client sites
export interface CartItem {
  name: string
  price: string
  priceGs: number
  quantity: number
  imageUrl?: string
  category?: string
  priceBefore?: string
}

export interface SiteContent {
  siteName: string
  navigation: { items: { label: string; href: string }[] }
  home: { hero: unknown; features: unknown[]; testimonials: unknown[]; productCatalog?: unknown }
  faq?: { items: { question: string; answer: string }[] }
  whatsapp?: { businessNumber: string; defaultMessage: string }
  analytics?: { ga4?: string }
  [key: string]: unknown
}
