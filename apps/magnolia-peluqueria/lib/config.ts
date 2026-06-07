import contentData from "@/content.json"
import siteConfigData from "@/content/site.json"

export type ColorName = "rose" | "violet" | "amber" | "sky"
export type IconName = "scissors" | "palette" | "sparkles" | "sparkle"

export const siteConfig = siteConfigData
export const theme = siteConfigData.site.theme
export const siteUrl = siteConfigData.site.url

// ── Content accessors ───────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonContent = Record<string, any>
const content = contentData as JsonContent

export function getContent() { return content }

export function businessData()  { return content.business }
export function heroSlidesData() { return content.hero.slides }
export function statsData()        { return content.stats }
export function servicesData()    { return content.services.categories }
export function galleryData()     { return content.gallery }
export function testimonialsData(){ return content.testimonials }
export function reasonsData()    { return content.reasons }
export function ctaData()         { return content.cta }
export function teamData()        { return content.team }
export function beforeAfterData(){ return content.beforeAfter }
export function promotionsData() { return content.promotions }
export function loyaltyData()    { return content.loyalty }
export function giftCardsData()   { return content.giftCards }
export function faqsData()        { return content.faqs }

// ── Backwards-compatible static exports ─────────────────────────
export const business    = content.business
export const heroSlides  = content.hero.slides
export const stats       = content.stats
export const services    = content.services.categories
export const gallery     = content.gallery
export const testimonials= content.testimonials
export const reasons     = content.reasons
export const cta         = content.cta
export const team        = content.team
export const beforeAfter = content.beforeAfter
export const promotions  = content.promotions
export const loyalty     = content.loyalty
export const giftCards   = content.giftCards
export const faqs        = content.faqs

// ── WhatsApp helpers ─────────────────────────────────────────────
export function waLink(message?: string): string {
  const b = content.business
  const msg = message ?? b.ctaMessage
  return `https://wa.me/${b.whatsapp}?text=${encodeURIComponent(decodeURIComponent(msg))}`
}

export function waLinkForService(serviceName: string): string {
  return waLink(`Hola! Quiero reservar ${serviceName}`)
}

export function waLinkForPromotion(title = "una promoción"): string {
  return waLink(`Hola! Quiero saber más sobre ${title} de Magnolia`)
}

// ── Style helpers ───────────────────────────────────────────────
export function getColorMap(color: ColorName) {
  const map: Record<ColorName, { bg: string; text: string; light: string }> = {
    rose:    { bg: "bg-rose-500",    text: "text-rose-500",    light: "bg-rose-50"    },
    violet:  { bg: "bg-violet-500",  text: "text-violet-500",  light: "bg-violet-50"  },
    amber:   { bg: "bg-amber-500",   text: "text-amber-500",   light: "bg-amber-50"   },
    sky:     { bg: "bg-sky-500",     text: "text-sky-500",     light: "bg-sky-50"    },
  }
  return map[color] ?? map.rose
}

export function getInitialsBg(color: ColorName): string {
  const map: Record<ColorName, string> = {
    rose:    "bg-rose-100 text-rose-700",
    violet:  "bg-violet-100 text-violet-700",
    amber:   "bg-amber-100 text-amber-700",
    sky:     "bg-sky-100 text-sky-700",
  }
  return map[color] ?? map.rose
}

// ── Translations ────────────────────────────────────────────────
export const t = {
  navHome: "Inicio", navServices: "Servicios", navAbout: "Nosotros",
  navBooking: "Reservar", navFAQ: "FAQ", navContact: "Contacto",
  bookCta: "Reservar", bookCtaMobile: "Reservar por WhatsApp",
  closed: "Cerrado", openNow: "Abierto ahora",
} as const

export type Translations = typeof t