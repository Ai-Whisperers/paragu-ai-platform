'use client'

import React from 'react'
import { SectionComponentProps } from '@ai-whisperers/sections'
import { resolveImage } from '@/lib/resolve-image'
import { MOTIFS, EyebrowOrnament, HeroSkylineOverlay, CobblestoneTexture, SectionDivider } from '@/lib/motifs'

/**
 * Dev override of HeroSection — adds:
 * - Cobblestone texture overlay on the dark background
 * - Asunción skyline line at the bottom of the hero
 * - Lapacho flower cluster as eyebrow ornament
 * - Trust badges row (3 inline mini-badges)
 * - Premium gradient CTA button (1.5x)
 * - Scroll-indicator chevron
 */
export function DevHeroSection({ pageContent, images }: SectionComponentProps) {
  const c = pageContent.hero || pageContent || {}
  const bgImage = resolveImage(images, c.backgroundImage)

  return (
    <section
      className="px-4 text-center relative flex flex-col items-center justify-center overflow-hidden"
      style={
        bgImage
          ? {
              padding: '5rem 1rem 6rem',
              minHeight: 'clamp(420px, 60vh, 640px)',
              background: `linear-gradient(135deg, rgba(27,42,74,0.88) 0%, rgba(27,42,74,0.7) 100%), url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {
              padding: '5rem 1rem 6rem',
              minHeight: 'clamp(420px, 60vh, 640px)',
              background: 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)',
            }
      }
    >
      {/* Cobblestone texture overlay */}
      <CobblestoneTexture opacity={0.07} />

      {/* Asunción skyline line at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ opacity: 0.12 }}>
        <img src={MOTIFS.asuncionSkylineLine} alt="" className="w-full h-auto" aria-hidden="true" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-white">
        {/* Lapacho cluster as eyebrow ornament */}
        <div className="mb-4">
          <img src={MOTIFS.lapachoFlowerCluster} alt="" className="h-6 md:h-8 mx-auto w-auto" aria-hidden="true" />
        </div>

        {c.eyebrow && (
          <p className="text-xs md:text-sm uppercase tracking-[3px] font-semibold text-accent mb-3">
            {c.eyebrow}
          </p>
        )}

        <h1 className="text-[clamp(2rem_4.5vw_3.2rem)] font-playfair font-bold leading-tight mb-4">
          {c.headline}
        </h1>

        <div className="w-[80px] h-[3px] bg-accent mx-auto mb-6" />

        <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-[680px] mx-auto mb-8">
          {c.subheadline}
        </p>

        <div className="flex gap-4 justify-center flex-wrap mb-8">
          {c.ctaPrimaryText && (
            <a
              href={c.ctaPrimaryHref}
              className="px-10 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-200 hover:scale-105 no-underline"
              style={{
                background: 'linear-gradient(135deg, #D4B97A 0%, #C9A96E 50%, #B8964E 100%)',
                color: '#1B2A4A',
                boxShadow: '0 8px 24px rgba(201,169,110,0.25)',
              }}
            >
              {c.ctaPrimaryText}
            </a>
          )}
          {c.ctaSecondaryText && (
            <a
              href={c.ctaSecondaryHref}
              className="px-8 py-4 border-2 border-white/60 text-white rounded-full font-semibold text-base hover:bg-white/10 hover:border-white transition-all duration-200 no-underline"
            >
              {c.ctaSecondaryText}
            </a>
          )}
        </div>

        {/* Trust strip */}
        {c.trustBadges && (
          <div className="flex gap-3 justify-center flex-wrap">
            {c.trustBadges.map((b: string, i: number) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full text-sm text-champagne border border-champagne/40 backdrop-blur-sm"
                style={{ background: 'rgba(201,169,110,0.12)' }}
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator chevron */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce" style={{ animationDuration: '2.5s' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
