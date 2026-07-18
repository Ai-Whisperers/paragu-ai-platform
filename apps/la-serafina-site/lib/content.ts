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

const SOURCES: Record<Locale, Content> = {
  es: es as Content,
  gn: gn as Content,
};

const cached: Record<Locale, Content | null> = { es: SOURCES.es, gn: null };

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
