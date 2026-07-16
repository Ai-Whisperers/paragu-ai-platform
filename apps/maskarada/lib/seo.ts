// lib/seo.ts — thin adapter over @ai-whisperers/site-seo.
//
// Bilingual site (es default at /, en at /en). Static-page slugs are shared
// across locales so no slugMap is needed. Layout-level alternates apply to
// the site root; per-page metadata should call buildAlternates(slug).

import {
  buildAlternates as buildAlternatesShared,
  absoluteUrl as absoluteUrlShared,
  resolveSiteUrl,
  type SiteConfig,
} from "@ai-whisperers/site-seo"

export const SITE_URL = resolveSiteUrl("NEXT_PUBLIC_SITE_URL", "https://maskarada.paragu-ai.com")

const SITE_CONFIG: SiteConfig = {
  siteUrl: SITE_URL,
  defaultLocale: "es",
  locales: ["es", "en"] as const,
}

export function absoluteUrl(path: string): string {
  return absoluteUrlShared(path, SITE_URL)
}

export function buildAlternates(slug: string) {
  return buildAlternatesShared(slug, SITE_CONFIG)
}
