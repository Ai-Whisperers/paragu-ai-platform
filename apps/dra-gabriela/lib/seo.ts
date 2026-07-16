// lib/seo.ts — thin adapter over @ai-whisperers/site-seo.
//
// Every page's `generateMetadata` should call `buildMetadata({ ... })` for
// canonical + hreflang + OG in one shot. Slug mapping (EN canonical ↔ ES
// translated) lives here because it's business-content-specific; the shared
// package handles the URL arithmetic.

import {
  buildAlternates as buildAlternatesShared,
  buildMetadata as buildMetadataShared,
  absoluteUrl as absoluteUrlShared,
  resolveSiteUrl,
  type SiteConfig,
} from "@ai-whisperers/site-seo"

const SITE_URL = resolveSiteUrl("NEXT_PUBLIC_SITE_URL", "https://dragabriela.paragu-ai.com")

// Canonical EN slug → ES slug. Same slug = omit the ES side.
const EN_TO_ES: Record<string, string> = {
  "about": "nosotros",
  "philosophy": "filosofia",
  "services": "servicios",
  "pricing": "precios",
  "contact": "contacto",
  "faq": "faq",
  "second-opinion": "segunda-opinion",
  "privacy": "privacidad",
  "terms": "terminos",
  "expat": "expat",
  "blog": "blog",
  "process": "process",
  "services/second-opinion": "servicios/segunda-opinion",
  "services/treatment-planning": "servicios/planificacion-tratamiento",
  "services/cosmetic-dentistry": "servicios/estetica-dental",
  "services/oral-rehabilitation": "servicios/rehabilitacion-oral",
  "services/general-dentistry": "servicios/odontologia-general",
  "settings": "ajustes",
}

// Slugs always arrive here in canonical (EN) form; only en→es lookup needed.
const SITE_CONFIG: SiteConfig = {
  siteUrl: SITE_URL,
  defaultLocale: "en",
  locales: ["en", "es"] as const,
  slugMap: {
    en: EN_TO_ES,
  },
}

const OG_LOCALE_MAP = { en: "en_US", es: "es_PY" }

interface BuildMetadataInput {
  slug: string
  title: string
  description: string
  locale: "en" | "es"
  ogImage?: string
  ogType?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

export function buildMetadata(input: BuildMetadataInput) {
  return buildMetadataShared(input, {
    ...SITE_CONFIG,
    siteName: "Dra. Gabriella González Pane",
    ogLocaleMap: OG_LOCALE_MAP,
    defaultOgImage: "/og/og-home.png",
    ogImagePathPrefix: "/og",
  })
}

export function absoluteUrl(path: string): string {
  return absoluteUrlShared(path, SITE_URL)
}

export function buildAlternates(slug: string) {
  return buildAlternatesShared(slug, SITE_CONFIG)
}
