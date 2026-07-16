"use client"
// Testimonials with visible placeholder note + 2-3 only (not 8 inflated)
// Shows clear "sample" badge on each card so users know these are not real reviews.

import { Star, Info } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  location?: string
  text: string
  rating: number
  service?: string
  initials: string
  fear_named?: string
  relief_named?: string
}

export function TestimonialsHonest({ items }: { items: Testimonial[] }) {
  if (!items || items.length === 0) return null
  
  // Limit to top 3, sorted by rating desc
  const top = [...items].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3)

  return (
    <section aria-labelledby="testimonials-heading" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-medium mb-3">
            Lo que dicen mis pacientes
          </h2>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-fg-muted bg-accent-soft rounded-full px-3 py-1.5">
            <Info className="w-3.5 h-3.5" />
            Testimonios de muestra · Las reseñas reales se publicarán tras apertura
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {top.map((t) => (
            <article key={t.id} className="card p-6 relative">
              <div className="absolute top-3 right-3">
                <div className="flex gap-0.5" aria-label={`${t.rating} estrellas`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" aria-hidden="true" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center text-white font-medium">
                  {t.initials}
                </div>
                <div>
                  <div className="font-medium">{t.name}</div>
                  {t.location && (
                    <div className="text-xs text-fg-muted">{t.location}</div>
                  )}
                </div>
              </div>
              <blockquote className="text-sm leading-relaxed text-fg-muted mb-4">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              {t.service && (
                <div className="text-xs text-fg-subtle border-t border-border-light pt-3 mt-auto">
                  <span className="font-medium">Servicio:</span> {t.service}
                </div>
              )}
            </article>
          ))}
        </div>
        <div className="mt-8 text-center text-sm text-fg-muted">
          ¿Fuiste paciente? <a href={`https://g.page/r/dra-gaby/review`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Dejanos tu reseña en Google</a>.
        </div>
      </div>
    </section>
  )
}
