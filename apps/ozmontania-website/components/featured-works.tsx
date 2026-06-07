'use client'

import Link from 'next/link'
import es from '@/content/es.json'
import type { SiteContent, ObraItem } from '@/types/content'
import SpotlightCard from '@/components/spotlight-card'
import Reveal from '@/components/reveal'
import { useRef, useState, useEffect } from 'react'

const content = es as unknown as SiteContent
const featured = content.obra.items.filter((item: ObraItem) => item.featured)

export default function FeaturedWorks() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.6
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll)
    checkScroll()
    return () => el.removeEventListener('scroll', checkScroll)
  }, [])

  return (
    <section className="py-12 sm:py-24">
      <div className="container-art">
        <Reveal>
          <div className="flex items-center justify-between mb-6 sm:mb-10 px-4 sm:px-0">
            <div>
              <h2 className="section-title mb-2">{content.obra.title}</h2>
              <p className="section-subtitle mx-auto text-sm sm:text-base">{content.obra.description}</p>
            </div>
            {/* Scroll buttons - desktop only */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="p-2.5 rounded-full border border-zinc-800 text-zinc-500 hover:text-amber-500 hover:border-amber-500/30 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                aria-label="Anterior"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="p-2.5 rounded-full border border-zinc-800 text-zinc-500 hover:text-amber-500 hover:border-amber-500/30 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                aria-label="Siguiente"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>

        {/* Horizontal scroll */}
        <div ref={scrollRef} className="scroll-x px-4 sm:px-0 pb-4">
          {featured.map((item: ObraItem, i: number) => (
            <SpotlightCard key={item.id} as="a" href={`/obra/${item.id}`} className="block">
              <div
                className="relative w-[75vw] sm:w-[45vw] lg:w-[38vw] xl:w-[32vw] aspect-[4/3] rounded-2xl overflow-hidden
                           bg-zinc-900 border border-zinc-800/50 hover:border-amber-500/30 transition-all duration-500 group"
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />

                {/* Category badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-sm text-amber-500 text-[10px] sm:text-xs font-semibold rounded-full border border-zinc-700/50">
                    {item.category} · {item.year}
                  </span>
                </div>

                {/* Hover indicator */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-[3] translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg sm:text-2xl font-serif font-bold text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.location}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-[3] opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        <Reveal variant="up" delay={300}>
          <div className="text-center mt-6 sm:mt-8">
            <Link href="/galeria" className="btn-outline text-sm sm:text-base">
              Ver todas las obras →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
