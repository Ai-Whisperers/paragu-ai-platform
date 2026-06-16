// Content loader — merges all per-section JSONs into a single object per locale.
//
// Why this exists: the app stores content in many small files (site.json, hero.json,
// stats.json, etc.) for translator handoff. Components historically only got site.json
// and most sections rendered empty. This loader merges them so the components keep
// working while the translator-friendly file split is preserved.
//
// All content is statically imported at build time — zero runtime cost, fully
// SSG-compatible. If we add a new section JSON, add it to SECTION_FILES below.

import enSite from "@/content/en/site.json"
import esSite from "@/content/es/site.json"
import enHero from "@/content/en/hero.json"
import esHero from "@/content/es/hero.json"
import enStats from "@/content/en/stats.json"
import esStats from "@/content/es/stats.json"
import enReasons from "@/content/en/reasons.json"
import esReasons from "@/content/es/reasons.json"
import enServices from "@/content/en/services/index.json"
import esServices from "@/content/es/services/index.json"
import enTestimonials from "@/content/en/testimonials.json"
import esTestimonials from "@/content/es/testimonials.json"
import enProcess from "@/content/en/process.json"
import esProcess from "@/content/es/process.json"
import enFaqs from "@/content/en/faqs.json"
import esFaqs from "@/content/es/faqs.json"
import enCta from "@/content/en/cta.json"
import esCta from "@/content/es/cta.json"
import enLdLocalBusiness from "@/content/en/ld-localbusiness.json"
import esLdLocalBusiness from "@/content/es/ld-localbusiness.json"
import enLdFaq from "@/content/en/ld-faq.json"
import esLdFaq from "@/content/es/ld-faq.json"
import enLdReviews from "@/content/en/ld-reviews.json"
import esLdReviews from "@/content/es/ld-reviews.json"

export const LOCALES = ["en", "es"] as const
export type Locale = (typeof LOCALES)[number]

// Each per-section file gets merged under a key. Components then read c.hero.title,
// c.stats.items, c.services.tabs, etc. — the same shape the existing components expect.
// Note: process.json uses `pasos/orden/titulo` in Spanish and `steps/order/title` in
// English (sync drift). Components read both shapes.
const EN: any = {
  ...enSite,
  hero: enHero,
  stats: { items: enStats },
  reasons: { items: enReasons },
  services: enServices,
  testimonials: { items: enTestimonials },
  process: enProcess,
  faqs: enFaqs,
  cta: enCta,
  ld_localbusiness: enLdLocalBusiness,
  ld_faq: enLdFaq,
  ld_reviews: enLdReviews,
}

const ES: any = {
  ...esSite,
  hero: esHero,
  stats: { items: esStats },
  reasons: { items: esReasons },
  services: esServices,
  testimonials: { items: esTestimonials },
  process: esProcess,
  faqs: esFaqs,
  cta: esCta,
  ld_localbusiness: esLdLocalBusiness,
  ld_faq: esLdFaq,
  ld_reviews: esLdReviews,
}

const CONTENT: Record<Locale, any> = { en: EN, es: ES }

export type SiteContent = any

export function getContent(locale: string): any {
  if (locale === "es") return ES
  return EN
}

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale)
}

/**
 * Check whether a business field is still a placeholder (PENDING / TBD / etc.).
 * Used to decide whether to render the value, hide the field, or show a
 * "disponible pronto" affordance.
 */
export function isPlaceholder(value: unknown): boolean {
  if (value == null) return true
  const s = String(value).trim()
  if (s === "") return true
  const upper = s.toUpperCase()
  return (
    upper.startsWith("PENDIENTE") ||
    upper.startsWith("PENDING") ||
    upper.startsWith("TBD") ||
    upper.startsWith("[PLACEHOLDER") ||
    upper.includes("PENDIENTE | TBD") ||
    upper.includes("PENDING | TBD") ||
    upper.includes("PENDIENTE | NOT") ||
    upper.includes("PENDING | NOT")
  )
}

/**
 * Build a clean wa.me link or null if no number is set.
 * Always returns an https URL — never a `wa.me/` broken link.
 */
export function whatsappLink(whatsapp: unknown, message?: string): string | null {
  if (isPlaceholder(whatsapp)) return null
  const digits = String(whatsapp).replace(/\D/g, "")
  if (!digits) return null
  const params = message ? `?text=${encodeURIComponent(message)}` : ""
  return `https://wa.me/${digits}${params}`
}

/**
 * Format phone for display: keep international format readable.
 * Returns null if placeholder.
 */
export function phoneDisplay(phone: unknown): string | null {
  if (isPlaceholder(phone)) return null
  return String(phone).trim()
}

/**
 * Truncate a string to N characters with ellipsis. Used in cards / meta tags.
 */
export function truncate(s: string, n = 160): string {
  if (!s) return ""
  return s.length > n ? s.slice(0, n - 1) + "…" : s
}
