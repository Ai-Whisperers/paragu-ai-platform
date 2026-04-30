// Testimonials Section — 2x2 grid with crisp cards
import { Card, CardContent } from "@ai-whisperers/ui/card"

export interface Testimonial {
  quote: string
  author?: string
  role?: string
  rating?: number
}

export interface TestimonialsSectionProps {
  title: string
  subtitle?: string
  items: Testimonial[]
}

export function TestimonialsSection({ title, subtitle, items }: TestimonialsSectionProps) {
  if (!items?.length) return null

  const cols = items.length >= 4 ? "sm:grid-cols-2" : items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-1"

  return (
    <section className="bg-surface-light py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>

        <div className={`grid gap-6 ${cols}`}>
          {items.map((t, i) => (
            <Card key={i} className="border border-border bg-surface shadow-sm transition-all hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8">
                {t.rating && (
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className={j < t.rating! ? "text-secondary" : "text-muted"}>
                        ★
                      </span>
                    ))}
                  </div>
                )}
                <blockquote className="mb-4 text-base leading-relaxed text-foreground sm:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                {t.author && (
                  <div className="border-t border-border pt-3">
                    <p className="font-medium text-foreground">{t.author}</p>
                    {t.role && <p className="text-sm text-muted-foreground">{t.role}</p>}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
