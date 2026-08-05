'use client'

import React from 'react'
import { SectionComponentProps } from '@ai-whisperers/sections'
import { MOTIFS, CobblestoneTexture } from '@/lib/motifs'

/**
 * Dev override of CtaBanner — adds:
 * - Cobblestone background texture
 * - Testimonial pull-quote (if provided) above the CTA
 * - Premium gradient CTA button (1.5x)
 * - Lapacho cluster decoration
 */
export function DevCtaBanner({ pageContent, data, images, locale = 'es' }: SectionComponentProps) {
  const c = data || pageContent || {}
  const title = c.title || c.headline
  const subtitle = c.subtitle || c.subheadline
  const buttonText = c.buttonText || c.ctaText
  const buttonHref = c.buttonHref || c.ctaHref
  const pullQuote = c.pullQuote
  const pullQuoteAttribution = c.pullQuoteAttribution
  const eyebrow = c.eyebrow

  if (!title && !buttonText) return null

  return (
    <section className="py-20 md:py-28 bg-primary text-white relative overflow-hidden">
      <CobblestoneTexture opacity={0.07} />

      {/* Subtle lapacho watermark */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none" style={{ opacity: 0.4 }}>
        <img src={MOTIFS.lapachoFlowerCluster} alt="" className="h-6 w-auto" aria-hidden="true" />
      </div>

      <div className="max-w-3xl mx-auto text-center px-4 relative z-10">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[3px] text-accent mb-3 font-semibold">{eyebrow}</p>
        )}

        {/* Pull quote (optional) */}
        {pullQuote && (
          <blockquote
            className="font-playfair italic text-xl md:text-2xl text-accent/90 mb-8 leading-relaxed"
            style={{ borderLeft: '3px solid #C9A96E', paddingLeft: '1.5rem' }}
          >
            "{pullQuote}"
            {pullQuoteAttribution && (
              <footer className="text-sm not-italic text-white/60 mt-2">— {pullQuoteAttribution}</footer>
            )}
          </blockquote>
        )}

        {title && (
          <h3 className="font-playfair text-2xl md:text-4xl font-bold mb-3 leading-tight">{title}</h3>
        )}

        {subtitle && (
          <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed mb-8">{subtitle}</p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
          {buttonText && buttonHref && (
            <a
              href={(() => {
                if (buttonHref.startsWith('http') || buttonHref.startsWith('mailto:') || buttonHref.startsWith('tel:'))
                  return buttonHref
                const path = buttonHref.startsWith('/') ? buttonHref : `/${buttonHref}`
                const parts = path.split('/').filter(Boolean)
                if (parts.length > 0 && ['es', 'en', 'nl', 'de'].includes(parts[0])) return path
                return `/${locale}${path}`
              })()}
              className="px-12 py-5 rounded-full font-bold text-lg shadow-2xl transition-all duration-200 hover:scale-105 no-underline"
              style={{
                background: 'linear-gradient(135deg, #D4B97A 0%, #C9A96E 50%, #B8964E 100%)',
                color: '#1B2A4A',
                boxShadow: '0 12px 32px rgba(201,169,110,0.3)',
              }}
            >
              {buttonText} <span>→</span>
            </a>
          )}
          {c.secondaryCtaText && c.secondaryCtaHref && (
            <a
              href={c.secondaryCtaHref}
              className="px-8 py-4 border-2 border-white/60 text-white rounded-full font-semibold text-base hover:bg-white/10 hover:border-white transition-all duration-200 no-underline"
            >
              {c.secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
