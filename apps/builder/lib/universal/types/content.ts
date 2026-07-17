/**
 * Centralized content types — matches JSON schema.
 *
 * These interfaces are the TS surface over runtime JSON. In this codebase the
 * JSON is authoritative (edited by hand or via admin CMS), so the types are
 * intentionally loose: canonical keys are named, but consumer-specific extras
 * from legacy sites (waMessage, instagramHandle, initials, service, etc.) are
 * kept as optional fields so consumers keep compiling. When a real schema
 * check is needed do it at the JSON boundary (zod), not by tightening these.
 */

// Site Config — business block carries a lot of ad-hoc keys per client site.
export interface SiteConfig {
  site: {
    name: string
    slug: string
    url: string
    locale: string
    metaDescription?: string
    description?: string
    type?: string
  }
  business: {
    phone: string
    whatsapp: string
    email: string
    address: string
    coordinates: { lat: number; lng: number }
    instagram?: string
    instagramHandle?: string
    currency: string
    name: string
    type?: string
    description?: string
    whatsappMessage?: string
  }
  features: Record<string, boolean>
  navigation: {
    main: Array<{ label: string; href: string; external?: boolean; feature?: string }>
    more: Array<{ label: string; href: string; feature?: string }>
  }
  openingHours: Record<string, string>
}

// Hero — legacy sites also emit `title` alongside/instead of `headline`.
export interface HeroSlide {
  headline?: string
  title?: string
  subheadline?: string
  image?: string
  cta?: string
  cta_link?: string
}

// Stats
export interface Stat {
  value: string
  label: string
  icon?: string
}

// Service
export interface Service {
  id: string
  name: string
  description?: string
  price?: number
  duration?: string
  image?: string
}

// Testimonial — legacy sites include ad-hoc display fields.
export interface Testimonial {
  id: string
  name: string
  text?: string
  quote?: string
  rating?: number
  stars?: number
  avatar?: string
  initials?: string
  color?: string
  service?: string
}

// Gallery Item
export interface GalleryItem {
  src: string
  alt?: string
  caption?: string
}

// Promotion — legacy sites emit `waMessage` and `expires` in addition to the
// snake_case canonical forms.
export interface Promotion {
  id: string
  title: string
  subtitle?: string
  badge?: string
  description?: string
  wa_message?: string
  waMessage?: string
  is_active?: boolean
  expires_at?: string
  expires?: string
  color?: string
  sort_order?: number
}

// FAQ
export interface FaqItem {
  question: string
  answer: string
}

// Team Member — legacy sites include per-role specialties list.
export interface TeamMember {
  name: string
  role: string
  bio?: string
  image?: string
  specialties?: string[]
}

// CTA
export interface CtaItem {
  headline: string
  subheadline?: string
  button_text?: string
  button_link?: string
  image?: string
}
