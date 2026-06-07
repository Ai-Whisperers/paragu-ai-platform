'use client'

import Link from 'next/link'
import es from '@/content/es.json'
import type { SiteContent, ObraItem } from '@/types/content'
import ArtCard from '@/components/art-card'
import Reveal from '@/components/reveal'
import SpotlightCard from '@/components/spotlight-card'
import { useState } from 'react'

const content = es as unknown as SiteContent
const allArt = content.obra.items as ObraItem[]

// Sort by year descending, then alphabetically
const sorted = [...allArt].sort((a, b) => {
  const aYear = typeof a.year === 'number' ? a.year : parseInt(String(a.year))
  const bYear = typeof b.year === 'number' ? b.year : parseInt(String(b.year))
  if (bYear !== aYear) return bYear - aYear
  return a.title.localeCompare(b.title)
})

// Group by decade for visual impact
const decades: { label: string; works: ObraItem[] }[] = []
const decadeMap = new Map<string, ObraItem[]>()
for (const piece of sorted) {
  const year = typeof piece.year === 'number' ? piece.year : parseInt(String(piece.year))
  const decade = isNaN(year) ? '2020s' : `${Math.floor(year / 10) * 10}s`
  if (!decadeMap.has(decade)) decadeMap.set(decade, [])
  decadeMap.get(decade)!.push(piece)
}
const decadeOrder = ['2020s', '2010s', '2000s']
for (const label of decadeOrder) {
  if (decadeMap.has(label)) {
    decades.push({ label, works: decadeMap.get(label)! })
  }
}

export default function GaleriaPage() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null)

  return (
    <>
      {/* Full-bleed gallery */}
      <section className="pt-24 sm:pt-32 pb-8 sm:pb-12">
        <div className="container-art">
          <Reveal>
            <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
              <h1 className="section-title mb-4">Todas las obras</h1>
              <p className="section-subtitle mx-auto text-sm sm:text-base">
                Toda la obra de Oz Montanía — murales, ilustraciones, lienzos y proyectos comerciales. {sorted.length} piezas en exhibición.
              </p>
            </div>
          </Reveal>

          {/* Full artwork grid */}
          <div className="px-4 sm:px-0">
            {/* Per-decade grouping */}
            {decades.map((decade, di) => (
              <div key={decade.label} className="mb-12 sm:mb-16 last:mb-0">
                <Reveal variant="up">
                  <div className="section-heading-line mb-6 sm:mb-8">
                    <h2 className="text-sm sm:text-base font-mono text-amber-500 font-semibold tracking-widest uppercase">
                      {decade.label}
                    </h2>
                  </div>
                </Reveal>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                  {decade.works.map((piece, i) => {
                    // Vary heights for visual rhythm
                    const heights = ['aspect-[4/3]', 'aspect-square', 'aspect-[3/4]', 'aspect-[3/2]', 'aspect-[4/3]']
                    const aspectClass = heights[(di + i) % heights.length]

                    return (
                      <Reveal key={piece.id} variant="up" delay={(i % 12) * 60}>
                        <Link href={`/obra/${piece.id}`} className={`block ${aspectClass} relative`}>
                          <ArtCard piece={piece} priority={i < 4} />
                        </Link>
                      </Reveal>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="pb-16 sm:pb-24">
        <div className="container-art">
          <div className="border-t border-zinc-800/30 pt-8 sm:pt-10 px-4 sm:px-0">
            <Reveal>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-2xl mx-auto text-center">
                <div>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-amber-500">{sorted.length}</div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">Obras</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-amber-500">
                    {new Set(sorted.map(p => p.category)).size}
                  </div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">Categorías</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-amber-500">
                    {new Set(sorted.map(p => p.location)).size}
                  </div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">Ubicaciones</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-amber-500">20+</div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">Años</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

function useScrollProgress() {
  return (index: number, total: number) => {
    // noop for now — just passing the interface
  }
}
