// Section: HomeFaq — 2-col layout with left intro and right accordion.
// Each FAQ is a large clickable card with proper padding.

import { ChevronDown, HelpCircle, ArrowRight, MessageCircle } from "lucide-react"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-20 items-start">
          {/* Left column: heading + intro */}
          <div className="lg:sticky lg:top-24">
            <span className="eyebrow inline-flex">
              <HelpCircle className="w-3 h-3" />
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl mb-5 text-left leading-tight">
              {isEs ? "Preguntas frecuentes" : "Frequently asked questions"}
            </h2>
            <p className="text-[var(--fg-muted)] text-lg leading-relaxed mb-6 text-left">
              {isEs
                ? "Las preguntas que más recibimos. Si no encontrás la tuya, escribime por WhatsApp y respondo en menos de 24 horas."
                : "The questions we get most. If yours isn't here, message me on WhatsApp and I'll respond within 24 hours."}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href={`${base}/faq`}
                className="btn btn-outline inline-flex justify-center sm:justify-start"
              >
                {isEs ? "Ver todas las preguntas" : "See all questions"}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`${base}/contact`}
                className="text-sm text-[var(--accent)] hover:text-[var(--accent-2)] inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {isEs ? "O escribime directo" : "Or message me directly"}
              </Link>
            </div>
          </div>

          {/* Right column: accordion with big cards */}
          <div className="space-y-3">
            {items.map((it: any, i: number) => (
              <details
                key={i}
                className="group bg-[var(--surface)] border-2 border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--accent)] hover:shadow-lg transition-all duration-200"
              >
                <summary className="cursor-pointer p-5 md:p-6 list-none flex items-start justify-between gap-4 hover:bg-[var(--surface-muted)] transition-colors">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] font-medium text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="font-medium text-lg md:text-xl pt-1 text-left">{it.q || it.question}</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-[var(--fg-subtle)] group-open:rotate-180 transition-transform flex-shrink-0 mt-2" />
                </summary>
                <div className="px-5 md:px-6 pb-5 md:pb-6 pl-16 md:pl-[5.5rem]">
                  <p className="text-[var(--fg-muted)] leading-relaxed border-t border-[var(--border-light)] pt-4 text-left">
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
