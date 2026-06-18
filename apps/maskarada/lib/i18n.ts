// Lightweight i18n helper for the data layer.
//
// Each data file in /lib/ exports entries that are mostly Spanish.
// To support /en/*, we add `*En` fields to each entry that hold the
// English translation of the most-visible strings (title, name,
// tagline, excerpt). The longer body text stays Spanish for now —
// when Kiki/you hire a translator, this is the surface to translate.
//
// Usage:
//   const lang = getLocaleFromRequest();
//   const title = pick(lang, g.title, g.titleEn);

export type Locale = "es" | "en";

/** Default to ES if the caller doesn't pass a locale. */
export function pick<T>(locale: Locale | undefined | null, es: T, en?: T): T {
  if (locale === "en" && en !== undefined) return en;
  return es;
}

/** Mark a string as "EN placeholder" — falls back to ES at runtime.
 *  This lets us ship a partial EN layer without pretending. */
export const EN_TBD = "EN_TBD";

/** Cookie / URL helper. Use `headers()` in server components. */
export function localeFromPath(pathname: string | null | undefined): Locale {
  if (pathname && pathname.startsWith("/en")) return "en";
  return "es";
}
