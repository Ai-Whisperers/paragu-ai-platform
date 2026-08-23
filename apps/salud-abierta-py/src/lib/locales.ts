// locales.ts — bilingual routing simple para MVP
export const LOCALES = ['es', 'en', 'guarani'] as const;
export type Locale = typeof LOCALES[number];
export const DEFAULT_LOCALE: Locale = 'es';

export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  guarani: "Avañe'ẽ",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  es: '🇵🇾',
  en: '🇬🇧',
  guarani: '🇵🇾',
};

export function isValidLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
