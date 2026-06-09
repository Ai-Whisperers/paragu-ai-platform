'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { clsx } from 'clsx'

export interface FAQItem {
  q: string
  a: string
  isRich?: boolean
}

interface FAQProps {
  items: FAQItem[]
  title: string
}

export function FAQ({ items, title }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="px-6 py-16 max-w-3xl mx-auto w-full" aria-labelledby="faq-title">
      <h2 id="faq-title" className="text-2xl md:text-3xl font-black mb-8 bg-gradient-to-br from-pink-500 to-violet-600 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => {
          const isOpen = open === i
          return (
            <Card
              key={i}
              variant="default"
              padding="none"
              className={clsx('overflow-hidden transition-all', isOpen ? 'border-border-strong' : 'border-border')}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
              >
                <span className="text-sm font-semibold text-foreground">{item.q}</span>
                <span
                  className="text-pink-500 text-lg font-light flex-shrink-0 transition-transform"
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                  aria-hidden
                >
                  +
                </span>
              </button>
              {isOpen ? (
                <div id={`faq-${i}`} className="px-4 pb-4 text-sm text-foreground-muted leading-relaxed">
                  {item.isRich ? (
                    <p>
                      {item.a.split('/unirse')[0]}
                      <Link href="/es/unirse" className="text-pink-600 underline hover:text-pink-700">
                        /unirse
                      </Link>
                      {item.a.split('/unirse')[1] ?? ''}
                    </p>
                  ) : (
                    <p>{item.a}</p>
                  )}
                </div>
              ) : null}
            </Card>
          )
        })}
      </div>
    </section>
  )
}
