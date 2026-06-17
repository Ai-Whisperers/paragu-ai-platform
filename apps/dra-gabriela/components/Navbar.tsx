// Navbar — bilingual EN/ES
// Sticky top nav with: logo + main nav links + lang switcher + WhatsApp/Contact CTA
// Mobile: hamburger reveals a stacked menu with everything
//
// Style: uses NAMED Tailwind tokens (bg-accent, text-fg, etc.) instead of
// arbitrary [var(--...)] classes, because the v4 content scanner intermittently
// drops arbitrary-value utilities from the generated CSS.

"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, MessageCircle } from "lucide-react"
import { whatsappLink } from "@/lib/content"

const LANGS = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
] as const

const NAV_ITEMS_EN = [
  { href: "/philosophy", label: "Philosophy" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const

const NAV_ITEMS_ES = [
  { href: "/filosofia", label: "Filosofía" },
  { href: "/servicios", label: "Servicios" },
  { href: "/precios", label: "Precios" },
  { href: "/contacto", label: "Contacto" },
] as const

export function Navbar({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false)
  const base = `/${locale}`
  const isEs = locale === "es"
  const items = isEs ? NAV_ITEMS_ES : NAV_ITEMS_EN
  const ctaLabel = isEs ? "WhatsApp" : "WhatsApp"
  // Resolve business contact for CTA — hide gracefully if placeholder
  // (business.whatsapp / phone are loaded by callers via getContent; we keep
  // this pure by not importing site.json directly. The CTA is a fallback link.)
  const ctaHref = isEs ? "/es/contacto" : "/en/contact"

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border-light">
      <div className="flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href={base} className="flex items-center gap-3 group">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center text-white text-xs font-semibold tracking-wider shadow-sm group-hover:shadow-md transition-shadow">
            DG
          </span>
          <span className="hidden sm:inline text-sm font-medium text-fg tracking-tight">
            Dra. Gabriella
          </span>
        </Link>

        {/* Desktop main nav */}
        <div className="hidden md:flex items-center gap-1">
          {items.map((it) => (
            <Link
              key={it.href}
              href={`${base}${it.href}`}
              className="px-3.5 py-2 text-sm text-fg-muted hover:text-fg hover:bg-surface-muted rounded-lg transition-all"
            >
              {it.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Lang switcher — explicit border + bg for visible inactive state.
              Active state uses bg-accent (named) + text-white. Inactive uses
              text-fg-subtle + bg-transparent + border-border-light so it's
              always clickable and visible. */}
          <div
            className="hidden sm:flex items-center gap-1 text-xs font-mono p-1 rounded-lg border border-border-light bg-surface/60"
            role="group"
            aria-label="Language switcher"
          >
            {LANGS.map((l) => {
              const isActive = l.code === locale
              return (
                <Link
                  key={l.code}
                  href={`/${l.code}`}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={isActive ? `Current language: ${l.label}` : `Switch to ${l.label}`}
                  className={
                    "px-2.5 py-1.5 rounded-md uppercase tracking-wider transition-all font-semibold " +
                    (isActive
                      ? "bg-accent text-white shadow-sm"
                      : "text-fg-subtle hover:text-fg hover:bg-surface-muted")
                  }
                >
                  {l.label}
                </Link>
              )
            })}
          </div>

          {/* Primary CTA — WhatsApp / Contact */}
          <Link
            href={ctaHref}
            className="hidden sm:inline-flex btn btn-primary !py-2 !px-4 !text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            {isEs ? "Coordinar consulta" : "Book a consultation"}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-fg rounded-lg hover:bg-surface-muted transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {open && (
        <div className="md:hidden border-t border-border-light bg-surface">
          <div className="px-4 py-3 space-y-1">
            {items.map((it) => (
              <Link
                key={it.href}
                href={`${base}${it.href}`}
                className="block px-3 py-2.5 text-sm text-fg-muted hover:bg-surface-muted rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                {it.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 flex items-center gap-2">
              {LANGS.map((l) => {
                const isActive = l.code === locale
                return (
                  <Link
                    key={l.code}
                    href={`/${l.code}`}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      "px-3 py-1.5 text-xs font-mono font-semibold rounded-md uppercase tracking-wider " +
                      (isActive
                        ? "bg-accent text-white"
                        : "text-fg-muted border border-border-light hover:bg-surface-muted")
                    }
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                )
              })}
            </div>
            <Link
              href={ctaHref}
              className="btn btn-primary w-full mt-2"
              onClick={() => setOpen(false)}
            >
              <MessageCircle className="w-4 h-4" />
              {isEs ? "Coordinar consulta" : "Book a consultation"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
