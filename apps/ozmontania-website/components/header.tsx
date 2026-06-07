'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import es from '@/content/es.json'

const navItems = [
  { href: '/', label: es.nav.obra },
  { href: '/galeria', label: 'Galería' },
  { href: '/murales', label: es.nav.murales },
  { href: '/biografia', label: es.nav.biografia },
  { href: '/prensa', label: es.nav.prensa },
  { href: '/blog', label: es.nav.blog },
  { href: '/tienda', label: es.nav.tienda },
  { href: '/contacto', label: es.nav.contacto },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close drawer with Escape
  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [mobileOpen])

  // Lock scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const close = () => setMobileOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/50 py-3'
            : 'bg-transparent py-4 md:py-5'
        }`}
      >
        <div className="container-art flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={close} className="flex items-center gap-2 group">
            <span className="text-lg md:text-xl font-bold tracking-tight font-serif">
              Oz<span className="text-amber-500"> Montanía</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-zinc-400 hover:text-amber-400 transition-colors rounded-lg hover:bg-zinc-800/50"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contacto" className="ml-4 btn-primary text-sm py-2 px-5">
              {es.nav.contacto}
            </Link>
          </nav>

          {/* Mobile hamburger — animated SVG */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center p-2 text-zinc-300 hover:text-amber-400 transition-colors"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200" style={{ transform: mobileOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={close}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-zinc-950 border-l border-zinc-800 shadow-2xl transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-4">
            <span className="font-serif font-bold text-zinc-100">Menú</span>
            <button onClick={close} className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors" aria-label="Cerrar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-3 py-4" aria-label="Navegación móvil">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={close}
                className="rounded-lg px-4 py-3 text-base text-zinc-400 hover:text-amber-400 transition-colors hover:bg-zinc-800/50">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-zinc-800 px-3 pt-4">
            <Link href="/contacto" onClick={close}
              className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 font-semibold text-zinc-950 transition-all hover:bg-amber-400 active:scale-[0.98]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M9.5 13.5c.5 1 1.5 1.5 2.5 1.5s2-.5 2.5-1.5"/></svg>
              {es.nav.contacto}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
