// Centralized i18n for Paraguay multi-locale support
// Supports: English, Spanish (default), Portuguese (Brazilian), Guaraní (Paraguay native)

export const locales = ['en', 'es', 'pt', 'guarani'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'es';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  guarani: "Avañe'ẽ",
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇵🇾',
  pt: '🇧🇷',
  guarani: '🇵🇾',
};

export function getLocale(pathname: string): Locale {
  const localeMatch = pathname.match(/^\/(en|es|pt|guarani)(\/|$)/);
  return (localeMatch?.[1] as Locale) || defaultLocale;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Translation loader
export type Translations = Record<string, any>;

// @ts-ignore - JSON imports resolved at build time
import es from './translations/es.json' with { type: 'json' };
// @ts-ignore
import en from './translations/en.json' with { type: 'json' };
// @ts-ignore
import pt from './translations/pt.json' with { type: 'json' };
// @ts-ignore
import guarani from './translations/guarani.json' with { type: 'json' };

const translations: Record<Locale, Translations> = {
  es,
  en,
  pt,
  guarani,
};

export function t(locale: Locale, key: string, params?: Record<string, string | number>): string {
  const dict = translations[locale] || translations[defaultLocale];
  const keys = key.split('.');
  let value: any = dict;
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to Spanish
      let fallback: any = translations[defaultLocale];
      for (const fk of keys) {
        if (fallback && typeof fallback === 'object' && fk in fallback) {
          fallback = fallback[fk];
        } else {
          return key; // Return key if not found
        }
      }
      return fallback;
    }
  }
  if (typeof value !== 'string') return key;
  if (params) {
    return Object.entries(params).reduce(
      (str, [k, v]) => str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v)),
      value
    );
  }
  return value;
}

// Hook for React components
export function useTranslation(locale: Locale) {
  return {
    t: (key: string, params?: Record<string, string | number>) => t(locale, key, params),
    locale,
  };
}
