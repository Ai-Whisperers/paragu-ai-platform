'use client'

import Reveal from '@/components/reveal'
import es from '@/content/es.json'
import type { SiteContent, TestimonioItem } from '@/types/content'

const content = es as unknown as SiteContent
const section = content.testimonios
const items = section.items as TestimonioItem[]

export default function Testimonials() {
  if (!items.length) return null

  return (
    <section className="py-16 sm:py-24 border-t border-zinc-800/50">
      <div className="container-art">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="section-title mb-4">{section.title}</h2>
            <p className="section-subtitle mx-auto text-sm sm:text-base">{section.description}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4 sm:px-0">
          {items.map((item: TestimonioItem, i: number) => (
            <Reveal key={i} variant="up" delay={i * 150}>
              <div className="glass-panel p-5 sm:p-7 h-full flex flex-col hover:border-amber-500/20 transition-colors duration-500">
                {/* Quote icon */}
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500/30 mb-3 sm:mb-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10H0z"/>
                </svg>

                {/* Text */}
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-grow italic">
                  &ldquo;{item.text}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t border-zinc-800/50 pt-3 sm:pt-4">
                  <p className="text-sm sm:text-base font-semibold text-zinc-100">{item.author}</p>
                  <p className="text-[10px] sm:text-xs text-amber-500">{item.role}</p>
                  <p className="text-[10px] sm:text-xs text-zinc-500">{item.project}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
