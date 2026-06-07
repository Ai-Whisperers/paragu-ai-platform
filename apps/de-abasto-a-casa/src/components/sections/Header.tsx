'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import navigationData from '@/content/es.json'

interface NavItem {
  label: string
  href: string
}

const navigation: NavItem[] = navigationData.navigation.navItems ?? [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Calculadora', href: '#calculadora' },
  { label: 'Galería', href: '#galeria' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change (hash click)
  const handleNavClick = () => {
    setMobileOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-surface)]/80 backdrop-blur-md shadow-sm'
          : 'bg-[var(--color-surface)]'
      }`}
    >
      <div className="container-max flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <a
          href="#"
          className="text-[var(--color-mercado)] font-[var(--font-heading)] text-xl md:text-2xl font-bold tracking-tight"
        >
          De Abasto a Casa
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="text-[var(--color-text)] hover:text-[var(--color-mercado)] transition-colors duration-200 text-sm font-medium tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 pb-5 pt-1 bg-[var(--color-surface)] border-t border-[var(--color-surface-alt)]">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="text-[var(--color-text)] hover:text-[var(--color-mercado)] hover:bg-[var(--color-surface-alt)] transition-colors duration-200 rounded-lg px-4 py-3 text-base font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
