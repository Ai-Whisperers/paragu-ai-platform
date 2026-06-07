'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import ScrollReveal from '@/components/animations/scroll-reveal'

interface FAQItem {
  q: string
  a: string
}

interface FAQCategory {
  title: string
  items: FAQItem[]
}

interface FAQCategoriesProps {
  categories: FAQCategory[]
}

export default function FAQCategories({ categories }: FAQCategoriesProps) {
  const [openIndices, setOpenIndices] = useState<
    Record<string, number | null>
  >({})

  const toggle = (catIndex: number, itemIndex: number) => {
    const key = String(catIndex)
    setOpenIndices((prev) => ({
      ...prev,
      [key]: prev[key] === itemIndex ? null : itemIndex,
    }))
  }

  return (
    <section className="bg-surface section-padding">
      <div className="container-page">
        <div className="max-w-3xl mx-auto space-y-12">
          {categories.map((category, catIndex) => (
            <ScrollReveal key={catIndex} delay={catIndex * 80}>
              <div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => {
                    const key = String(catIndex)
                    const isOpen = openIndices[key] === itemIndex
                    return (
                      <div
                        key={itemIndex}
                        className="border border-border rounded-xl overflow-hidden transition-all duration-200"
                      >
                        <button
                          onClick={() => toggle(catIndex, itemIndex)}
                          className={`w-full flex items-center justify-between text-left px-6 py-4 md:py-5 transition-colors ${
                            isOpen
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
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isOpen ? 'max-h-96' : 'max-h-0'
                          }`}
                        >
                          <div className="px-6 pb-5 pt-2 text-muted text-sm leading-relaxed">
                            {item.a}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
