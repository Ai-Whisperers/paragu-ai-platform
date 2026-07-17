/**
 * Compat barrel — historical import path `@/lib/content-types` used by
 * `lib/universal/api/seo.ts` and `lib/universal/config/config.ts`.
 *
 * Canonical typed content interfaces live at `@/lib/universal/types/content`.
 * Re-export the ones that exist there; for the loose legacy names that
 * pre-date the current typed schema (ReasonItem, CTAContent, etc.), alias to
 * `Record<string, unknown>` so consumers keep compiling — call sites narrow
 * at the JSON boundary anyway.
 *
 * When the universal types get filled in, move each `Record<string, unknown>`
 * alias to the real interface from `types/content`.
 */

export type {
  SiteConfig,
  HeroSlide,
  Testimonial,
  Promotion,
  TeamMember,
  Service,
  Stat,
  GalleryItem,
  FaqItem,
  CtaItem,
} from '@/lib/universal/types/content'

// Legacy names not yet ported to the canonical types module.
// Keep as loose records — the config layer casts JSON to these at the boundary
// (see lib/universal/config/config.ts::asConfig), so runtime shape is enforced
// by the content JSON, not the TS surface.
export type StatItem = { value?: string | number; label?: string; icon?: string; [k: string]: unknown }
export type ReasonItem = { title?: string; description?: string; icon?: string; [k: string]: unknown }
export type CTAContent = { title?: string; subtitle?: string; buttonText?: string; buttonLink?: string; [k: string]: unknown }
export type BeforeAfterItem = {
  id?: string
  before?: string
  after?: string
  label?: string
  title?: string
  caption?: string
  description?: string
  [k: string]: unknown
}
export type FAQ = { question?: string; answer?: string; [k: string]: unknown }
export type GalleryImage = { src?: string; alt?: string; caption?: string; [k: string]: unknown }

/** Category node used by content/es/services/categories/*.json. Items are the
 *  individual services under a category. Keep the shape loose — different
 *  clients emit different extras (image, hasMap, etc.) that consumers narrow
 *  ad-hoc.
 */
export interface ServiceCategoryItem {
  name?: string
  desc?: string
  description?: string
  duration?: string | number
  price?: number
  popular?: boolean
  image?: string
  [k: string]: unknown
}
export interface ServiceCategory {
  title: string
  slug?: string
  icon?: string
  color?: string
  items: ServiceCategoryItem[]
  [k: string]: unknown
}
export type GiftCardType = {
  id?: string
  label?: string
  amount?: number
  title?: string
  name?: string
  description?: string
  desc?: string
  price?: number
  icon?: string
  [k: string]: unknown
}
export type LoyaltyTier = { id?: string; name?: string; threshold?: number; benefits?: string[]; [k: string]: unknown }
export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  tags: string[]
  image: string
  content: string
  [k: string]: unknown
}
