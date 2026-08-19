// lib/seo.ts — thin adapter over @ai-whisperers/site-seo.
//
// Every page's generateMetadata should call buildAlternates(slug) for
// canonical + hreflang across all four locales in one shot. Static-page
// slugs are identical across es/en/nl/de so no slugMap is required.

import {
  buildAlternates as buildAlternatesShared,
  buildMetadata as buildMetadataShared,
  absoluteUrl as absoluteUrlShared,
  resolveSiteUrl,
  type SiteConfig,
} from "@ai-whisperers/site-seo"

export const SITE_URL = resolveSiteUrl("NEXT_PUBLIC_APP_URL", "https://nexaparaguay.com.py")

const SITE_CONFIG: SiteConfig = {
  siteUrl: SITE_URL,
  defaultLocale: "es",
  locales: ["es", "en", "nl", "de"] as const,
}

const OG_LOCALE_MAP: Record<string, string> = {
  es: "es_PY",
  en: "en_US",
  nl: "nl_NL",
  de: "de_DE",
}

interface BuildMetadataInput {
  slug: string
  title: string
  description: string
  locale: "es" | "en" | "nl" | "de"
  ogImage?: string
  ogType?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

export function buildMetadata(input: BuildMetadataInput) {
  return buildMetadataShared(input, {
    ...SITE_CONFIG,
    siteName: "Nexa Paraguay",
    ogLocaleMap: OG_LOCALE_MAP,
    defaultOgImage: "/images/og-default.svg",
    ogImagePathPrefix: "/images",
  })
}

export function absoluteUrl(path: string): string {
  return absoluteUrlShared(path, SITE_URL)
}

export function buildAlternates(slug: string) {
  return buildAlternatesShared(slug, SITE_CONFIG)
}
