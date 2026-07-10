import Link from "next/link";
import { localeFromPath, Locale } from "@/lib/content";

/**
 * Server-only language switcher.
 *
 * Maps current pathname to its translated twin in the target locale.
 * No JS needed — pure <a> tags. Uses localeFromPath + simple prefix swap.
 *
 * Visible always (top of nav). Stays minimal so it doesn't compete
 * with the main menu.
 */
const LABELS: Record<Locale, string> = {
  es: "Castellano",
  gn: "Guaraní",
};

export function LangSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const locales: Locale[] = ["es", "gn"];
  return (
    <div
      className="inline-flex items-center gap-1 text-xs"
      aria-label="Cambiar idioma"
    >
      <span className="text-text-muted mr-1">🌐</span>
      {locales.map((loc, i) => {
        const isActive = loc === currentLocale;
        return (
          <span key={loc} className="inline-flex items-center">
            {isActive ? (
              <span
                aria-current="true"
                className="px-2 py-1 rounded text-[var(--color-primary)] font-bold"
              >
                {LABELS[loc]}
              </span>
            ) : (
              <Link
                href={`/${loc}`}
                className="px-2 py-1 rounded text-text-light hover:text-[var(--color-primary)] transition-colors"
              >
                {LABELS[loc]}
              </Link>
            )}
            {i < locales.length - 1 && (
              <span aria-hidden="true" className="text-text-muted mx-0.5">
                /
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export { localeFromPath };
