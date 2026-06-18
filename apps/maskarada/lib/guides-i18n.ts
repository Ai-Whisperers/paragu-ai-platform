// Data-loader that supports the EN side of /aprender/[slug] pages.
// Usage:
//   import { getGuideI18n } from "@/lib/guides-i18n";
//   const g = getGuideI18n("que-es-bdsm", "en");
//   // returns: { title, excerpt, body } — EN if available, else ES
//
// The /en page wrapper should set the html lang + page metadata based
// on the locale. The page body still reads the Spanish guide and gets
// the override from this file when locale="en".

import { guides, getGuide } from "./guides";
import { GUIDES_EN } from "./guides-en";
import type { Guide } from "./guides";

export function getGuideI18n(slug: string, locale: "es" | "en"): Guide | null {
  const g = getGuide(slug);
  if (!g) return null;
  if (locale === "es") return g;
  const override = GUIDES_EN[slug];
  if (!override) return g; // fallback to Spanish
  return { ...g, title: override.title, excerpt: override.excerpt, body: override.body };
}

export function listGuidesI18n(locale: "es" | "en") {
  if (locale === "es") return guides;
  return guides.map((g) => {
    const override = GUIDES_EN[g.slug];
    if (!override) return g;
    return { ...g, title: override.title, excerpt: override.excerpt };
  });
}
