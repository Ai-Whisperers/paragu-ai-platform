import content from "@/content/es.json";
import { MapPin, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  const footer = (content as any).footer || {};
  const site = (content as any).site || {};
  const links = footer.links || [];
  const nav = (content.navigation || []) as { href: string; label: string }[];

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] section-padding-sm pb-safe">
      <div className="container-page">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-6 mb-8 text-left">
          <div>
            <h3 className="text-2xl font-[var(--font-heading)] font-bold text-gold mb-3 tracking-wider">
              {site.shortName || "Rocka Bar"}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {site.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-[var(--color-text-light)] mb-3 font-bold">
              Enlaces
            </h4>
            <ul className="space-y-2">
              {(nav.length > 0 ? nav : links).map(
                (link: { href: string; label: string }) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--color-text-muted)] hover:text-gold transition-colors tap inline-flex items-center"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-[var(--color-text-light)] mb-3 font-bold">
              Contacto
            </h4>
            <ul className="space-y-2.5 text-sm text-[var(--color-text-muted)]">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                <span>{site.addressShort}</span>
              </li>
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="hover:text-gold transition-colors flex items-center gap-2"
                >
                  <Phone size={14} className="shrink-0 text-gold" />
                  {site.phone}
                </a>
              </li>
              {site.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors flex items-center gap-2"
                  >
                    <MessageCircle size={14} className="shrink-0 text-gold" />
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[var(--color-text-muted)] text-center sm:text-left">
          <span>{footer.copyright}</span>
          <a
            href={footer.poweredByUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors"
          >
            {footer.poweredBy}
          </a>
        </div>
      </div>
    </footer>
  );
}
