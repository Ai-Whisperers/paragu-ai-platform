'use client'

import { useState } from 'react'
import { useLocale } from '@/lib/locale-context'
import { BusinessFAQ } from './BusinessFAQ'
import { LanguageDropdown } from './LanguageDropdown'

const WHATSAPP = 'https://wa.me/595981000000' // placeholder — update with real number

export function BusinessLanding() {
  const { t, locale, reset } = useLocale()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: '#what-is-gv', label: 'Industry' },
    { href: '#services', label: 'Services' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact-biz', label: 'Contact' },
  ]

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <nav className="fixed top-0 w-full glass-panel z-40 px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="gradient-gold font-bold text-sm md:text-lg">Golden Visa Advisory</span>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors rounded-md hover:bg-surface-hover">
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageDropdown />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-muted hover:text-foreground">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary !py-1.5 !px-3 md:!px-4 text-xs whitespace-nowrap">
            {t.business.hero.cta}
          </a>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed top-[57px] left-0 right-0 z-30 glass-panel border-t border-border md:hidden">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className="block px-6 py-4 text-sm font-medium text-muted hover:text-foreground hover:bg-surface-hover transition-colors border-b border-border/50">
              {l.label}
            </a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,169,81,0.08)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <p className="text-xs md:text-sm font-semibold text-primary uppercase tracking-widest mb-4">
            {locale === 'en' ? "PARAGUAY'S #1 GOLDEN VISA MARKET-BUILDING FIRM" : ''}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="gradient-gold">{t.business.hero.title}</span>
          </h1>
          <p className="text-base md:text-lg text-muted max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed px-2">
            {t.business.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary text-base md:text-lg">
              {t.business.hero.cta}
            </a>
            <a href="#what-is-gv" className="btn-outline text-base md:text-lg">
              {locale === 'en' ? 'Explore the Industry' : 'Explore la Industria'}
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="py-16 md:py-24 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="section-title gradient-gold">
            {locale === 'en' ? 'About Us' : 'Sobre Nosotros'}
          </h2>
          <p className="section-subtitle">
            {locale === 'en'
              ? 'We bridge Paraguayan businesses with global investment capital through Golden Visa-qualified product structuring.'
              : 'Conectamos empresas paraguayas con capital de inversión global a través de estructuración de productos calificados para Golden Visa.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              { initial: 'R', name: 'Raúl Fretes', role: 'Founder & Managing Director', desc: '8+ years in cross-border investment structuring, regulatory advisory, and market positioning for Paraguayan assets.' },
              { initial: 'L', name: 'Legal Team', role: 'Paraguayan Corporate & Immigration Law', desc: 'Deep expertise in SUACE, Investor Pass, and temporary residency regulatory frameworks.' },
              { initial: 'G', name: 'Global Partners', role: 'International Agent Network', desc: 'Verified network of immigration agents and wealth managers across 15+ countries.' },
            ].map((m, i) => (
              <div key={i} className="glass-panel rounded-xl p-6 text-left">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-secondary font-bold text-lg mb-4">
                  {m.initial}
                </div>
                <h3 className="font-semibold text-sm md:text-lg mb-1">{m.name}</h3>
                <p className="text-primary text-xs md:text-sm mb-3">{m.role}</p>
                <p className="text-muted text-xs md:text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS GV */}
      <section id="what-is-gv" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="section-title gradient-gold text-2xl md:text-4xl">{t.business.whatIsGV.title}</h2>
          <p className="text-muted text-center max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed text-sm md:text-base">
            {t.business.whatIsGV.description}
          </p>
          {t.business.whatIsGV.stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {t.business.whatIsGV.stats.map((s, i) => (
                <div key={i} className="glass-panel rounded-xl p-4 md:p-6 text-center">
                  <div className="text-xl md:text-3xl font-bold gradient-gold mb-1 md:mb-2">{s.value}</div>
                  <div className="text-xs text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-16 md:py-24 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="section-title gradient-gold text-2xl md:text-4xl">{t.business.services.title}</h2>
          <p className="section-subtitle">{t.business.services.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-10">
            {t.business.services.items.map((s, i) => (
              <div key={i} className="glass-panel rounded-xl p-4 md:p-6">
                <span className="text-2xl md:text-3xl block mb-3 md:mb-4">{s.icon}</span>
                <h3 className="font-semibold text-sm md:text-lg mb-1 md:mb-2">{s.title}</h3>
                <p className="text-muted text-xs md:text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAIN OF TRUST */}
      {t.business.chainOfTrust && (
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="section-title gradient-gold text-2xl md:text-4xl">{t.business.chainOfTrust.title}</h2>
            <p className="section-subtitle">{t.business.chainOfTrust.subtitle}</p>
            <div className="relative mt-8 md:mt-10">
              <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent" />
              <div className="space-y-6 md:space-y-8">
                {t.business.chainOfTrust.links.map((link, i) => (
                  <div key={i} className="relative pl-0 md:pl-14">
                    <div className="hidden md:flex absolute left-4 top-1 w-5 h-5 rounded-full bg-primary items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                    </div>
                    <div className="glass-panel rounded-xl p-4">
                      <h3 className="font-semibold text-sm md:text-base">{link.title}</h3>
                      <p className="text-muted text-xs md:text-sm mt-1">{link.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* INVESTOR PROFILES */}
      {t.business.investorProfiles && (
        <section className="py-16 md:py-24 gradient-bg">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="section-title gradient-gold text-2xl md:text-4xl">{t.business.investorProfiles.title}</h2>
            <p className="section-subtitle">{t.business.investorProfiles.subtitle}</p>
            <div className="overflow-x-auto mt-8 md:mt-10 -mx-4 md:mx-0 px-4 md:px-0">
              <div className="min-w-[500px]">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 md:py-4 pr-3 md:pr-4 text-xs md:text-sm font-medium text-muted">Profile</th>
                      <th className="py-3 md:py-4 px-2 md:px-3 text-xs md:text-sm font-medium text-muted">Needs</th>
                      <th className="py-3 md:py-4 px-2 md:px-3 text-xs md:text-sm font-medium text-muted">Key Regions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.business.investorProfiles.items.map((item, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                        <td className="py-3 md:py-4 pr-3 md:pr-4 font-semibold text-xs md:text-sm">{item.type}</td>
                        <td className="py-3 md:py-4 px-2 md:px-3 text-xs md:text-sm text-muted">{item.needs}</td>
                        <td className="py-3 md:py-4 px-2 md:px-3 text-xs md:text-sm text-muted">{item.regions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24">
        <BusinessFAQ />
      </section>

      {/* CTA */}
      <section id="contact-biz" className="py-16 md:py-24 gradient-bg">
        <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
          <h2 className="section-title gradient-gold text-2xl md:text-4xl">{t.business.cta.title}</h2>
          <p className="section-subtitle">{t.business.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary text-base md:text-lg">
              {t.business.cta.cta}
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-outline text-base md:text-lg">WhatsApp</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-6 md:py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="gradient-gold font-bold">Golden Visa Advisory</span>
          <div className="flex items-center gap-3">
            <LanguageDropdown />
            <button onClick={reset} className="text-xs text-muted hover:text-foreground transition-colors">
              {locale === 'en' ? 'Back to start' : 'Volver al inicio'}
            </button>
          </div>
          <span className="text-muted text-xs md:text-sm">© 2026 — Paraguai</span>
        </div>
      </footer>
    </div>
  )
}
