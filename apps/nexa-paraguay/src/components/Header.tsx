'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { trackCtaClick, trackLanguageSwitch } from '@/lib/ga4'

interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

const LOCALE_FLAGS: Record<string, { label: string; flag: string }> = {
  nl: { label: 'NL', flag: '/images/flags/nl.svg' },
  es: { label: 'ES', flag: '/images/flags/es.svg' },
  en: { label: 'EN', flag: '/images/flags/en.svg' },
  de: { label: 'DE', flag: '/images/flags/de.svg' },
}

const LOCALES = ['es', 'en', 'nl', 'de']

export function Header({ navigation, locale }: { navigation: any; locale?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navItems: NavItem[] = navigation?.navItems || []
  const pathname = usePathname()
  const router = useRouter()
  const pathLocale = pathname?.split('/').filter(Boolean)?.[0]
  const currentLocale = (locale && LOCALES.includes(locale))
    ? locale
    : (pathLocale && LOCALES.includes(pathLocale) ? pathLocale : 'es')

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false)
    setLangOpen(false)
  }, [pathname])

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setLangOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Shadow on scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function switchLocale(newLocale: string) {
    const parts = pathname.split('/').filter(Boolean)
    let cleanPath = '/'
    if (parts.length > 0 && LOCALES.includes(parts[0])) {
      cleanPath = '/' + parts.slice(1).join('/') || '/'
    }
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    const newPath = '/' + newLocale + cleanPath + hash
    trackLanguageSwitch(currentLocale, newLocale)
    router.push(newPath)
  }

  function resolveHref(href: string) {
    let h = href || '#'
    h = h.replace(/^\/s\/[^/]+\/[^/]+/, '')
    if (!h.startsWith('http') && !h.startsWith('/' + currentLocale)) {
      h = '/' + currentLocale + h
    }
    return h
  }

  return (
    <header style={{
      background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.05)',
      boxShadow: scrolled ? '0 4px 16px rgba(0,0,0,0.06)' : '0 1px 3px rgba(0,0,0,0.04)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'box-shadow 0.2s, border-color 0.2s, background 0.2s',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        {/* LEFT: hamburger + lang switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1 1 0' }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: menuOpen ? '#1B2A4A' : 'transparent',
              color: menuOpen ? '#fff' : '#1B2A4A',
              border: '1px solid ' + (menuOpen ? '#1B2A4A' : 'rgba(27,42,74,0.15)'),
              borderRadius: '8px',
              padding: '0.5rem 0.875rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.15s',
              fontFamily: 'inherit',
            }}
          >
            {menuOpen ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span>Cerrar</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <span>Menú</span>
              </>
            )}
          </button>
        </div>

        {/* CENTER: large centered logo */}
        <Link
          href={`/${currentLocale}`}
          aria-label="Nexa Paraguay - Home"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <img
            src="/images/brand/logo.webp"
            alt="Nexa Paraguay"
            width={480}
            height={140}
            style={{ height: '96px', width: 'auto', display: 'block' }}
          />
        </Link>

        {/* RIGHT: language switcher + CTA button */}
        <div style={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.6rem' }}>
          {/* Language switcher (moved from left) */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { setLangOpen(!langOpen); setMenuOpen(false); }}
              aria-label="Switch language"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: langOpen ? '#F5F5F0' : '#fff',
                border: '1px solid rgba(27,42,74,0.15)',
                borderRadius: '8px',
                padding: '0.5rem 0.75rem',
                cursor: 'pointer',
                fontSize: '0.85rem',
                color: '#1B2A4A',
                fontWeight: 600,
                fontFamily: 'inherit',
              }}
            >
              {LOCALE_FLAGS[currentLocale] && (
                <img src={LOCALE_FLAGS[currentLocale].flag} alt={currentLocale} width={18} height={12} style={{ width: '18px', height: '12px', borderRadius: '2px', objectFit: 'cover' }} />
              )}
              <span>{LOCALE_FLAGS[currentLocale]?.label || currentLocale.toUpperCase()}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {langOpen && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.4rem', background: '#fff', border: '1px solid rgba(27,42,74,0.15)', borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 200, minWidth: '140px', overflow: 'hidden' }}>
                {Object.entries(LOCALE_FLAGS).map(([code, { label, flag }]) => (
                  <button
                    key={code}
                    onClick={() => { setLangOpen(false); switchLocale(code); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.625rem 0.875rem',
                      textAlign: 'left',
                      background: code === currentLocale ? '#F5F5F0' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      color: '#1B2A4A',
                      fontWeight: code === currentLocale ? 700 : 500,
                      fontFamily: 'inherit',
                    }}
                  >
                    <img src={flag} alt={code} width={18} height={12} style={{ width: '18px', height: '12px', borderRadius: '2px', objectFit: 'cover' }} />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DROPDOWN MENU */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              top: '110px',
              background: 'rgba(27,42,74,0.4)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              zIndex: 98,
            }}
          />
          {/* Menu panel */}
          <nav
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#fff',
              boxShadow: '0 20px 60px rgba(27,42,74,0.18)',
              zIndex: 99,
              padding: '2rem 1.25rem 3rem',
              maxHeight: 'calc(100vh - 110px)',
              overflowY: 'auto',
            }}
            aria-label="Main navigation"
          >
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {/* Main nav items */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.5rem' }}>
                {navItems.map((item, i) => {
                  const href = resolveHref(item.href || '#')
                  const isActive = pathname === href || pathname === href + '/'
                  const hasChildren = !!item.children && item.children.length > 0

                  if (hasChildren) {
                    return (
                      <li key={i}>
                        <div
                          style={{
                            padding: '1.25rem 1.5rem',
                            background: '#F5F5F0',
                            borderRadius: '12px',
                            border: '1px solid rgba(27,42,74,0.06)',
                          }}
                        >
                          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#C9A96E', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                            {item.label}
                          </div>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.5rem' }}>
                            <li>
                              <a
                                href={href}
                                style={{
                                  display: 'block',
                                  padding: '0.625rem 0.875rem',
                                  color: '#1B2A4A',
                                  fontWeight: 600,
                                  fontSize: '0.95rem',
                                  textDecoration: 'none',
                                  borderRadius: '8px',
                                  background: '#fff',
                                  border: '1px solid rgba(27,42,74,0.1)',
                                }}
                              >
                                {item.label} →
                              </a>
                            </li>
                            {item.children?.map((child: any, j: number) => (
                              <li key={j}>
                                <a
                                  href={resolveHref(child.href || '#')}
                                  style={{
                                    display: 'block',
                                    padding: '0.625rem 0.875rem',
                                    color: '#1B2A4A',
                                    fontWeight: 500,
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    borderRadius: '8px',
                                    background: '#fff',
                                    border: '1px solid rgba(27,42,74,0.1)',
                                  }}
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    )
                  }

                  return (
                    <li key={i}>
                      <a
                        href={href}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '1.25rem 1.5rem',
                          background: isActive ? '#1B2A4A' : '#F5F5F0',
                          color: isActive ? '#fff' : '#1B2A4A',
                          borderRadius: '12px',
                          fontWeight: 600,
                          fontSize: '1rem',
                          textDecoration: 'none',
                          border: '1px solid ' + (isActive ? '#1B2A4A' : 'rgba(27,42,74,0.06)'),
                          transition: 'all 0.15s',
                        }}
                      >
                        <span>{item.label}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </a>
                    </li>
                  )
                })}
              </ul>

              {/* Bottom CTA section */}
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#C9A96E', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  ¿Listo para empezar?
                </div>
                <div style={{ color: '#fff', fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>
                  {navigation?.ctaText || 'Agendar consulta'}
                </div>
                <a
                  href={resolveHref(navigation?.ctaHref || '/contacto')}
                  onClick={() => { setMenuOpen(false); trackCtaClick('header_menu_cta', 'header_menu'); }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: '#C9A96E',
                    color: '#1B2A4A',
                    borderRadius: '50px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                  }}
                >
                  {navigation?.ctaText || 'Agendar consulta'}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
