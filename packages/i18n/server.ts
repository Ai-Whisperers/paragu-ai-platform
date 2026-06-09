// Server-side translation helpers (no React hooks)
// Use these in Server Components, route handlers, and metadata

import { t as baseT, getLocale, type Locale } from './index';

export function translate(locale: Locale, key: string, params?: Record<string, string | number>): string {
  return baseT(locale, key, params);
}

export function translateFromPath(pathname: string, key: string, params?: Record<string, string | number>): string {
  const locale = getLocale(pathname);
  return baseT(locale, key, params);
}
