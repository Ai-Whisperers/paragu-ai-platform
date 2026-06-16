// /en/process page
import { notFound } from "next/navigation"
import en from "@/content/en/process.json"
import es from "@/content/es/process.json"
import { Calendar, Clock, AlertTriangle, Award } from "lucide-react"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map(l => ({ locale: l }))
}

export const metadata = { title: "Our Process" }

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl sm:text-6xl font-bold mb-3">{c.title || "Our Process"}</h1>
      {c.subtitle && <p className="text-xl text-gray-600 mb-12">{c.subtitle}</p>}

      {c.steps && (
        <div className="space-y-4 mb-12">
          {c.steps.map((s: any, i: number) => (
            <div key={i} className="flex gap-4 p-6 bg-white border border-gray-200 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-lg">
                {s.n || i + 1}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">{s.title}</h2>
                {s.week && <p className="text-sm text-[var(--accent)] mb-2">⏱ {s.week}</p>}
                <p className="text-gray-700 leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {c.what_to_bring && (
          <div className="p-6 bg-gray-50 rounded-xl">
            <Calendar className="w-6 h-6 text-[var(--accent)] mb-2" />
            <h3 className="font-bold mb-2">{locale === "es" ? "Qué traer" : "What to bring"}</h3>
            <p className="text-sm text-gray-700">{c.what_to_bring}</p>
          </div>
        )}
        {c.cancellation_policy && (
          <div className="p-6 bg-gray-50 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-[var(--accent)] mb-2" />
            <h3 className="font-bold mb-2">{locale === "es" ? "Política de cancelación" : "Cancellation policy"}</h3>
            <p className="text-sm text-gray-700">{c.cancellation_policy}</p>
          </div>
        )}
        {c.guarantee && (
          <div className="p-6 bg-gray-50 rounded-xl">
            <Award className="w-6 h-6 text-[var(--accent)] mb-2" />
            <h3 className="font-bold mb-2">{locale === "es" ? "Garantía" : "Guarantee"}</h3>
            <p className="text-sm text-gray-700">{c.guarantee}</p>
          </div>
        )}
      </div>
    </div>
  )
}
