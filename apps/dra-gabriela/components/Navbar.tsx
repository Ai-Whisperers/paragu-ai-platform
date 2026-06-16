"use client"
// Navbar with locale-aware links. The site.json navigation entries use paths
// like "/es/filosofia" — when we render for a locale, we pick the matching
// entry and strip the leading locale to avoid /es/es duplication.

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { whatsappLink, isPlaceholder } from "@/lib/content"

const LANGS = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
] as const

export function Navbar({ locale, content }: { locale: string; content: any }) {
  const c = content
  const [open, setOpen] = useState(false)

  // Pick the right nav entries for the locale. site.json has separate
  // navigation arrays; fall back to the one in the current content bundle.
  const navMain: any[] = c.navigation?.main || []
  const navMore: any[] = c.navigation?.more || []

  const wa = whatsappLink(c.business?.whatsapp, c.business?.whatsappMessage)
  const base = `/${locale}`

  // Strip leading locale segment from a nav href like "/es/precios" → "/precios"
  // or "/es" → "" (empty so `${base}` alone points to the right place).
  // This avoids `${base}${href}` producing "/es/es".
  const localize = (href: string) => {
    if (!href) return ""
    if (href === "/" || href === `/${locale}`) return ""
    return href.replace(/^\/(en|es)/, "") || "/"
  }

  return (
    <nav className="sticky top-0 z-50 bg-[var(--surface)]/90 backdrop-blur border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={base} className="flex items-center gap-2.5 font-medium text-base">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--gold)] flex items-center justify-center text-white text-xs font-semibold">
              DG
            </span>
            <span className="hidden sm:inline tracking-tight">Dra. Gabriella</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navMain.slice(0, 5).map((it: any) => (
              <Link
                key={it.href}
                href={`${base}${localize(it.href)}`}
                className="px-3 py-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] rounded-md transition-colors"
              >
                {it.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 text-xs">
              {LANGS.map((l) => (
                <Link
                  key={l.code}
                  href={`/${l.code}`}
                  className={`px-2 py-1 rounded font-mono uppercase transition-colors ${
                    l.code === locale
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex btn btn-primary !py-2 !px-3 !text-sm">
                WhatsApp
              </a>
            ) : (
              <Link href={`${base}/contacto`} className="hidden sm:inline-flex btn btn-primary !py-2 !px-3 !text-sm">
                {locale === "es" ? "Contacto" : "Contact"}
              </Link>
            )}
            <button
              type="button"
              className="md:hidden p-2 -mr-2 text-[var(--fg)]"
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--surface)]">
          <div className="px-4 py-3 space-y-1">
            {[...navMain, ...navMore].map((it: any) => (
              <Link
                key={it.href}
                href={`${base}${localize(it.href)}`}
                className="block px-3 py-2 text-sm text-[var(--fg-muted)] hover:bg-[var(--surface-muted)] rounded-md"
                onClick={() => setOpen(false)}
              >
                {it.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-[var(--border)] flex items-center gap-2">
              {LANGS.map((l) => (
                <Link
                  key={l.code}
                  href={`/${l.code}`}
                  className={`px-3 py-1.5 rounded text-xs font-mono uppercase ${
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
