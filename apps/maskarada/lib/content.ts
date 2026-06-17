// Locale-aware content loader. Currently supports 'es' (default) and 'en'.
// To add a locale: create content/<code>.json, add to LOCALES + translations.

import esContent from "@/content/es.json";
import enContent from "@/content/en.json";

export type Locale = "es" | "en";

export const LOCALES: readonly Locale[] = ["es", "en"] as const;
export const DEFAULT_LOCALE: Locale = "es";

const CONTENT: Record<Locale, typeof esContent> = {
  es: esContent as typeof esContent,
  en: enContent as typeof esContent,
};

/**
 * Resolve the current locale.
 * 1. Explicit `locale` argument (e.g. server component that read it from cookies/headers).
 * 2. Otherwise defaults to DEFAULT_LOCALE.
 *
 * Pages should call `getContent()` server-side after reading the locale from
 * `cookies()` (the `mk_locale` cookie is set by the language switcher and the
 * LocaleRedirect middleware).
 */
export function getContent(locale?: Locale | string) {
  const l: Locale = LOCALES.includes(locale as Locale) ? (locale as Locale) : DEFAULT_LOCALE;
  return CONTENT[l];
}

/**
 * Backwards-compat default export. Existing imports of `content` continue
 * to work — they always get Spanish. New code should use `getContent(locale)`.
 */
export const content = CONTENT[DEFAULT_LOCALE];

export type SiteContent = typeof esContent;

export function whatsappLink(message = "Hola! Quiero info sobre maškaráda"): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${content.site.whatsappNumber}?text=${text}`;
}

export function localizedWhatsappLink(locale: Locale, message?: string): string {
  const defaults: Record<Locale, string> = {
    es: "Hola! Quiero info sobre maškaráda",
    en: "Hi! I'd like to know more about maškaráda",
  };
  const text = encodeURIComponent(message ?? defaults[locale] ?? defaults[DEFAULT_LOCALE]);
  return `https://wa.me/${content.site.whatsappNumber}?text=${text}`;
}
