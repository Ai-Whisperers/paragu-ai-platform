'use client'

import React from 'react'
import { SectionComponentProps } from '@ai-whisperers/sections'
import { MOTIFS } from '@/lib/motifs'

/**
 * Dev override of ComplianceSection — replaces the generic legal
 * disclaimer with a 4-bullet trust strip in the site voice.
 *
 * Pass `trustBullets` (array of {label, description}) in your content.json
 * to enable this. Falls back to a 4-bullet default if not provided.
 */
const DEFAULT_BULLETS = [
  { label: 'Datos protegidos', description: 'Tu información está cifrada y nunca se comparte.' },
  { label: 'Proceso verificado', description: 'Acompañamos cada expediente en persona en Asunción.' },
  { label: 'Trato personal', description: 'Una persona, un caso, un punto de contacto.' },
  { label: '4 idiomas', description: 'Español · Inglés · Neerlandés · Alemán.' },
]

export function DevComplianceSection({ pageContent, data, locale = 'es' }: SectionComponentProps) {
  const c = data || pageContent || {}
  const bullets = c.trustBullets || DEFAULT_BULLETS

  return (
    <section className="py-12 md:py-16 bg-surface-alt border-t border-border/40 relative overflow-hidden">
      {/* Subtle lenga pattern at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2 pointer-events-none"
        style={{
          backgroundImage: `url(${MOTIFS.lengaEmbroideredPattern})`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 8px',
          opacity: 0.3,
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bullets.map((b: any, i: number) => (
            <div key={i} className="flex items-start gap-3 text-left">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-primary text-sm">{b.label}</div>
                <div className="text-xs text-text-muted leading-relaxed mt-0.5">{b.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
