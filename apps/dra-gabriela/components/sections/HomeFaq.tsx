// Section: HomeFaq — anxiety-targeted FAQ. Source: content/{en,es}/home-faq.json.
// 5 hand-curated items, accordion layout (native <details>, no JS).
// The legacy c.faqs.groups[0] path is kept as a silent fallback so older
// locales never go blank if home-faq.json is missing.

import { ChevronDown, HelpCircle, ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"

export function HomeFaq({ c, locale }: { c: any; locale: string }) {
  const isEs = locale === "es"
  const hf = c.homeFaq

  // Primary: dedicated home-faq.json (5 anti-anxiety items).
  // Fallback: legacy c.faqs.groups[0].items[0:5] so nothing breaks.
  const items: any[] =
    (hf?.items && hf.items.length > 0
      ? hf.items
      : (c.faqs?.groups?.[0]?.items || []).slice(0, 5)) || []

  if (items.length === 0) return null

  const base = `/${locale}`
  const title = hf?.title ?? (isEs
    ? "Las preguntas que te da vergüenza hacer."
    : "The questions you're embarrassed to ask.")
  const lead = hf?.lead ?? (isEs
    ? "Las preguntas que más recibimos. Si no encontrás la tuya, escribime por WhatsApp y respondo en menos de 24 horas."
    : "The questions we get most. If yours isn't here, message me on WhatsApp and I'll respond within 24 hours.")
  const ctaLinkText = hf?.cta_link_text ?? (isEs ? "Ver todas las preguntas" : "See all questions")
  const ctaText = hf?.cta_text ?? (isEs
    ? "Estas son las preguntas que más escucho. Si la tuya no está, escribime."
    : "These are the questions I hear most often. If yours isn't here, message me.")

  return (
    <section className="section bg-surface">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-20 items-start">
          {/* Left column: heading + intro */}
          <div className="lg:sticky lg:top-24">
            <span className="eyebrow inline-flex">
              <HelpCircle className="w-3 h-3" />
              {isEs ? "Ansiedad y comodidad" : "Anxiety and comfort"}
            </span>
            <h2 className="text-4xl md:text-5xl mb-5 text-left leading-tight">{title}</h2>
            <p className="text-fg-muted text-lg leading-relaxed mb-6 text-left">{lead}</p>
            <p className="text-fg-muted text-base leading-relaxed mb-6 text-left italic">
              {ctaText}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href={`${base}/faq`}
                className="btn btn-outline inline-flex justify-center sm:justify-start"
              >
                {ctaLinkText}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`${base}/contact`}
                className="text-sm text-accent hover:text-accent-2 inline-flex items-center gap-2"
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
                className="group bg-surface border-2 border-border rounded-xl overflow-hidden hover:border-accent hover:shadow-lg focus-within:border-accent focus-within:shadow-lg focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 transition-all duration-200"
              >
                <summary className="cursor-pointer p-5 md:p-6 list-none flex items-start justify-between gap-4 hover:bg-surface-muted focus-visible:bg-surface-muted transition-colors">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center text-accent font-medium text-sm"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="font-medium text-lg md:text-xl pt-1 text-left">
                      {it.q || it.question}
                    </span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-fg-subtle group-open:rotate-180 transition-transform flex-shrink-0 mt-2" />
                </summary>
                <div className="px-5 md:px-6 pb-5 md:pb-6 pl-16 md:pl-[5.5rem]">
                  <p className="text-fg-muted leading-relaxed border-t border-border-light pt-4 text-left">
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
