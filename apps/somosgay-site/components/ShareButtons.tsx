import { SITE_URL } from "@/lib/content";

/**
 * Share buttons — server-rendered for SSR-safe share URLs.
 *
 * Server-only component: emits pre-encoded WA / X / FB / LinkedIn URLs with the
 * page URL baked in at build/render time. No useEffect, no hydration mismatch.
 *
 * Layout philosophy: each button is a clean square-ish pill with icon + label.
 * On mobile they wrap to a 2x2 grid; on desktop they stay inline. The optional
 * copy block is in a separate row below (not inside the buttons row) so it
 * doesn't compete with the primary actions.
 */
export function ShareButtons({
  title,
  url,
  intro,
}: {
  title: string;
  /** Optional override. Defaults to the canonical site root. */
  url?: string;
  intro?: string;
}) {
  const shareUrl = url || `${SITE_URL}/`;

  const encUrl = encodeURIComponent(shareUrl);
  const encTitle = encodeURIComponent(title);

  const links = [
    {
      label: "WhatsApp",
      short: "WA",
      href: `https://wa.me/?text=${encTitle}%20${encUrl}`,
      bg: "bg-[#25D366] hover:bg-[#1DA851]",
    },
    {
      label: "X / Twitter",
      short: "X",
      href: `https://twitter.com/intent/tweet?text=${encTitle}&url=${encUrl}`,
      bg: "bg-black hover:bg-neutral-800",
    },
    {
      label: "Facebook",
      short: "FB",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`,
      bg: "bg-[#1877F2] hover:bg-[#166FE5]",
    },
    {
      label: "LinkedIn",
      short: "in",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`,
      bg: "bg-[#0A66C2] hover:bg-[#0855A8]",
    },
  ];

  return (
    <section
      aria-label="Compartir esta página"
      className="border-t border-[var(--color-warm-deep)] pt-8 mt-12"
    >
      {intro && (
        <p className="text-sm text-text-light mb-4 max-w-prose">{intro}</p>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-xs uppercase tracking-wider text-text-muted font-medium pr-1">
          Compartir
        </span>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartir en ${l.label}`}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-white text-xs font-medium transition-colors shadow-sm ${l.bg}`}
          >
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center min-w-[1.25rem] font-bold text-[11px] tracking-tight"
            >
              {l.short}
            </span>
            <span className="hidden sm:inline">{l.label.split(" ")[0]}</span>
          </a>
        ))}
      </div>

      {/* Enlace plano debajo, sin envolver los botones. Visible sin JS. */}
      <details className="mt-3 group">
        <summary className="cursor-pointer text-xs text-text-muted hover:text-text inline-flex items-center gap-1 list-none [&::-webkit-details-marker]:hidden">
          <span aria-hidden="true">🔗</span>
          <span>Copiar enlace</span>
        </summary>
        <p className="mt-2 text-xs font-mono text-text-light break-all bg-warm rounded px-3 py-2">
          {shareUrl}
        </p>
      </details>
    </section>
  );
}
