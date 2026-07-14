// lib/seo.ts — SEO helpers: canonical, hreflang, OG tags.
//
// Every page's `generateMetadata` should call `buildMetadata({ ... })` to get
// a consistent metadata object with:
//   - title + description
//   - canonical URL (always the English version of the page)
//   - hreflang alternates (en, es, x-default) for every supported page
//   - OpenGraph + Twitter cards
//   - og:image — auto-resolved to /og/og-{slug}.png based on the slug
//     (fallback to /og/og-home.png for the home page)
//
// Slug mapping: the canonical URL is the EN slug (lower friction for
// international SEO). Both slugs are reachable cross-locale via the
// slugToBilingual() alias, so hreflang only needs to point to the
// canonical (EN) URL.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ometzdental.com"

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

/** Strip the leading locale from a path. /en/about -> about, /es -> "" */
function stripLocale(path: string): string {
  return path.replace(/^\/(en|es)\b/, "").replace(/^\/+/, "")
}

/** Add a locale prefix to a slug. "about" + "en" -> "en/about" */
function withLocale(slug: string, locale: "en" | "es"): string {
  return slug ? `/${locale}/${slug}` : `/${locale}`
}

/**
 * Given the canonical EN slug (or any path under [locale]), build the EN
 * and ES alternates. Both pages always exist (slug aliases make the
 * cross-locale routes work).
 *
 * NOTE: canonical should be the CURRENT page's own URL (not the EN version).
 * x-default points to Spanish (the primary Paraguay audience locale).
 */
function getAlternates(slug: string, locale?: "en" | "es") {
  const enUrl = `${SITE_URL}${withLocale(slug, "en")}`
  const esSlug = EN_TO_ES[slug] ?? slug // fall back to same slug
  const esUrl = `${SITE_URL}${withLocale(esSlug, "es")}`
  // Canonical: the page's own URL in its current locale (so /es/foo canonicalizes
  // to /es/foo, not /en/foo). When locale is not provided (used in sitemap),
  // default to EN as the canonical (since /en is canonical for the bilingual pair).
  const canonical = locale === "es" ? esUrl : enUrl
  return {
    canonical,
    languages: {
      en: enUrl,
      es: esUrl,
      // Spanish is the primary audience in Paraguay — x-default points to es
      "x-default": esUrl,
    },
  }
}

interface BuildMetadataInput {
  /** Canonical EN slug (no leading locale). "" for the home page. */
  slug: string
  title: string
  description: string
  /** Locale of the current page (used to pick the right OG locale). */
  locale: "en" | "es"
  /** Optional: override the OG image. Default = /og/og-image.png */
  ogImage?: string
  /** Optional: og:type. Default = "website" */
  ogType?: "website" | "article"
  /** Article-specific (when ogType=article) */
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

export function buildMetadata({
  slug,
  title,
  description,
  locale,
  ogImage,
  ogType = "website",
  publishedTime,
  modifiedTime,
  author,
}: BuildMetadataInput) {
  const alts = getAlternates(slug, locale)
  const ogLocale = locale === "es" ? "es_PY" : "en_US"
  // Per-page OG image: derive from slug if not explicitly provided.
  // Falls back to the generic /og/og-image.png for the home page.
  const resolvedOgImage = ogImage ?? (slug ? `/og/og-${slug.replace(/\//g, "-")}.png` : "/og/og-home.png")
  return {
    title,
    description,
    alternates: alts,
    openGraph: {
      type: ogType,
      locale: ogLocale,
      url: locale === "es"
        ? (EN_TO_ES[slug] ? `${SITE_URL}/${locale}/${EN_TO_ES[slug]}` : `${SITE_URL}/${locale}${slug ? "/" + slug : ""}`)
        : alts.canonical,
      siteName: "Ometz Dental · Dra. Gabriella González Pane",
      title,
      description,
      images: [{ url: resolvedOgImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolvedOgImage],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  }
}

/** Get the absolute URL of a given path. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path
  return `${SITE_URL}${path.startsWith("/") ? path : "/" + path}`
}

/** Build the canonical + hreflang set for a given slug. Exposed for sitemap.ts. */
export function buildAlternates(slug: string) {
  return getAlternates(slug)
}
