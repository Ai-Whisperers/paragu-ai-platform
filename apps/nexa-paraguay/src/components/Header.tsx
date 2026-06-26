'use client'

import React, { useState } from 'react'
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
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const navItems: NavItem[] = navigation?.navItems || []
  const pathname = usePathname()
  const router = useRouter()
  const pathLocale = pathname?.split('/').filter(Boolean)?.[0]
  const currentLocale = (locale && LOCALES.includes(locale))
    ? locale
    : (pathLocale && LOCALES.includes(pathLocale) ? pathLocale : 'es')

  function switchLocale(newLocale: string) {
    // Get current path without locale prefix
    const parts = pathname.split('/').filter(Boolean)
    let cleanPath = '/'
    if (parts.length > 0 && LOCALES.includes(parts[0])) {
      cleanPath = '/' + parts.slice(1).join('/') || '/'
    }
    // Preserve hash fragment for anchor links (e.g. /servicios#residency-legal)
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    const newPath = '/' + newLocale + cleanPath + hash
    trackLanguageSwitch(currentLocale, newLocale)
    router.push(newPath)
  }

  return (
    <header style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href={`/${currentLocale}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/images/brand/logo.svg" alt="Nexa Paraguay" width={200} height={56} style={{ height: '36px', width: 'auto' }} />
        </Link>
        <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', padding: '0.25rem', color: '#1B2A4A' }}>
          {open ? '✕' : '☰'}
        </button>
        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map((item, i) => {
            let href = item.href || '#'
            href = href.replace(/^\/s\/[^/]+\/[^/]+/, '')
            if (!href.startsWith('http') && !href.startsWith('/' + currentLocale)) {
              href = '/' + currentLocale + href
            }
            const isActive = pathname === href || pathname === href + '/' || (item.children && item.children.some((c: any) => pathname === c.href))
            const hasChildren = !!item.children

            if (hasChildren) {
              return (
                <div
                  key={i}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <a
                    href={href}
                    className="text-[0.9rem] font-medium transition-colors py-2 inline-flex items-center gap-1.5"
                    style={{
                      color: isActive ? '#C9A96E' : '#333',
                      borderBottom: '1px dashed #ccc',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </a>
                  {servicesOpen && (
                    <div
                      className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-border/40 py-2 min-w-[280px] z-50"
                      style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                    >
                      {item.children.map((child: any, j: number) => {
                        let childHref = child.href || '#'
                        childHref = childHref.replace(/^\/s\/[^/]+\/[^/]+/, '')
                        if (!childHref.startsWith('http') && !childHref.startsWith('/' + currentLocale)) {
                          childHref = '/' + currentLocale + childHref
                        }
                        return (
                          <a
                            key={j}
                            href={childHref}
                            className="block px-4 py-2.5 text-sm text-text hover:bg-surface-alt hover:text-accent transition-colors no-underline"
                          >
                            {child.label}
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <a
                key={i}
                href={href}
                className="text-[0.9rem] font-medium transition-colors py-2"
                style={{
                  color: isActive ? '#C9A96E' : '#333',
                  borderBottom: isActive ? '2px solid #C9A96E' : '2px solid transparent',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </a>
            )
          })}
          {/* Language Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              style={{ background: '#F5F5F0', border: '1px solid #ddd', borderRadius: '6px', padding: '0.3rem 0.6rem', cursor: 'pointer', fontSize: '0.85rem', color: '#333', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              aria-label="Switch language"
            >
              {LOCALE_FLAGS[currentLocale] ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <img src={LOCALE_FLAGS[currentLocale].flag} alt={currentLocale} width={18} height={12} style={{ width: '18px', height: '12px', borderRadius: '2px', objectFit: 'cover' }} />
                  {LOCALE_FLAGS[currentLocale].label}
                </span>
              ) : '🌐 NL'}
              <span style={{ fontSize: '0.7rem' }}>{langOpen ? '▲' : '▼'}</span>
            </button>
            {langOpen && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.3rem', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 200, minWidth: '100px' }}>
                {Object.entries(LOCALE_FLAGS).map(([code, { label, flag }]) => (
                  <button
                    key={code}
                    onClick={() => { setLangOpen(false); switchLocale(code); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', width: '100%', padding: '0.5rem 0.75rem', textAlign: 'left', background: code === currentLocale ? '#F5F5F0' : 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: '#333', fontWeight: code === currentLocale ? 700 : 400 }}
                  >
                    <img src={flag} alt={code} width={18} height={12} style={{ width: '18px', height: '12px', borderRadius: '2px', objectFit: 'cover' }} />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {navigation?.ctaText && <a href={(() => { let h = navigation.ctaHref || '#'; h = h.replace(/^\/s\/[^/]+\/[^/]+/, ''); if (!h.startsWith('http') && !h.startsWith('/' + currentLocale)) h = '/' + currentLocale + h; return h; })()} onClick={() => trackCtaClick(navigation?.ctaText || 'header_cta', 'header')} style={{ padding: '0.5rem 1.25rem', background: '#C9A96E', color: '#1B2A4A', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem' }}>{navigation.ctaText}</a>}
        </nav>
      </div>
      {open && <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 99 }} />}
      <style jsx>{`
        @media (max-width: 768px) {
          button { display: block !important; }
          nav { display: ${open ? 'flex' : 'none'} !important; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: #fff; padding: 1.5rem; box-shadow: 0 8px 30px rgba(0,0,0,0.12); z-index: 100; gap: 0.75rem; }
          nav a { padding: 0.5rem 0 !important; }
        }
      `}</style>
    </header>
  )
}
