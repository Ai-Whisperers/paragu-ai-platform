// lib/seo.ts — thin adapter over @ai-whisperers/site-seo.
//
// Every page's generateMetadata / static metadata should use
// buildAlternates(slug) for canonical + hreflang across all four locales.
// Static-page slugs are identical across en/es/nl/pt so no slugMap is needed.

import {
  buildAlternates as buildAlternatesShared,
  absoluteUrl as absoluteUrlShared,
  resolveSiteUrl,
  type SiteConfig,
} from "@ai-whisperers/site-seo"

export const SITE_URL = resolveSiteUrl("NEXT_PUBLIC_SITE_URL", "https://ai-whisperers.org")

const SITE_CONFIG: SiteConfig = {
  siteUrl: SITE_URL,
  defaultLocale: "en",
  locales: ["en", "es", "nl", "pt"] as const,
}

export function absoluteUrl(path: string): string {
  return absoluteUrlShared(path, SITE_URL)
}

export function buildAlternates(slug: string) {
  return buildAlternatesShared(slug, SITE_CONFIG)
}
