import { buildAlternates, pathForLocale, type Locale, type SiteConfig } from "./alternates.js"

export interface OpenGraphLocaleMap {
  [locale: string]: string
}

export interface BuildMetadataInput {
  slug: string
  title: string
  description: string
  locale: Locale
  ogImage?: string
  ogType?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

export interface BuildMetadataConfig extends SiteConfig {
  siteName: string
  ogLocaleMap?: OpenGraphLocaleMap
  defaultOgImage?: string
  ogImagePathPrefix?: string
}

function deriveOgImage(slug: string, prefix: string, fallback: string): string {
  if (!slug) return fallback
  const normalized = slug.replace(/\//g, "-")
  return `${prefix}/og-${normalized}.png`
}

export function buildMetadata(
  input: BuildMetadataInput,
  config: BuildMetadataConfig
) {
  const {
    slug,
    title,
    description,
    locale,
    ogImage,
    ogType = "website",
    publishedTime,
    modifiedTime,
    author,
  } = input

  const {
    siteUrl,
    siteName,
    ogLocaleMap,
    defaultOgImage = "/og/og-home.png",
    ogImagePathPrefix = "/og",
  } = config

  const alts = buildAlternates(slug, config)
  const ogLocale = ogLocaleMap?.[locale] ?? locale
  const resolvedOgImage =
    ogImage ?? (slug ? deriveOgImage(slug, ogImagePathPrefix, defaultOgImage) : defaultOgImage)

  const ogUrl =
    locale === config.defaultLocale
      ? alts.canonical
      : `${siteUrl}${pathForLocale(slug, locale, config)}`

  return {
    title,
    description,
    alternates: alts,
    openGraph: {
      type: ogType,
      locale: ogLocale,
      url: ogUrl,
      siteName,
      title,
      description,
      images: [{ url: resolvedOgImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [resolvedOgImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
  }
}

export function resolveSiteUrl(envVarName: string, fallback: string): string {
  const g = globalThis as { process?: { env?: Record<string, string | undefined> } }
  const fromEnv = g.process?.env?.[envVarName]
  return fromEnv || fallback
}
