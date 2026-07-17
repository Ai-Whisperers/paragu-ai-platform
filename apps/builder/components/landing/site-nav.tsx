'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X as XIcon, Wand2, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { waLink } from '@/lib/landing/marketing-data'

const NAV_LINKS = [
  { href: '/casos', label: 'Casos' },
  { href: '/previews', label: 'Previews' },
  { href: '/p', label: 'Plantillas' },
  { href: '/precios', label: 'Precios' },
  { href: '/sobre-nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/demo', label: 'Demo' },
] as const

/**
 * Site-wide top navigation. Used on every marketing page (landing,
 * /p/[rubro], /casos, /precios, /comparacion, /demo, /seguridad, /blog).
 * On the landing page itself we keep the in-page anchor nav inside page.tsx
 * — this nav is for sub-pages where anchored sections do not exist.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const demoMessage = 'Hola, quiero una demo gratis de ParaguAI para mi negocio.'

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-brand-300/30 bg-deep/95 backdrop-blur-xl shadow-sm'
            : 'bg-deep/70 backdrop-blur-sm'
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-[var(--primary-foreground)] transition-transform group-hover:scale-110">
                <Wand2 size={20} />
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">Paragu</span>
                <span className="text-accent">AI</span>
              </span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="hidden text-sm font-medium text-white/70 hover:text-accent md:block"
              >
                Acceso clientes
              </Link>
              <a
                href={waLink(demoMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-[var(--primary-foreground)] transition-all hover:opacity-90 hover:shadow-lg md:inline-flex md:items-center md:gap-2"
              >
                <MessageCircle size={16} />
                Pedir demo
              </a>
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Abrir menú"
                className="rounded-lg p-2 text-white md:hidden"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-deep/95 md:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-[var(--primary-foreground)]">
                <Wand2 size={20} />
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">Paragu</span>
                <span className="text-accent">AI</span>
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Cerrar menú"
              className="rounded-lg p-2 text-white"
            >
              <XIcon size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-2 p-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-4 text-lg font-medium text-white hover:bg-deep/70"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={waLink(demoMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-center text-lg font-semibold text-[var(--primary-foreground)]"
            >
              <MessageCircle size={18} />
              Pedir demo por WhatsApp
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl border border-brand-300/30 px-4 py-3 text-center text-sm font-medium text-white/70"
            >
              Acceso clientes
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
