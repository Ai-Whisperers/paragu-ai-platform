'use client'

import es from '@/content/es.json'
import { useState } from 'react'
import type { SiteContent, TimelineEvent } from '@/types/content'
import Reveal from '@/components/reveal'

const content = es as unknown as SiteContent
const timeline = content.biografia.timeline as TimelineEvent[]

export default function BiografiaPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <>
      {/* Intro */}
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-16">
        <div className="container-art">
          <div className="max-w-3xl mx-auto px-4 sm:px-0">
            <Reveal>
              <h1 className="section-title mb-6 sm:mb-8">{content.biografia.title}</h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed mb-10 sm:mb-12">
                {content.biografia.intro}
              </p>
            </Reveal>
            {/* Quote */}
            <Reveal variant="scale" delay={300}>
              <div className="glass-panel p-5 sm:p-8 mb-12 sm:mb-16 border-l-4 border-l-amber-500">
                <p className="text-base sm:text-xl md:text-2xl font-serif italic text-zinc-200 leading-relaxed">
                  &ldquo;{content.biografia.quote}&rdquo;
                </p>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-zinc-500">— {content.biografia.quote_author}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pb-16 sm:pb-24">
        <div className="container-art">
          <div className="max-w-3xl mx-auto relative px-4 sm:px-0">
            {/* Central line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/30 via-zinc-800 to-zinc-800 transform md:-translate-x-px" />

            {timeline.map((item: TimelineEvent, i: number) => (
              <Reveal key={i} variant={i % 2 === 0 ? 'left' : 'right'} delay={i * 80}>
                <div className={`relative flex items-start gap-4 sm:gap-6 mb-10 sm:mb-16 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Dot */}
                  <div className={`absolute left-4 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-amber-500 rounded-full transform -translate-x-1/2 z-10 mt-1.5 border-2 border-zinc-950 ${
                    expandedIndex === i ? 'ring-2 ring-amber-500/30' : ''
                  } transition-all duration-300`} />

                  {/* Content */}
                  <div className={`ml-10 sm:ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="text-amber-500 font-mono text-xs sm:text-sm md:text-base font-bold">{item.year}</span>
                    <h3 className="text-base sm:text-xl md:text-2xl font-serif font-bold mt-1 mb-2 text-zinc-100">
                      {item.event}
                    </h3>
                    <button onClick={() => setExpandedIndex(expandedIndex === i ? null : i)} className="text-left md:text-right w-full">
                      <p className={`text-zinc-400 text-xs sm:text-sm leading-relaxed transition-all duration-300 ${
                        expandedIndex === i ? '' : 'line-clamp-2'
                      }`}>
                        {item.detail}
                      </p>
                      <span className="text-amber-500 text-[10px] sm:text-xs mt-1 inline-flex items-center gap-1 hover:underline">
                        {expandedIndex === i ? (
                          <>Leer menos <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"/></svg></>
                        ) : (
                          <>Leer más <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg></>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Influences + Philosophy */}
      <section className="pb-16 sm:pb-24">
        <div className="container-art">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto px-4 sm:px-0">
            <Reveal variant="left">
              <div className="glass-panel p-5 sm:p-8 h-full hover:border-amber-500/20 transition-colors duration-500">
                <h3 className="text-base sm:text-lg font-serif font-bold mb-4 text-amber-500">
                  {content.biografia.section_influencias.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {content.biografia.section_influencias.text}
                </p>
              </div>
            </Reveal>
            <Reveal variant="right">
              <div className="glass-panel p-5 sm:p-8 h-full hover:border-amber-500/20 transition-colors duration-500">
                <h3 className="text-base sm:text-lg font-serif font-bold mb-4 text-amber-500">
                  {content.biografia.section_filosofia.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {content.biografia.section_filosofia.text}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
