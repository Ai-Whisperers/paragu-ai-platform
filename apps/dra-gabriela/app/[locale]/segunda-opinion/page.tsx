// /es/segunda-opinion page
import { notFound } from "next/navigation"
import { MessageCircle } from "lucide-react"
import es from "@/content/es/segunda-opinion.json"

const LOCALES = ["es"] as const
const CONTENT: Record<string, any> = { es }

export function generateStaticParams() {
  return LOCALES.map(l => ({ locale: l }))
}

export const metadata = { title: "Segunda Opinión" }

export default async function SegundaOpinion({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || es

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl sm:text-6xl font-bold mb-3">{c.title || "Segunda Opinión"}</h1>
      {c.subtitle && <p className="text-xl text-gray-600 mb-12">{c.subtitle}</p>}
      <div className="space-y-8">
        {(c.sections || []).map((s: any, i: number) => (
          <section key={i}>
            <h2 className="text-2xl font-bold mb-3">{s.heading || s.title}</h2>
            {s.body && <p className="text-gray-700 leading-relaxed mb-3">{s.body}</p>}
            {s.items && (
              <ul className="space-y-2">
                {s.items.map((it: string, j: number) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-[var(--accent)] font-bold">✓</span>
                    <span className="text-gray-700">{it}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      {c.cta_primary && (
        <div className="mt-12 p-8 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-white rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">{c.cta_primary.title}</h2>
          <a href={`https://wa.me/595991501444?text=${encodeURIComponent(c.cta_primary.body || "")}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--accent)] font-semibold rounded-lg">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      )}
    </div>
  )
}
