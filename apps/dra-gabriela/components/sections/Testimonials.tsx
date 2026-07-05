// Section: Testimonials — anti-anxiety testimonials.
// Each card NAMED the fear first (the patient's actual anxiety), then the experience,
// then the relief outcome. Uses the .testimonial-fear utility from globals.css
// (gold side-rule, large soft quote glyph).

import { Quote, Star } from "lucide-react"

export function Testimonials({ c, locale }: { c: any; locale: string }) {
  const items: any[] = c.testimonials?.items || []
  // Only show testimonials that are real (verified AND not flagged as placeholder)
  const real = items.filter((t) => t.verified === true && t.placeholder !== true)
  if (real.length === 0) return null
  const display = real.slice(0, 3)
  const isEs = locale === "es"
  return (
    <section className="section tone-ocean-4" aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow">{isEs ? "Historias reales" : "Real patient stories"}</span>
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl lg:text-5xl">
            {isEs ? "El miedo tiene nombre. Y también la salida." : "The fear has a name. So does the way out."}
          </h2>
          <p className="text-fg-muted text-base md:text-lg mt-4">
            {isEs
              ? "Estos son miedos reales de pacientes reales. Si el tuyo se parece, no estás solo/a. Y hay un camino."
              : "These are real fears from real patients. If yours sounds familiar, you're not alone. There's a path through."}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {display.map((t: any, i: number) => (
            <article
              key={t.id || i}
              className="testimonial-fear flex flex-col"
              aria-labelledby={`t-name-${t.id || i}`}
            >
              {/* Quote glyph (decorative, large, gold) — provided by .testimonial-fear::before */}

              {/* Named fear — anti-anxiety core (Insight 7) */}
              {t.fear_named && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-accent-2 bg-gold-soft px-2 py-1 rounded-full">
                    <span aria-hidden="true">●</span>
                    {isEs ? "Su miedo" : "Their fear"}
                  </span>
                  <p className="text-sm font-semibold text-fg mt-2 leading-snug">
                    {t.fear_named}
                  </p>
                </div>
              )}

              {/* Experience / quote */}
              <div className="relative flex-1 mb-5">
                <Quote className="w-5 h-5 text-gold mb-2 opacity-70" aria-hidden="true" />
                <p className="text-fg leading-relaxed text-[15px]">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Footer: identity + relief */}
              <div className="border-t border-border-light pt-4 mt-auto">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div id={`t-name-${t.id || i}`} className="font-semibold text-sm text-fg">
                      {t.name}
                    </div>
                    {t.location && (
                      <div className="text-xs text-fg-subtle">{t.location}</div>
                    )}
                    {t.service && (
                      <div className="text-xs text-fg-muted mt-0.5">{t.service}</div>
                    )}
                  </div>
                  {t.stars && (
                    <div
                      className="flex items-center gap-0.5 flex-shrink-0"
                      role="img"
                      aria-label={`${t.stars} ${t.stars === 1 ? "star" : "stars"}`}
                    >
                      {Array.from({ length: t.stars }).map((_, k) => (
                        <Star key={k} className="w-3.5 h-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                  )}
                </div>

                {t.relief_named && (
                  <div className="rounded-md bg-accent-soft px-3 py-2 -mx-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent block">
                      {isEs ? "Lo que cambió" : "What changed"}
                    </span>
                    <span className="text-xs font-semibold text-accent-2 leading-snug block mt-0.5">
                      {t.relief_named}
                    </span>
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