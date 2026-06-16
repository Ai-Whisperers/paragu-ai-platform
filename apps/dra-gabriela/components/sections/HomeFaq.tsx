// Section: HomeFaq — 2-column FAQ for the home page.
// Left column: heading + intro. Right column: accordion.
// Fixes the "centered text" agoraphobia by giving the FAQ proper structure.

import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react"
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
          {/* Left column: heading + intro */}
          <div className="lg:sticky lg:top-24">
            <span className="eyebrow inline-flex">
              <HelpCircle className="w-3 h-3" />
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl mb-4 text-left">
              {isEs ? "Preguntas frecuentes" : "Frequently asked questions"}
            </h2>
            <p className="text-[var(--fg-muted)] leading-relaxed mb-6 text-left">
              {isEs
                ? "Las preguntas que más recibimos. Si no encontrás la tuya, escribime por WhatsApp y respondo en menos de 24 horas."
                : "The questions we get most. If yours isn't here, message me on WhatsApp and I'll respond within 24 hours."}
            </p>
            <Link
              href={`${base}/faq`}
              className="btn btn-outline inline-flex"
            >
              {isEs ? "Ver todas las preguntas" : "See all questions"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right column: accordion */}
          <div className="space-y-3">
            {items.map((it: any, i: number) => (
              <details key={i} className="card group hover:shadow-md transition-shadow">
                <summary className="cursor-pointer p-5 list-none flex items-center justify-between gap-4">
                  <span className="font-medium text-left">{it.q || it.question}</span>
                  <ChevronDown className="w-4 h-4 text-[var(--fg-subtle)] group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 pb-5 -mt-1">
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed border-t border-[var(--border-light)] pt-3 text-left">
                    {it.a || it.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
