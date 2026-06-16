// Section: HomeFaq — short FAQ accordion for the home page.
// Picks the first 4 items from the first group in faqs.json.

import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react"
import Link from "next/link"

export function HomeFaq({ c, locale }: { c: any; locale: string }) {
  const isEs = locale === "es"
  const groups = c.faqs?.groups || []
  const firstGroup = groups[0]
  const items: any[] = (firstGroup?.items || []).slice(0, 4)
  if (items.length === 0) return null
  const base = `/${locale}`

  return (
    <section className="section bg-[var(--surface)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="eyebrow inline-flex">
            <HelpCircle className="w-3 h-3" />
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl">{isEs ? "Preguntas frecuentes" : "Frequently asked questions"}</h2>
        </div>
        <div className="space-y-3">
          {items.map((it: any, i: number) => (
            <details key={i} className="card group">
              <summary className="cursor-pointer p-5 list-none flex items-center justify-between gap-4">
                <span className="font-medium">{it.q || it.question}</span>
                <ChevronDown className="w-4 h-4 text-[var(--fg-subtle)] group-open:rotate-180 transition-transform flex-shrink-0" />
              </summary>
              <div className="px-5 pb-5 -mt-1">
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed border-t border-[var(--border-light)] pt-3">
                  {it.a || it.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href={`${base}/faq`} className="btn btn-outline">
            {isEs ? "Ver todas las preguntas" : "See all questions"} <MessageCircle className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
