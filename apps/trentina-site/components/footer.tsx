import content from "@/content/es.json";

export default function Footer() {
  const footer = (content as any).footer || {};
  const site = (content.site || {}) as Record<string, string>;
  const links = footer.links || [];
  const nav = (content.navigation || []) as { href: string; label: string }[];
  const navLinks = nav.length > 0 ? nav : links;

  return (
    <footer className="bg-[var(--color-surface)]">
      {/* Gold accent line at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />

      <div className="container-page section-padding-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand + Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-[var(--font-heading)] font-bold text-[var(--color-accent)] mb-4 tracking-wider">
              {site.shortName || "Trentina"}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {site.description || "Cerveza artesanal paraguaya — elaborada en Santa Rita, Alto Paraná con tradición y pasión"}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-light)] mb-4 font-semibold">
              Enlaces
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link: { href: string; label: string }) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-light)] mb-4 font-semibold">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-[var(--color-text-muted)]">
              {site.addressShort && (
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 shrink-0 text-[var(--color-accent)]"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{site.addressShort}</span>
                </li>
              )}
              {site.phone && (
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-[var(--color-accent)]"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a
                    href={`tel:${site.phone}`}
                    className="hover:text-[var(--color-accent)] transition-colors"
                  >
                    {site.phone}
                  </a>
                </li>
              )}
              {site.email && (
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-[var(--color-accent)]"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a
                    href={`mailto:${site.email}`}
                    className="hover:text-[var(--color-accent)] transition-colors"
                  >
                    {site.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-light)] mb-4 font-semibold">
              Seguinos
            </h4>
            <div className="flex gap-3">
              {site.instagram && (
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-200"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              )}
              {site.facebook && (
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-200"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}
              {site.whatsapp && (
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 0 1" />
                    <path d="M14 10a.5.5 0 0 0 0 1" />
                    <path d="M13.5 13.5c-.7.7-1.5 1-2.5 1s-1.8-.3-2.5-1" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span>{footer.copyright}</span>
          <a
            href={footer.poweredByUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[var(--color-text-muted)]/40 hover:text-[var(--color-text-muted)]/60 transition-colors"
            title="Hecho por Ai-Whisperers"
          >
            ⚙ Ai-Whisperers
          </a>
        </div>
      </div>
    </footer>
  );
}
