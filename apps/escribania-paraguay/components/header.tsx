'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, MessageCircle } from 'lucide-react'
import content from '@/content/es.json'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const nav = content.navigation

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        {/* Logo / Brand */}
        <Link
          href="/"
          className={`text-xl md:text-2xl font-heading font-semibold tracking-tight transition-colors ${
            scrolled ? 'text-foreground' : 'text-white'
          }`}
        >
          {nav.businessName}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-accent font-medium transition-colors hover:text-accent ${
                scrolled ? 'text-foreground/80' : 'text-white/80'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={nav.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-accent font-semibold text-sm px-5 py-2.5 rounded-lg transition-all"
          >
            <MessageCircle size={16} />
            {nav.ctaText}
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-foreground' : 'text-white'
          }`}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-16 bg-primary z-40 transition-all duration-300 md:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-6 pt-12 pb-8 px-6">
          {nav.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/90 hover:text-accent font-accent text-lg font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={nav.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-accent font-semibold px-6 py-3 rounded-lg transition-all"
          >
            <MessageCircle size={18} />
            {nav.ctaText}
          </a>
        </nav>
      </div>
    </header>
  )
}
