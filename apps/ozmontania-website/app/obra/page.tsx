'use client'

import Link from 'next/link'
import es from '@/content/es.json'
import type { SiteContent, ObraItem } from '@/types/content'
import { useState } from 'react'
import SpotlightCard from '@/components/spotlight-card'
import Reveal from '@/components/reveal'

const content = es as unknown as SiteContent
const categories = content.obra.categories
const items = content.obra.items as ObraItem[]

export default function ObraPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? items
    : items.filter((item: ObraItem) => item.category === activeCategory)

  return (
    <>
      <section className="pt-24 sm:pt-32 pb-8 sm:pb-12">
        <div className="container-art">
          <Reveal>
            <div className="text-center mb-6 sm:mb-10 px-4 sm:px-0">
              <h1 className="section-title mb-4">{content.obra.title}</h1>
              <p className="section-subtitle mx-auto text-sm sm:text-base">{content.obra.description}</p>
            </div>
          </Reveal>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 px-4 sm:px-0 mb-8 sm:mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-black'
                    : 'bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-0">
            {filtered.map((item: ObraItem, i: number) => {
              // Vary aspect ratios for masonry feel
              const heights = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-square', 'aspect-[3/2]']
              const aspect = heights[i % heights.length]
              return (
                <Reveal key={item.id} variant="up" delay={(i % 8) * 80}>
                  <SpotlightCard as="a" href={`/obra/${item.id}`} className="block h-full">
                    <div
                      className={`relative ${aspect} rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/40
                                 hover:border-amber-500/30 transition-all duration-500 group cursor-pointer h-full`}
                    >
                      {/* Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />

                      {/* Category badge */}
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-black/60 backdrop-blur-sm text-amber-500 text-[9px] sm:text-xs font-semibold rounded-full">
                          {item.category}
                        </span>
                      </div>

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-[3] translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xs sm:text-base font-serif font-semibold text-white leading-tight">{item.title}</h3>
                        <p className="text-[9px] sm:text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-0.5 sm:mt-1">
                          {item.location} · {item.year}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-[3] opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-zinc-500 py-12">No hay obras en esta categoría.</p>
          )}
        </div>
      </section>
    </>
  )
}
