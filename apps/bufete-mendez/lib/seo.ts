// lib/seo.ts — thin adapter over @ai-whisperers/site-seo.
//
// Bufete Mendez is currently single-locale (es). The alternates block used
// to declare an /en/ URL that doesn't exist as a real route — misleading
// hreflang. This adapter emits accurate canonical + es hreflang only.

import {
  buildAlternates as buildAlternatesShared,
  absoluteUrl as absoluteUrlShared,
  resolveSiteUrl,
  type SiteConfig,
} from "@ai-whisperers/site-seo"

export const SITE_URL = resolveSiteUrl("NEXT_PUBLIC_SITE_URL", "https://bufete-mendez.paragu-ai.com")

const SITE_CONFIG: SiteConfig = {
  siteUrl: SITE_URL,
  defaultLocale: "es",
  locales: ["es"] as const,
}

export function absoluteUrl(path: string): string {
  return absoluteUrlShared(path, SITE_URL)
}

export function buildAlternates(slug: string) {
  return buildAlternatesShared(slug, SITE_CONFIG)
}
