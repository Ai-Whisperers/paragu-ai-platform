// Centralized i18n for Paraguay multi-locale support
export const locales = ['en', 'es', 'pt', 'guarani'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'es';

export function getLocale(pathname: string): Locale {
  const localeMatch = pathname.match(/^\/(en|es|pt|guarani)(\/|$)/);
  return (localeMatch?.[1] as Locale) || defaultLocale;
}
