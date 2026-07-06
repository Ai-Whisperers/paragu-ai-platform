"use client";

import Link from "next/link";
import { CrossInverted, OrnamentalBorder, DividerOrnament, Skull, CrescentMoon } from "./ornaments";

export function Footer({ content }: { content: any }) {
  const f = content.footer || {};
  const contact = content.contacto || {};
  const cols = f.columns || [];
  const social = f.social || [];

  return (
    <footer className="relative bg-[var(--color-background)] border-t border-[var(--color-border)] pt-12 pb-24 md:pb-10 text-[var(--color-foreground)] mt-12">
      <div className="absolute top-0 left-0 right-0 h-px">
        <OrnamentalBorder className="w-full h-2" />
      </div>
      <div className="absolute top-2 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        <div className="flex justify-center mb-6 text-[var(--color-primary-light)]">
          <CrescentMoon size={26} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-10 h-10 border border-[var(--color-primary-light)] rotate-45">
                <span className="-rotate-45 font-[var(--font-display)] text-[var(--color-primary-light)] font-bold">
                  P
                </span>
              </span>
              <div className="flex flex-col">
                <span className="font-[var(--font-display)] tracking-[0.18em] text-[1.05rem] uppercase font-semibold">
                  Pierce Charm
                </span>
                <span className="font-[var(--font-script)] text-[var(--color-gold)] text-[1.4rem] leading-none">
                  estudio alternativo
                </span>
              </div>
            </div>
            <p className="text-[var(--color-muted-foreground)] text-[0.92rem] leading-relaxed">
              Estudio profesional de piercings y joyería alternativa en Asunción, Paraguay.
            </p>
            <div className="flex items-center gap-3 mt-4 text-[var(--color-primary-light)]">
              <Skull size={16} />
              <CrossInverted size={14} />
              <CrossInverted size={14} />
              <Skull size={16} />
            </div>
          </div>

          {cols.map((col: any, i: number) => (
            <div key={i}>
              <h4 className="font-[var(--font-display)] text-[0.78rem] uppercase tracking-[0.28em] text-[var(--color-primary-light)] mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links?.map((l: any, j: number) => (
                  <li key={j}>
                    <Link
                      href={l.href}
                      className="text-[0.92rem] text-[var(--color-foreground)]/70 hover:text-[var(--color-gold)] no-underline transition-colors"
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <DividerOrnament className="mt-10" />

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[var(--color-muted-foreground)] text-[0.88rem] mb-5">
          {(f.contactStrip || []).map((s: any, i: number) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-[var(--color-primary-light)]">⚜</span>}
              <span>{s.label}</span>
            </span>
          ))}
          {contact.whatsappDisplay && (
            <span className="flex items-center gap-2">
              <span className="text-[var(--color-primary-light)]">⚜</span>
              <span>{contact.whatsappDisplay}</span>
            </span>
          )}
        </div>

        <div className="flex justify-center items-center gap-5 mb-5">
          {social.map((s: any, i: number) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 border border-[var(--color-border)] text-[var(--color-foreground)]/70 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all no-underline"
              aria-label={s.label}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37 A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37 Z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          ))}
        </div>

        <p className="text-center text-[0.8rem] text-[var(--color-muted-foreground)]">
          {f.copy} · {f.ornament}
        </p>
      </div>
    </footer>
  );
}