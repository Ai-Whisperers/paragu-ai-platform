// Multi-locale content wrapper.
// Backed by content/<locale>.json. Default is "es". Other locales (gn, en)
// are imported lazily so they only ship when actually rendered.

// Lightweight type — we don't generate types from JSON at build time
// (avoids extra dep). The shape is documented in `content/es.json` itself.
import es from "@/content/es.json";
import gn from "@/content/gn.json";

type ESContent = typeof es;
export type Content = ESContent;

export type Locale = "es" | "gn";

export const SUPPORTED_LOCALES: Locale[] = ["es", "gn"];
export const DEFAULT_LOCALE: Locale = "es";

const cached: Record<Locale, Content> = {
  es: es as Content,
  gn: gn as Content,
};

/**
 * Look up content for a locale. Falls back to ES if the translation
 * file is missing (it's almost always present, since we ship both).
 */
export function getContent(locale: Locale = DEFAULT_LOCALE): Content {
  return cached[locale] ?? cached.es;
}

export const content = getContent("es");

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://somosgay.paragu-ai.com";

export function localeFromPath(pathname: string | null): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  if (pathname.startsWith("/gn")) return "gn";
  return DEFAULT_LOCALE;
}
