export type Locale = string

export interface SiteConfig {
  siteUrl: string
  defaultLocale: Locale
  locales: readonly Locale[]
  slugMap?: Record<Locale, Record<string, string>>
}

export interface AlternatesResult {
  canonical: string
  languages: Record<string, string>
}

function stripLocale(path: string, locales: readonly Locale[]): string {
  const alt = locales.join("|")
  return path.replace(new RegExp(`^\\/(${alt})\\b`), "").replace(/^\/+/, "")
}

function withLocale(slug: string, locale: Locale): string {
  return slug ? `/${locale}/${slug}` : `/${locale}`
}

function translateSlug(slug: string, fromLocale: Locale, toLocale: Locale, slugMap: SiteConfig["slugMap"]): string {
  if (!slugMap || fromLocale === toLocale) return slug
  const map = slugMap[fromLocale]?.[slug]
  if (map) return slugMap[toLocale]?.[map] ?? map
  return slug
}

export function buildAlternates(slug: string, config: SiteConfig): AlternatesResult {
  const { siteUrl, defaultLocale, locales, slugMap } = config
  const canonicalSlug = slug
  const canonical = `${siteUrl}${withLocale(canonicalSlug, defaultLocale)}`
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    const localizedSlug = translateSlug(canonicalSlug, defaultLocale, locale, slugMap)
    languages[locale] = `${siteUrl}${withLocale(localizedSlug, locale)}`
  }
  languages["x-default"] = canonical
  return { canonical, languages }
}

export function absoluteUrl(path: string, siteUrl: string): string {
  if (path.startsWith("http")) return path
  return `${siteUrl}${path.startsWith("/") ? path : "/" + path}`
}

export function pathForLocale(slug: string, locale: Locale, config: SiteConfig): string {
  const localized = translateSlug(slug, config.defaultLocale, locale, config.slugMap)
  return withLocale(localized, locale)
}

export { stripLocale, withLocale }
