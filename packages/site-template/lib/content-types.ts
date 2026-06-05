/**
 * TypeScript interfaces for all content JSON files.
 * Import these instead of using `any` or `Record<string, any>`.
 *
 * Usage in config.ts:
 *   import type { SiteConfig, HeroSlide, Service, ... } from "./content-types"
 *
 * Why: Zero type safety on content access was the biggest gap.
 * Misspelling `whatsapp` as `whatsApp` would compile fine and return undefined silently.
 * Now TypeScript catches these at compile time.
 */

export type Lang = "es" | "en"

// ============================================================
// CORE SITE CONFIG
// ============================================================

export interface SiteMeta {
  name: string
  slug: string
  url?: string
  locale?: string
  metaDescription?: string
  theme?: {
    primary?: string
    secondary?: string
  }
  fonts?: {
    heading?: string
    body?: string
  }
  openingHours?: Record<string, string> | string
  navigation?: Array<{
    label: string
    href: string
    external?: boolean
  }>
}

export interface SiteBusiness {
  type?: string
  name?: string
  phone?: string
  whatsapp?: string
  whatsappMessage?: string
  email?: string
  address?: string
  coordinates?: {
    lat: number
    lng: number
  }
  instagram?: string
  instagramHandle?: string
  currency?: string
  ruc?: string
  description?: string
}

export interface SiteFeatures {
  exitIntentPopup?: boolean
  cookieConsent?: boolean
  testimonialsCarousel?: boolean
  promoBanner?: boolean
  quickBooking?: boolean
  shareButtons?: boolean
  bookingForm?: boolean
  gallery?: boolean
  testimonials?: boolean
  team?: boolean
  stats?: boolean
  process?: boolean
  beforeAfterSlider?: boolean
  ctaBanner?: boolean
  blog?: boolean
  loyaltyProgram?: boolean
  giftCards?: boolean
  promotions?: boolean
  referral?: boolean
  clientPortal?: boolean
  whatsappAuth?: boolean
  instagramLink?: boolean
  instagramFeed?: boolean
  newsletter?: boolean
  darkMode?: boolean
}

export interface SiteConfig {
  description?: string
  site: SiteMeta
  business?: SiteBusiness
  features?: SiteFeatures
  navigation?: {
    main: Array<{ label: string; href: string; external?: boolean }>
    more: Array<{ label: string; href: string; external?: boolean; feature?: string }>
  }
  openingHours?: Record<string, string> | string
}

// ============================================================
// HERO / SLIDES
// ============================================================

export interface HeroSlide {
  id: string
  title: string
  subtitle?: string
  image: string
  cta?: string
  badge?: string
}

export interface HeroContent {
  description?: string
  title: string
  subtitle?: string
  slides: HeroSlide[]
}

// ============================================================
// SERVICES
// ============================================================

export interface ServiceItem {
  name: string
  price?: number
  duration?: number
  popular?: boolean
  desc?: string
  image?: string
}

export interface ServiceCategory {
  _annotation?: {
    name: string
    what: string
    why: string
    ai_popolates?: string
    your_input?: string
    plan?: string
  }
  id: string
  title: string
  description?: string
  icon?: string
  color?: string
  items: ServiceItem[]
}

// ============================================================
// TESTIMONIALS
// ============================================================

export interface Testimonial {
  id: string
  name: string
  text: string
  rating?: number
  image?: string
  role?: string
  color?: string
  initials?: string
  service?: string
  stars?: number
  quote?: string
  date?: string
}

export interface TestimonialsContent {
  description?: string
  title?: string
  subtitle?: string
  items: Testimonial[]
}

// ============================================================
// GALLERY
// ============================================================

export interface GalleryImage {
  id: string
  src: string
  alt?: string
  caption?: string
}

export interface GalleryContent {
  description?: string
  title?: string
  items: GalleryImage[]
}

// ============================================================
// PROMOTIONS
// ============================================================

export interface Promotion {
  id: string
  title: string
  description?: string
  subtitle?: string
  discount?: string
  validUntil?: string
  expires?: string
  image?: string
  badge?: string
  cta?: string
  originalPrice?: number
  price?: number
  features?: string[]
  waMessage?: string
}

export interface PromotionContent {
  description?: string
  title?: string
  subtitle?: string
  items: Promotion[]
}

// ============================================================
// GIFT CARDS
// ============================================================

export interface GiftCardType {
  id: string
  title: string
  name: string
  price: number
  desc: string
  description?: string
  image?: string
  validMonths?: number
  features?: string[]
  icon?: string
}

export interface GiftCardsContent {
  description?: string
  title?: string
  items: GiftCardType[]
}

// ============================================================
// LOYALTY PROGRAM
// ============================================================

export interface LoyaltyTier {
  name?: string
  label?: string
  points?: number
  benefits?: string[]
  id?: string
  minPoints?: number
  discount?: number
  perks?: string[]
  color?: string
  icon?: string
}

export interface LoyaltyContent {
  description?: string
  title?: string
  subtitle?: string
  steps?: Array<{ after?: string; reward?: string }>
  tiers: LoyaltyTier[]
}

// ============================================================
// TEAM
// ============================================================

export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  image?: string
  specialties?: string[]
  instagram?: string
}

export interface TeamContent {
  description?: string
  team: TeamMember[]
}

// ============================================================
// FAQS
// ============================================================

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface FAQsContent {
  description?: string
  title?: string
  items: FAQ[]
}

// ============================================================
// BLOG
// ============================================================

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  date?: string
  author?: string
  image?: string
  tags?: string[]
}

export interface BlogContent {
  description?: string
  title?: string
  posts: BlogPost[]
}

// ============================================================
// STATS / REASONS / CTA / BEFORE-AFTER
// ============================================================

export interface StatItem {
  value: string
  label: string
  icon?: string
}

export interface ReasonItem {
  title: string
  desc?: string
  icon?: string
}

export interface CTAContent {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  image?: string
}

export interface BeforeAfterItem {
  id: string
  before: string
  after: string
  title?: string
  description?: string
  beforeTitle?: string
  beforeDesc?: string
  afterTitle?: string
  afterDesc?: string
  label?: string
  image?: string
}

// ============================================================
// UI STRINGS (es.json / en.json)
// ============================================================

export interface UIStrings {
  [key: string]: string | UIStrings
}

// ============================================================
// TOKENS
// ============================================================

export interface DesignTokens {
  colors?: {
    [key: string]: string
  }
  fonts?: {
    [key: string]: string
  }
  [key: string]: unknown
}