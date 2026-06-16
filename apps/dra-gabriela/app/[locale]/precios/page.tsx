// Bilingual pricing page — ES shows precios.json, EN shows pricing.json
import { notFound } from "next/navigation"
import { MessageCircle } from "lucide-react"
import es from "@/content/es/precios.json"
import en from "@/content/en/pricing.json"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map(l => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = CONTENT[locale as keyof typeof CONTENT]
  return { title: data?.title || (locale === "es" ? "Precios" : "Pricing") }
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!["en", "es"].includes(locale)) notFound()
  const c = CONTENT[locale as keyof typeof CONTENT] || es
  const p = c.pricing || {}
  const isEs = locale === "es"

  const categoryOrder = [
    "consultation", "second_opinion", "treatment_planning",
    "preventive", "restoration", "endodontics", "extraction",
    "implants", "crowns", "prosthodontics", "cosmetic",
    "whitening", "maintenance", "other",
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl md:text-5xl mb-3">{c.title || (isEs ? "Precios" : "Pricing")}</h1>
      {c.metaDescription && <p className="text-[var(--fg-muted)] mb-4">{c.metaDescription}</p>}
      {p.usd_approx && <p className="text-sm text-[var(--fg-subtle)] mb-2">Referencia: {p.usd_approx}</p>}
      {p.disclaimer && <p className="text-sm italic text-[var(--fg-muted)] mb-8">{p.disclaimer}</p>}

      <div className="space-y-8">
        {categoryOrder.map((key) => {
          const items = p[key]
          if (!items || !Array.isArray(items) || items.length === 0) return null
          return (
            <section key={key}>
              <h2 className="text-2xl mb-4 pb-2 border-b border-[var(--border)]">{key}</h2>
              <div className="space-y-2">
                {items.map((it: any, i: number) => (
                  <div key={i} className="card p-4 flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex-1 min-w-[200px]">
                      <h3 className="font-semibold text-[var(--fg)]">{it.name}</h3>
                      {it.duration && <p className="text-xs text-[var(--fg-subtle)] mt-1">⏱ {it.duration}</p>}
                      {it.note && <p className="text-xs text-[var(--fg-muted)] mt-1">{it.note}</p>}
                    </div>
                    <div className="text-lg font-bold text-[var(--accent)]">
                      {it.price ? `Gs ${Number(it.price).toLocaleString("es-PY")}` : it.priceText || ""}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {p.cta_whatsapp && (
        <div className="mt-12 p-8 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-white rounded-[var(--radius-xl)] text-center">
          <h2 className="text-2xl font-bold mb-3">{isEs ? "¿Listo para coordinar?" : "Ready to book?"}</h2>
          <a
            href={`https://wa.me/595981000000?text=${encodeURIComponent(p.cta_whatsapp_text || "")}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--accent)] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      )}
    </div>
  )
}
