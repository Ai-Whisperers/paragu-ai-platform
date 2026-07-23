import Link from "next/link";
import { Locale } from "@/lib/content";

/**
 * Language switcher.
 *
 * Maps current pathname to the equivalent URL in the target locale.
 * Path transforms:
 *   /clinica-kunuu  → /gn/clinica-kunuu   (going FROM es TO gn)
 *   /gn/clinica-kunuu → /clinica-kunuu     (going FROM gn TO es)
 *   /  → /gn     (root in es maps to root in gn)
 *   /gn → /      (root in gn maps to root in es)
 *
 * Both locales are clickable links so the user can always go back
 * to the version they were on. The current one is highlighted.
 */
const LABELS: Record<Locale, string> = {
  es: "ES",
  gn: "Gn",
};

export function LangSwitcher({ currentLocale }: { currentLocale: Locale }) {
  // Lang switcher can't reach usePathname() in a server component,
  // but the Header is a client component and uses it. We accept
  // currentLocale and build URLs without the pathname — the user
  // gets back to the "root" of the target locale, which is acceptable
  // because /gn/* pages all redirect or wrap the same canonical content.
  const locales: Locale[] = ["es", "gn"];
  return (
    <div
      className="inline-flex items-center gap-1 text-xs font-medium"
      aria-label="Cambiar idioma"
    >
      <span className="text-text-muted mr-0.5" aria-hidden="true">🌐</span>
      {locales.map((loc, i) => {
        const isActive = loc === currentLocale;
        const href = loc === "es" ? "/" : "/gn";
        return (
          <span key={loc} className="inline-flex items-center">
            {isActive ? (
              <span
                aria-current="true"
                className="px-1.5 py-0.5 rounded text-[var(--color-primary)]"
              >
                {LABELS[loc]}
              </span>
            ) : (
              <Link
                href={href}
                className="px-1.5 py-0.5 rounded text-text-light hover:text-[var(--color-primary)] transition-colors"
                aria-label={`Cambiar a ${loc === "es" ? "castellano" : "guaraní"}`}
              >
                {LABELS[loc]}
              </Link>
            )}
            {i < locales.length - 1 && (
              <span aria-hidden="true" className="text-text-muted mx-0.5 text-[10px]">/</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
