// /es/precios page - identical to /en/pricing but with ES locale
import { notFound } from "next/navigation"
import { MessageCircle } from "lucide-react"
import es from "@/content/es/precios.json"

const LOCALES = ["es"] as const
const CONTENT: Record<string, any> = { es }

export function generateStaticParams() {
  return LOCALES.map(l => ({ locale: l }))
}

export const metadata = { title: "Precios" }

const CATEGORY_TITLES_ES: Record<string, string> = {
  consultation: "Consulta",
  second_opinion: "Segunda Opinión",
  treatment_planning: "Planificación",
  complex_planning: "Planificación Compleja",
  preventive: "Preventivo",
  operatoria: "Operatoria",
  endodoncia: "Endodoncia",
  exodoncia: "Exodoncias",
  protesis: "Prótesis",
  implantes: "Implantes",
  estetica: "Estética",
  odontopediatria: "Odontopediatría",
  corporate_note: "Corporativo",
  payment: "Opciones de Pago",
}

export default async function Precios({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || es
  const p = c.pricing || {}
  const categoryOrder = ["consultation", "second_opinion", "treatment_planning", "complex_planning", "preventive", "operatoria", "endodoncia", "exodoncia", "protesis", "implantes", "estetica", "odontopediatria"]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl sm:text-6xl font-bold mb-3">{c.title || "Precios"}</h1>
      {c.metaDescription && <p className="text-gray-600 mb-4">{c.metaDescription}</p>}
      {p.usd_approx && <p className="text-sm text-gray-500 mb-2">Referencia: {p.usd_approx}</p>}
      {p.disclaimer && <p className="text-sm italic text-gray-600 mb-8">{p.disclaimer}</p>}

      <div className="space-y-8">
        {categoryOrder.map((key) => {
          const items = p[key]
          if (!items || !Array.isArray(items) || items.length === 0) return null
          return (
            <section key={key}>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200">{CATEGORY_TITLES_ES[key] || key}</h2>
              <div className="space-y-2">
                {items.map((it: any, i: number) => (
                  <div key={i} className="p-4 bg-white border border-gray-200 rounded-lg flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex-1 min-w-[200px]">
                      <h3 className="font-semibold">{it.name}</h3>
                      {it.duration && <p className="text-xs text-gray-500 mt-1">⏱ {it.duration}</p>}
                      {it.note && <p className="text-xs text-gray-500 mt-1">{it.note}</p>}
                    </div>
                    <div className="text-lg font-bold text-[var(--accent)]">
                      {it.price ? `Gs ${it.price.toLocaleString()}` : it.priceText || ""}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
        {p.corporate_note && (
          <section className="p-6 bg-gray-50 rounded-xl">
            <h2 className="text-xl font-bold mb-2">Corporativo</h2>
            <p className="text-gray-700">{p.corporate_note}</p>
          </section>
        )}
        {p.payment && Array.isArray(p.payment) && (
          <section>
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200">Opciones de Pago</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {p.payment.map((opt: string, i: number) => (
                <li key={i} className="p-3 bg-white border border-gray-200 rounded-lg">💳 {opt}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {p.cta_whatsapp && (
        <div className="mt-12 p-8 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-white rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">¿Listo para reservar?</h2>
          <a href={`https://wa.me/595991501444?text=${encodeURIComponent(c.cta_whatsapp_text || "")}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--accent)] font-semibold rounded-lg">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      )}
    </div>
  )
}
