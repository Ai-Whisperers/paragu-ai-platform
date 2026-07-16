// Multi-locale content wrapper.
// Backed by content/<locale>.json. Default is "es". Guaraní ("gn") ships
// a partial translation for the home + landing pages; the canonical site
// remains Spanish per AIREANA's audit (2026-07-11).

import es from "@/content/es.json";

type ESContent = typeof es;
export type Content = ESContent;

let cached: Record<string, Content | null> = { es };

export type Locale = "es" | "gn";

export const SUPPORTED_LOCALES: Locale[] = ["es", "gn"];
export const DEFAULT_LOCALE: Locale = "es";

/**
 * Look up content for a locale. Falls back to ES if the translation
 * file is missing — defensive against partial translations.
 */
export function getContent(locale: Locale = DEFAULT_LOCALE): Content {
  if (locale === "es") {
    if (!cached.es) cached.es = es as Content;
    return cached.es;
  }
  if (cached[locale]) return cached[locale]!;
  try {
    const mod = require(`@/content/${locale}.json`);
    cached[locale] = mod as Content;
    return cached[locale]!;
  } catch {
    cached[locale] = es as Content;
    return cached.es!;
  }
}

export const content = getContent("es");

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://laserafina.paragu-ai.com";

export function localeFromPath(pathname: string | null): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  if (pathname.startsWith("/gn")) return "gn";
  return DEFAULT_LOCALE;
}
