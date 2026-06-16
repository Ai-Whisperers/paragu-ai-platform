"use client"
// Navbar — glassmorphism, locale-aware nav, mobile hamburger.

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { whatsappLink } from "@/lib/content"

const LANGS = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
] as const

export function Navbar({ locale, content }: { locale: string; content: any }) {
  const c = content
  const [open, setOpen] = useState(false)
  const navMain: any[] = c.navigation?.main || []
  const navMore: any[] = c.navigation?.more || []
  const wa = whatsappLink(c.business?.whatsapp, c.business?.whatsappMessage)
  const base = `/${locale}`
  const isEs = locale === "es"

  const localize = (href: string) => {
    if (!href || href === "/" || href === `/${locale}`) return ""
    return href.replace(/^\/(en|es)/, "") || "/"
  }

  return (
    <nav className="sticky top-0 z-50 bg-[var(--surface)]/80 backdrop-blur-xl border-b border-[var(--border-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={base} className="flex items-center gap-3 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center text-white text-xs font-semibold tracking-wider shadow-sm group-hover:shadow-md transition-shadow">
              DG
            </span>
            <span className="hidden sm:inline text-sm font-medium text-[var(--fg)] tracking-tight">
              Dra. Gabriella
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navMain.slice(0, 5).map((it: any) => (
              <Link
                key={it.href}
                href={`${base}${localize(it.href)}`}
                className="px-3.5 py-2 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-muted)] rounded-lg transition-all"
              >
                {it.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Lang switcher */}
            <div className="hidden sm:flex items-center gap-1 text-xs font-mono">
              {LANGS.map((l) => (
                <Link
                  key={l.code}
                  href={`/${l.code}`}
                  className={`px-2.5 py-1.5 rounded-lg uppercase tracking-wider transition-all ${
                    l.code === locale
                      ? "bg-[var(--accent)] text-white shadow-sm"
                      : "text-[var(--fg-subtle)] hover:text-[var(--fg)] hover:bg-[var(--surface-muted)]"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* WhatsApp / Contact button */}
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex btn btn-primary !py-2 !px-4 !text-sm !gap-1.5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>
                WhatsApp
              </a>
            ) : (
              <Link href={`${base}/contacto`} className="hidden sm:inline-flex btn btn-primary !py-2 !px-4 !text-sm">
                {isEs ? "Contacto" : "Contact"}
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden p-2 -mr-2 text-[var(--fg)] rounded-lg hover:bg-[var(--surface-muted)] transition-colors"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--border-light)] bg-[var(--surface)] shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {[...navMain, ...navMore].map((it: any) => (
              <Link
                key={it.href}
                href={`${base}${localize(it.href)}`}
                className="block px-3 py-2.5 text-sm text-[var(--fg-muted)] hover:bg-[var(--surface-muted)] rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                {it.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-3 mt-3 border-t border-[var(--border-light)]">
              {LANGS.map((l) => (
                <Link
                  key={l.code}
                  href={`/${l.code}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase ${
                    l.code === locale ? "bg-[var(--accent)] text-white" : "bg-[var(--surface-muted)] text-[var(--fg-muted)]"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
