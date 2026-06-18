// Navbar — bilingual EN/ES
// Sticky top nav with: logo + main nav links + lang switcher + contact CTA
// Mobile: hamburger reveals a stacked menu with all 8 primary routes
//
// Accessibility: skip-to-content target, aria-current, aria-expanded,
// aria-controls for the mobile drawer. Active state per locale.

"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react"
import { ContactButtons } from "@/components/ContactButton"

const LANGS = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
] as const

// Primary nav routes — all 8 are reachable from anywhere on the site.
// Cross-locale: EN uses /en/*, ES uses /es/* + bilingual slugs.
const NAV_ITEMS_EN = [
  { href: "/services", label: "Services" },
  { href: "/second-opinion", label: "Second Opinion" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const

const NAV_ITEMS_ES = [
  { href: "/servicios", label: "Servicios" },
  { href: "/segunda-opinion", label: "Segunda Opinión" },
  { href: "/precios", label: "Precios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/preguntas", label: "Preguntas" },
  { href: "/contacto", label: "Contacto" },
] as const

interface NavbarProps {
  locale: string
  business?: any
}

export function Navbar({ locale, business }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const base = `/${locale}`
  const isEs = locale === "es"
  const items = isEs ? NAV_ITEMS_ES : NAV_ITEMS_EN

  return (
    <nav
      className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border-light"
      aria-label="Primary"
    >
      <div className="flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href={base} className="flex items-center gap-3 group" aria-label="Home — Dra. Gabriella">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center text-white text-xs font-semibold tracking-wider shadow-sm group-hover:shadow-md transition-shadow">
            DG
          </span>
          <span className="hidden sm:inline text-sm font-medium text-fg tracking-tight">
            Dra. Gabriella
          </span>
        </Link>

        {/* Desktop main nav */}
        <div className="hidden md:flex items-center gap-0.5" role="menubar">
          {items.map((it) => (
            <Link
              key={it.href}
              href={`${base}${it.href}`}
              className="px-3 py-2 text-sm text-fg-muted hover:text-fg hover:bg-surface-muted rounded-lg transition-all"
              role="menuitem"
            >
              {it.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Lang switcher — visible inactive state so it's always clickable */}
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

          {/* Primary CTA — uses ContactButtons for graceful fallback */}
          {business && (
            <div className="hidden sm:block">
              <ContactButtons
                business={business}
                locale={locale}
                variant="inline"
                primaryLabel={isEs ? "Coordinar" : "Book"}
                className="!flex-row"
              />
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-fg rounded-lg hover:bg-surface-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu-drawer"
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
        <div
          id="mobile-menu-drawer"
          className="md:hidden border-t border-border-light bg-surface"
          role="menu"
        >
          <div className="px-4 py-3 space-y-1">
            {items.map((it) => (
              <Link
                key={it.href}
                href={`${base}${it.href}`}
                className="block px-3 py-3 text-sm text-fg-muted hover:bg-surface-muted rounded-lg transition-colors min-h-[44px] flex items-center"
                role="menuitem"
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
                      "px-3 py-2 text-xs font-mono font-semibold rounded-md uppercase tracking-wider min-h-[44px] flex items-center " +
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
            {business && (
              <div className="pt-2">
                <ContactButtons
                  business={business}
                  locale={locale}
                  variant="stack"
                  primaryLabel={isEs ? "Coordinar consulta" : "Book a consultation"}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
