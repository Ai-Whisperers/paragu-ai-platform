// /en/reviews + /es/resenas — patient reviews with star rating,
// service tag, date, and verified badge. JSON-LD AggregateRating.

import { notFound } from "next/navigation"
import { Star, BadgeCheck, Quote, Filter } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import en from "@/content/en/reviews.json"
import es from "@/content/es/reviews.json"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = CONTENT[locale as keyof typeof CONTENT]
  const isEs = locale === "es"
  return buildMetadata({
    slug: "reviews",
    title: isEs ? "Reseñas de pacientes" : "Patient reviews",
    description: isEs
      ? "Reseñas reales de pacientes de la práctica dental de la Dra. Gabriella González Pane en Asunción."
      : "Real patient reviews of Dra. Gabriella González Pane's dental practice in Asunción.",
    locale: isEs ? "es" : "en",
  })
}

function formatDate(date: string, locale: string): string {
  try {
    return new Date(date).toLocaleDateString(locale === "es" ? "es-PY" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return date
  }
}

function Stars({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-gold-2 text-gold-2" : "text-fg-subtle/30"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const isEs = locale === "es"
  const items: any[] = c.items || []
  const avg = items.length ? (items.reduce((s, r) => s + r.rating, 0) / items.length).toFixed(1) : "5.0"
  const verifiedCount = items.filter(r => r.verified).length

  // Service breakdown
  const byService: Record<string, number> = {}
  for (const r of items) {
    byService[r.service] = (byService[r.service] || 0) + 1
  }

  // JSON-LD AggregateRating
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Dra. Gabriella González Pane",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg,
      reviewCount: items.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: items.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
        worstRating: "1",
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/(?<!\\u00)@/g, "\\u0040") }} />

      <PageHero
        eyebrow={isEs ? "Reseñas" : "Reviews"}
        title={c.title}
        subtitle={c.subtitle}
        variant="default"
        align="center"
      />

      {/* Summary stats */}
      <PageSection layout="wide" py="md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="card p-5 text-center">
            <div className="text-4xl md:text-5xl font-medium text-accent leading-none mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              {avg}
            </div>
            <div className="text-xs text-fg-subtle uppercase tracking-wider font-semibold">
              {isEs ? "Calificación promedio" : "Average rating"}
            </div>
            <div className="mt-2 flex justify-center">
              <Stars rating={Math.round(parseFloat(avg))} />
            </div>
          </div>
          <div className="card p-5 text-center">
            <div className="text-4xl md:text-5xl font-medium text-accent leading-none mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              {items.length}
            </div>
            <div className="text-xs text-fg-subtle uppercase tracking-wider font-semibold">
              {isEs ? "Reseñas" : "Reviews"}
            </div>
          </div>
          <div className="card p-5 text-center">
            <div className="text-4xl md:text-5xl font-medium text-accent leading-none mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              {verifiedCount}
            </div>
            <div className="text-xs text-fg-subtle uppercase tracking-wider font-semibold">
              {isEs ? "Verificadas" : "Verified"}
            </div>
            <div className="text-[10px] text-fg-subtle mt-1.5">
              {isEs ? "Pacientes reales" : "Real patients"}
            </div>
          </div>
          <div className="card p-5 text-center">
            <div className="text-4xl md:text-5xl font-medium text-accent leading-none mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              {Object.keys(byService).length}
            </div>
            <div className="text-xs text-fg-subtle uppercase tracking-wider font-semibold">
              {isEs ? "Servicios" : "Services"}
            </div>
          </div>
        </div>
      </PageSection>

      {/* Reviews grid */}
      <PageSection layout="wide" py="md" bg="muted">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {items.map((r, i) => (
            <article key={i} className="card p-6 md:p-7 flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-accent-soft flex items-center justify-center text-accent font-medium" style={{ fontFamily: "var(--font-heading)" }}>
                    {r.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-medium text-fg text-left">{r.name}</div>
                    <div className="text-xs text-fg-subtle text-left">{formatDate(r.date, locale)}</div>
                  </div>
                </div>
                <Stars rating={r.rating} />
              </div>

              {r.service && (
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-accent-soft text-accent">
                    {r.service}
                  </span>
                </div>
              )}

              <Quote className="w-7 h-7 text-accent-soft -mb-2 -mt-1" aria-hidden="true" />
              <p className="text-fg-muted leading-relaxed text-left">{r.text}</p>

              {r.verified && (
                <div className="mt-4 pt-4 border-t border-border-light flex items-center gap-1.5 text-xs text-fg-subtle">
                  <BadgeCheck className="w-3.5 h-3.5 text-success" aria-hidden="true" />
                  {isEs ? "Reseña verificada · paciente real" : "Verified review · real patient"}
                </div>
              )}
            </article>
          ))}
        </div>
      </PageSection>

      {/* Service breakdown */}
      <PageSection layout="wide" py="md">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow inline-flex">
            <Filter className="w-3 h-3" />
            {isEs ? "Por servicio" : "By service"}
          </span>
          <h2 className="text-2xl md:text-3xl mb-6 text-left md:text-center">
            {isEs ? "Qué reseñan los pacientes" : "What patients review"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(byService).map(([svc, count]) => (
              <div key={svc} className="card p-4 flex flex-col items-center text-center">
                <div className="text-2xl font-medium text-accent" style={{ fontFamily: "var(--font-heading)" }}>{count}</div>
                <div className="text-sm text-fg-muted mt-1">{svc}</div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>
    </>
  )
}
