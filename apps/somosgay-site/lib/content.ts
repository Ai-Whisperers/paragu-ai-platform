// Multi-locale content wrapper.
// Backed by content/<locale>.json. Default is "es". Other locales (gn, en)
// are imported lazily so they only ship when actually rendered.

// Lightweight type — we don't generate types from JSON at build time
// (avoids extra dep). The shape is documented in `content/es.json` itself.
import es from "@/content/es.json";

type ESContent = typeof es;
export type Content = ESContent;

let cached: Record<string, Content | null> = { es };

export type Locale = "es" | "gn";

export const SUPPORTED_LOCALES: Locale[] = ["es", "gn"];
export const DEFAULT_LOCALE: Locale = "es";

/**
 * Look up content for a locale. Falls back to ES if the translation
 * file is missing (it's almost always present, since we ship both).
 */
export function getContent(locale: Locale = DEFAULT_LOCALE): Content {
  if (locale === "es") {
    if (!cached.es) cached.es = es as Content;
    return cached.es;
  }
  if (cached[locale]) return cached[locale]!;
  try {
    // Static dynamic import path needed for tree-shaken bundles.
    // In Next 16 server components, this becomes a synchronous compile-time
    // import inside its own module graph at build time.
    const mod = require(`@/content/${locale}.json`);
    cached[locale] = mod as Content;
    return cached[locale]!;
  } catch {
    cached[locale] = es as Content; // fail open to ES
    return cached.es!;
  }
}

export const content = getContent("es");

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://somosgay.paragu-ai.com";

export function localeFromPath(pathname: string | null): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  if (pathname.startsWith("/gn")) return "gn";
  return DEFAULT_LOCALE;
}
