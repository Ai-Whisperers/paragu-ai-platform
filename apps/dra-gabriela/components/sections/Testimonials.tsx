// Section: Testimonials — real patient quotes
// Quote cards with gold accent. Empty data = hidden section.

import { Quote, Star } from "lucide-react"

export function Testimonials({ c, locale }: { c: any; locale: string }) {
  const items: any[] = c.testimonials?.items || []
  if (items.length === 0) return null
  const display = items.slice(0, 3)
  const isEs = locale === "es"
  return (
    <section className="section bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="eyebrow">{isEs ? "Testimonios" : "Patient stories"}</span>
          <h2>{c.testimonials?.title || (isEs ? "Lo que dicen los pacientes" : "What patients say")}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {display.map((t: any, i: number) => (
            <article key={t.id || i} className="card-accent card p-6 flex flex-col">
              <Quote className="w-7 h-7 text-[var(--gold)] mb-4" />
              <p className="text-[var(--fg-muted)] leading-relaxed flex-1 mb-6">
                "{t.text || t.quote}"
              </p>
              <div className="border-t border-[var(--border-light)] pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{t.name || t.author}</div>
                    {t.service && <div className="text-xs text-[var(--fg-subtle)]">{t.service}</div>}
                  </div>
                  {t.stars && (
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: t.stars }).map((_, k) => (
                        <Star key={k} className="w-3.5 h-3.5 fill-[var(--gold)] text-[var(--gold)]" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
