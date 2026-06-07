'use client'

import { useState } from 'react'
import { useLocale } from '@/lib/locale-context'
import { ComparisonTable } from './ComparisonTable'
import { SuccessStory } from './SuccessStory'
import { LanguageDropdown } from './LanguageDropdown'

const WHATSAPP = 'https://wa.me/595981000000' // placeholder

export function InvestorLanding() {
  const { t, locale, reset } = useLocale()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#process', label: 'Process' },
    { href: '#programs', label: 'Programs' },
    { href: '#contact', label: 'Contact' },
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
            {t.investor.hero.cta}
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
            {locale === 'en' ? 'THE ORIGINAL PARAGUAYAN GOLDEN VISA — SINCE 2025' : 
             locale === 'es' ? 'LA GOLDEN VISA PARAGUAYA ORIGINAL — DESDE 2025' : ''}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-3 md:mb-4 leading-tight">
            <span className="gradient-gold">{t.investor.hero.title}</span>
          </h1>
          <p className="text-xl md:text-3xl font-light text-foreground mb-4">
            {t.investor.hero.subtitle}
          </p>
          <p className="text-base md:text-lg text-muted max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
            {t.investor.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary text-base md:text-lg">
              {t.investor.hero.cta}
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-outline text-base md:text-lg">
              {locale === 'en' ? 'Speak with an Expert' : 'Hable con un Experto'}
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT / TEAM */}
      <section id="about" className="py-16 md:py-24 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="section-title gradient-gold text-2xl md:text-4xl">{t.investor.team.title}</h2>
          <p className="section-subtitle">{t.investor.team.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-10">
            {[
              { initial: 'R', name: 'Raúl Fretes', role: locale === 'en' ? 'Founder & Managing Director' : 'Fundador & Director Gerente', desc: locale === 'en' ? '8+ years structuring cross-border investments between Latin America and global markets.' : '8+ años estructurando inversiones transfronterizas entre Latinoamérica y mercados globales.' },
              { initial: 'A', name: locale === 'en' ? 'Advisory Team' : 'Equipo Asesor', role: locale === 'en' ? 'Legal & Regulatory' : 'Legal & Regulatorio', desc: locale === 'en' ? 'Experienced in Paraguayan corporate law, immigration regulation, and international compliance.' : 'Experiencia en derecho corporativo paraguayo, regulación migratoria y compliance internacional.' },
              { initial: 'P', name: locale === 'en' ? 'Partners Network' : 'Red de Partners', role: locale === 'en' ? 'Global Agents & Local Firms' : 'Agentes Globales & Firmas Locales', desc: locale === 'en' ? 'Verified network of immigration agents, law firms, and wealth managers across 15+ countries.' : 'Red verificada de agentes de inmigración, estudios jurídicos y wealth managers en 15+ países.' },
            ].map((m, i) => (
              <div key={i} className="glass-panel rounded-xl p-4 md:p-6 text-left">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-secondary font-bold text-base md:text-lg mb-3 md:mb-4">
                  {m.initial}
                </div>
                <h3 className="font-semibold text-sm md:text-lg mb-1">{m.name}</h3>
                <p className="text-primary text-xs md:text-sm mb-2 md:mb-3">{m.role}</p>
                <p className="text-muted text-xs md:text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACK RECORD */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="section-title gradient-gold text-2xl md:text-4xl">{t.investor.trackRecord.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-10">
            {[
              { value: t.investor.trackRecord.projectsValue, label: t.investor.trackRecord.projects },
              { value: t.investor.trackRecord.capitalValue, label: t.investor.trackRecord.capital },
              { value: t.investor.trackRecord.nationalitiesValue, label: t.investor.trackRecord.nationalities },
              { value: t.investor.trackRecord.yearsValue, label: t.investor.trackRecord.years },
            ].map((s, i) => (
              <div key={i} className="glass-panel rounded-xl p-4 md:p-6">
                <div className="text-2xl md:text-4xl font-bold gradient-gold mb-1 md:mb-2">{s.value}</div>
                <div className="text-xs md:text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {t.investor.testimonials?.items && (
        <section className="py-16 md:py-24 gradient-bg">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="section-title gradient-gold text-2xl md:text-4xl">{t.investor.testimonials.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-10">
              {t.investor.testimonials.items.map((item, i) => (
                <div key={i} className="glass-panel rounded-xl p-4 md:p-6">
                  <p className="text-foreground/80 italic leading-relaxed mb-3 md:mb-4 text-sm md:text-base">&quot;{item.quote}&quot;</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xl md:text-2xl">{item.flag}</span>
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-muted text-xs">{item.country}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS */}
      <section id="process" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="section-title gradient-gold text-2xl md:text-4xl">{t.investor.process.title}</h2>
          <p className="section-subtitle">{t.investor.process.subtitle}</p>
          <div className="space-y-4 md:space-y-6 mt-8 md:mt-10">
            {t.investor.process.steps.map((step, i) => (
              <div key={i} className="glass-panel rounded-xl p-4 md:p-6 flex gap-4 md:gap-6 items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-secondary font-bold text-base md:text-lg shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-lg mb-1">{step.title}</h3>
                  <p className="text-muted text-xs md:text-base leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section id="programs" className="py-16 md:py-24 gradient-bg">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <ComparisonTable />
        </div>
      </section>

      {/* SUCCESS STORY */}
      <SuccessStory />

      {/* CTA */}
      <section id="contact" className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
          <h2 className="section-title gradient-gold text-2xl md:text-4xl">{t.investor.cta.title}</h2>
          <p className="section-subtitle">{t.investor.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary text-base md:text-lg">
              {t.investor.cta.cta}
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-outline text-base md:text-lg">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-6 md:py-8 px-4 md:px-6 gradient-bg">
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
