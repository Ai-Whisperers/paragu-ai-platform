'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import ScrollReveal from '@/components/animations/scroll-reveal'

interface FAQItem {
  q: string
  a: string
}

interface FAQSectionProps {
  title: string
  subtitle: string
  items: FAQItem[]
}

export default function FAQSection({
  title,
  subtitle,
  items,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-surface section-padding">
      <div className="container-page">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 50}>
              <div className="border border-border rounded-xl overflow-hidden transition-all duration-200">
                <button
                  onClick={() => toggle(i)}
                  className={`w-full flex items-center justify-between text-left px-6 py-4 md:py-5 transition-colors ${
                    openIndex === i
                      ? 'bg-accent/5 text-foreground'
                      : 'bg-surface-alt hover:bg-surface-alt/80 text-foreground'
                  }`}
                >
                  <span className="font-accent font-medium text-sm md:text-base pr-4">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-accent transition-transform duration-300 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === i ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-2 text-muted text-sm leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
