'use client'

import { useState, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import content from '@/content/es.json'

interface FAQItem {
  q: string
  a: string
}

const defaultItems: FAQItem[] = [
  { q: '¿Qué incluye el servicio?', a: 'Incluye compras, prep y entrega.' },
  { q: '¿Cómo son las entregas?', a: 'Martes y jueves, puerta a puerta.' },
]

export default function FAQ() {
  const items: FAQItem[] = content.home.faq?.items ?? defaultItems
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = useCallback((idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }, [])

  return (
    <section id="faq" className="section-padding bg-[var(--color-surface-alt)]">
      <div className="container-max">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
            {content.home.faq.title}
          </h2>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx

            return (
              <div
                key={idx}
                className="bg-[var(--color-surface)] border border-[var(--color-crema-dark)] rounded-xl overflow-hidden transition-shadow duration-200 hover:shadow-sm"
              >
                {/* Question button */}
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left font-[var(--font-body)] text-sm md:text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)]/50 transition-colors duration-200"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--color-text-muted)] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 md:px-6 md:pb-6 font-[var(--font-body)] text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-crema-dark)] pt-4">
                    {item.a}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
