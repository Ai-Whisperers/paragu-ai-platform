// Multi-locale content wrapper.
// Backed by content/<locale>.json. Default is "es". Guaraní ("gn") ships
// a partial translation for the home + landing pages; the canonical site
// remains Spanish per AIREANA's audit (2026-07-11).

import es from "@/content/es.json";
import gn from "@/content/gn.json";

type ESContent = typeof es;
export type Content = ESContent;

export type Locale = "es" | "gn";

export const SUPPORTED_LOCALES: Locale[] = ["es", "gn"];
export const DEFAULT_LOCALE: Locale = "es";

// Deep-merge partial locale over es fallback. `gn` intentionally ships a
// partial translation — any key it omits falls back to the Spanish canonical.
function deepMerge<T>(base: T, override: unknown): T {
  if (
    override === null ||
    typeof override !== "object" ||
    Array.isArray(override) ||
    Array.isArray(base) ||
    typeof base !== "object" ||
    base === null
  ) {
    return (override === undefined ? base : (override as T));
  }
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  const over = override as Record<string, unknown>;
  for (const key of Object.keys(over)) {
    out[key] = deepMerge(
      (base as Record<string, unknown>)[key],
      over[key],
    );
  }
  return out as T;
}

const SOURCES: Record<Locale, Content> = {
  es: es as Content,
  gn: deepMerge<Content>(es as Content, gn),
};

const cached: Record<Locale, Content | null> = { es: SOURCES.es, gn: SOURCES.gn };

export function getContent(locale: Locale = DEFAULT_LOCALE): Content {
  const hit = cached[locale];
  if (hit) return hit;
  const next = SOURCES[locale] ?? SOURCES.es;
  cached[locale] = next;
  return next;
}

export const content = getContent("es");

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://laserafina.paragu-ai.com";

export function localeFromPath(pathname: string | null): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  if (pathname.startsWith("/gn")) return "gn";
  return DEFAULT_LOCALE;
}
