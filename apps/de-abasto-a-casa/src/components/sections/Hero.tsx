'use client'

import { ArrowDown } from 'lucide-react'
import content from '@/content/es.json'

interface HeroProps {
  headline?: string
  subheadline?: string
  ctaPrimary?: string
  ctaSecondary?: string
  ctaSecondaryHref?: string
  ctaPrimaryHref?: string
}

export default function Hero({
  headline = content.home.hero.headline,
  subheadline = content.home.hero.subheadline,
  ctaPrimary = content.home.hero.ctaPrimary,
  ctaSecondary = content.home.hero.ctaSecondary,
  ctaSecondaryHref = content.home.hero.ctaSecondaryHref,
  ctaPrimaryHref = content.home.hero.ctaPrimaryHref,
}: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Green gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #3a6b4a 0%, #2a5036 100%)',
        }}
      />

      {/* Decorative leaf / pattern pseudo-element */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 85% 20%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(circle at 15% 80%, rgba(255,255,255,0.04) 0%, transparent 50%)',
        }}
      />

      {/* Subtle organic overlay pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,0.1) 20px,
              rgba(255,255,255,0.1) 21px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,0.08) 20px,
              rgba(255,255,255,0.08) 21px
            )
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-max px-4 py-20 md:py-28 w-full">
        <div className="max-w-3xl mx-auto md:mx-0 text-center md:text-left">
          {/* Headline */}
          <h1 className="text-[var(--font-heading)] font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="font-[var(--font-body)] text-lg sm:text-xl md:text-2xl text-[var(--color-crema)]/90 leading-relaxed mb-10 max-w-2xl">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Primary CTA — scroll to calculator */}
            <a
              href={ctaPrimaryHref}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white text-white font-[var(--font-body)] font-semibold text-base hover:bg-white/10 transition-all duration-300 group"
            >
              {ctaPrimary}
              <ArrowDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
            </a>

            {/* Secondary CTA — WhatsApp */}
            <a
              href={ctaSecondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-crema)] text-[var(--color-mercado-dark)] font-[var(--font-body)] font-semibold text-base hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--color-surface)] to-transparent pointer-events-none" />
    </section>
  )
}
