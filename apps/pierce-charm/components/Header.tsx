"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/site-config";

export function Header({ content }: { content: any }) {
  const nav = content.navigation || [];
  const phone = content.contacto?.whatsapp || "595981324569";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-background)]/90 backdrop-blur-md border-b border-[var(--color-border)] shadow-2xl"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2.5 no-underline text-[var(--color-foreground)]">
          <span className="flex items-center justify-center w-9 h-9 border border-[var(--color-primary-light)] rotate-45">
            <span className="-rotate-45 font-[var(--font-display)] text-base font-bold text-[var(--color-primary-light)]">
              P
            </span>
          </span>
          <div className="flex flex-col leading-none">
            <span
              className="font-[var(--font-display)] tracking-[0.18em] text-[0.82rem] uppercase text-[var(--color-foreground)]"
              style={{ fontWeight: 600 }}
            >
              Pierce
            </span>
            <span
              className="font-[var(--font-display)] tracking-[0.18em] text-[0.82rem] uppercase"
              style={{ fontWeight: 600, color: "var(--color-gold)" }}
            >
              Charm
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Navegación principal">
          {nav.map((n: any) => {
            const isActive = n.href === "/" ? pathname === "/" : pathname?.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative no-underline font-[var(--font-display)] text-[0.78rem] uppercase tracking-[0.22em] py-2 transition-colors ${
                  isActive
                    ? "text-[var(--color-primary-light)]"
                    : "text-[var(--color-foreground)]/80 hover:text-[var(--color-foreground)]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {n.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary-light)] to-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={whatsappUrl(phone, "Hola! Quiero reservar una cita.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex tap border border-[var(--color-primary-light)] px-4 py-2 font-[var(--font-display)] text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-foreground)] hover:bg-[var(--color-primary)] hover:border-[var(--color-gold)] transition-all"
          >
            Reservar
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden tap w-10 h-10 flex flex-col items-center justify-center gap-1.5 border border-[var(--color-border)] text-[var(--color-foreground)]"
            aria-label="Menú"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className={`block w-5 h-px bg-current transition-transform ${open ? "rotate-45 translate-y-3.5" : ""}`} />
            <span className={`block w-5 h-px bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-current transition-transform ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Menú móvil"
        aria-hidden={!open}
        className={`md:hidden overflow-hidden bg-[var(--color-background)]/98 backdrop-blur-md border-b border-[var(--color-border)] transition-[max-height] duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col p-5 gap-1" aria-label="Navegación móvil">
          {nav.map((n: any) => (
            <Link
              key={n.href}
              href={n.href}
              className="tap font-[var(--font-display)] text-[0.85rem] uppercase tracking-[0.22em] py-3 px-3 border-l-2 border-transparent hover:border-[var(--color-primary-light)] hover:bg-[var(--color-surface)]/30 transition-all"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href={whatsappUrl(phone, "Hola! Quiero reservar una cita.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gothic tap mt-3 w-full justify-center"
          >
            Reservar cita
          </Link>
        </nav>
      </div>
    </header>
  );
}