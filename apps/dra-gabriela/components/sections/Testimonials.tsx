// Section: Testimonials
// Curated quotes from real patients. If the JSON has zero items (Dra. GP
// hasn't delivered any yet), the section is hidden — no empty header, no
// "no reviews yet" copy, just gone. Per Kiki's brand rules we will only ever
// ship real testimonials with consent.

import { Quote, Star } from "lucide-react"

export function Testimonials({ c, locale }: { c: any; locale: string }) {
  const items: any[] = c.testimonials?.items || []
  if (items.length === 0) return null
  const display = items.slice(0, 3)
  return (
    <section className="section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="eyebrow">{locale === "es" ? "Testimonios" : "Patient stories"}</span>
          <h2 className="text-3xl md:text-4xl">
            {c.testimonials?.title || (locale === "es" ? "Lo que dicen los pacientes" : "What patients say")}
          </h2>
        </div>
        <div className="space-y-4">
          {display.map((t: any, i: number) => (
            <article key={t.id || i} className="card p-6 md:p-7">
              <Quote className="w-6 h-6 text-[var(--gold)] mb-3" />
              <p className="text-base md:text-lg leading-relaxed text-[var(--fg)] mb-4">"{t.text || t.quote}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">{t.name || t.author}</div>
                  {t.service && <div className="text-xs text-[var(--fg-muted)]">{t.service}</div>}
                </div>
                {t.stars && (
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: t.stars }).map((_, k) => (
                      <Star key={k} className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
