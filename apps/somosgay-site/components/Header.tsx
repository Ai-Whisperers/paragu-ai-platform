"use client";
import { useState } from "react";
import Link from "next/link";
import { content as c } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-surface)] border-b border-[var(--color-warm-deep)]">
      {/* Rainbow strip on top */}
      <div className="rainbow-bar" aria-hidden="true" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="SOMOSGAY — ir al inicio">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">S</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-xl font-bold tracking-tight text-text">SOMOSGAY</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-text-muted">
                Tekoporã para todes
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {c.navigation.map((item: any) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  item.highlight
                    ? "bg-primary text-white hover:bg-[var(--color-purple-deep)]"
                    : "text-text-light hover:bg-warm hover:text-text",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-text-light hover:bg-warm"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-4 space-y-1">
            {c.navigation.map((item: any) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={[
                  "block px-3 py-2 text-sm font-medium rounded-md",
                  item.highlight
                    ? "bg-primary text-white"
                    : "text-text-light hover:bg-warm",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}