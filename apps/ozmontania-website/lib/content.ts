// Content loader — reads from content JSON with locale support
// In static pages, import directly: import es from '@/content/es.json'
// In client components, use getContentForLocale()

import es from '@/content/es.json'
import en from '@/content/en.json'
import type { SiteContent } from '@/types/content'

const locales: Record<string, SiteContent> = {
  es: es as unknown as SiteContent,
  en: en as unknown as SiteContent,
}

export const defaultLocale = 'es'

export function getContentForLocale(locale: string = defaultLocale): SiteContent {
  return locales[locale] || locales[defaultLocale]
}

export function getLocaleFromPath(path: string): string {
  // Check for /en/ prefix
  const match = path.match(/^\/(en)\//)
  return match?.[1] || defaultLocale
}

export function localePrefix(locale: string): string {
  return locale === defaultLocale ? '' : `/${locale}`
}
