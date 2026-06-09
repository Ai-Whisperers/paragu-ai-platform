'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getNav, type Lang } from '@/lib/content'
import { Button } from '@/components/ui/Button'

interface NavbarProps {
  lang: Lang
  currentPath?: string
}

export function Navbar({ lang }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const nav = getNav(lang)

  return (
    <header
      className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center" aria-label="Inicio — Cuidado Amiga">
          <span className="text-xl font-black tracking-tight bg-gradient-to-br from-rose-700 to-violet-600 bg-clip-text text-transparent">
            cuidadoamiga
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
          {nav.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground-muted hover:text-foreground px-3 py-1.5 rounded-md transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link href={nav.primaryCta.href} className="ml-2">
            <Button variant="primary" size="sm">{nav.primaryCta.label}</Button>
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-lg"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          <span
            className="block w-5 h-0.5 bg-foreground rounded-sm transition-transform"
            style={{ transform: open ? 'translateY(4px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block w-5 h-0.5 bg-foreground rounded-sm transition-opacity"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block w-5 h-0.5 bg-foreground rounded-sm transition-transform"
            style={{ transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open ? (
        <nav
          className="md:hidden absolute top-14 inset-x-0 bg-surface border-b border-border shadow-md flex flex-col"
          aria-label="Navegación móvil"
        >
          {nav.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-6 py-4 text-sm font-medium border-b border-border"
            >
              {item.label}
            </Link>
          ))}
          <div className="px-6 py-4">
            <Link href={nav.primaryCta.href} onClick={() => setOpen(false)}>
              <Button variant="primary" size="md" fullWidth>{nav.primaryCta.label}</Button>
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
