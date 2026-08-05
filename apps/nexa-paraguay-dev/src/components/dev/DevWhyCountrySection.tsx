'use client'

import React from 'react'
import { SectionComponentProps } from '@ai-whisperers/sections'
import { resolveImage } from '@/lib/resolve-image'
import { EyebrowOrnament, SectionDivider, MOTIFS } from '@/lib/motifs'

/**
 * Dev override of WhyCountrySection — adds Paraguay DNA:
 * - Lapacho cluster as eyebrow ornament above the section title
 * - ñandutí lace divider between header and pillars
 * - Per-pillar watermark glyph (tereré for community, itaipu for tax, parana for growth)
 * - Premium card variant (always-elevated)
 */
export function DevWhyCountrySection({ pageContent, data, images }: SectionComponentProps) {
  const d = data || pageContent || {}
  // Handle both data shapes: d.pillars can be array (raw list) or object with .pillars key
  let pillars: any[] = []
  if (Array.isArray(d.pillars)) pillars = d.pillars
  else if (Array.isArray(d.pillars?.pillars)) pillars = d.pillars.pillars
  else if (Array.isArray(d.items)) pillars = d.items

  const wrapper = !Array.isArray(d.pillars) && d.pillars ? d.pillars : null
  const eyebrow = d.eyebrow || wrapper?.eyebrow
  const title = d.title || wrapper?.title
  const subtitle = d.subtitle || wrapper?.subtitle

  if (!pillars.length) return null

  // Map pillar index → cultural watermark
  const WATERMARKS = [MOTIFS.paranaRiverLine, MOTIFS.jesuitMissionArch, MOTIFS.terereGuaa]

  return (
    <section className="py-20 md:py-28 bg-primary text-white relative overflow-hidden">
      {/* Subtle cobblestone texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${MOTIFS.cobblestonePattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px',
          opacity: 0.05,
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto text-center px-4 relative">
        <EyebrowOrnament className="mb-4" />

        {eyebrow && <p className="text-xs text-accent uppercase tracking-[2px] mb-2">{eyebrow}</p>}
        {title && (
          <h2 className="text-[clamp(1.6rem,3vw,2.5rem)] font-playfair font-bold mb-3 leading-tight max-w-3xl mx-auto">
            {title}
          </h2>
        )}

        <SectionDivider variant="nanduti" opacity={0.5} className="my-6" />

        {subtitle && (
          <p className="text-base opacity-90 max-w-2xl mx-auto leading-relaxed mb-12">{subtitle}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((p: any, i: number) => {
            const img = resolveImage(images, p.imageUrl || p.image)
            // Custom Paraguay icon map for the 3 known pillars
            const ICON_MAP: Record<string, any> = {
              growth: p.icon, // pass through
              tax: p.icon,
              community: p.icon,
            }
            return (
              <div
                key={i}
                className="group relative rounded-xl text-left overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl backdrop-blur-[10px]"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(201,169,110,0.20)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.20)',
                }}
              >
                {/* Per-pillar cultural watermark */}
                <div className="absolute top-3 right-3 w-16 h-16 pointer-events-none" style={{ opacity: 0.25 }}>
                  <img src={WATERMARKS[i % WATERMARKS.length]} alt="" className="w-full h-full" aria-hidden="true" />
                </div>

                {/* Image */}
                {img && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={img}
                      alt={p.title}
                      loading="lazy"
                      width={600}
                      height={375}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  </div>
                )}

                <div className="p-6 relative">
                  <h3 className="font-bold text-accent mb-3 text-xl">{p.title}</h3>
                  <p className="text-sm text-white/90 leading-relaxed mb-4">{p.description}</p>
                  {p.bullets && (
                    <ul className="space-y-2 pt-3 border-t border-accent/15">
                      {p.bullets.map((b: string, j: number) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-white/80">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-accent flex-shrink-0 mt-0.5"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span className="leading-snug">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div
                  className="h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
