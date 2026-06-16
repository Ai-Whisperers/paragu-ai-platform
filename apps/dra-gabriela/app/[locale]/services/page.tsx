// /en/services index page
import { notFound } from "next/navigation"
import Link from "next/link"
import en from "@/content/en/services/index.json"
import es from "@/content/es/services/index.json"
import { ArrowRight } from "lucide-react"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map(l => ({ locale: l }))
}

export const metadata = { title: "Services" }

export default async function Services({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const base = `/${locale}`

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl sm:text-6xl font-bold mb-3 text-center">{c.title || "Services"}</h1>
      {c.subtitle && <p className="text-xl text-gray-600 mb-12 text-center">{c.subtitle}</p>}

      {c.bundles && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {c.bundles.map((b: any) => (
            <Link key={b.id} href={b.link || "#"} className="p-6 bg-white border border-gray-200 rounded-xl hover:border-[var(--accent)] transition-colors">
              <h3 className="text-xl font-bold mb-2">{b.name}</h3>
              <p className="text-sm text-gray-700 mb-3">{b.description}</p>
              {b.priceGs && <p className="text-2xl font-bold text-[var(--accent)]">Gs {b.priceGs.toLocaleString()}</p>}
            </Link>
          ))}
        </div>
      )}

      {c.tabs && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {c.tabs.map((t: any) => (
            <Link key={t.id} href={`${base}/services#${t.id}`} className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-white transition-colors flex items-center justify-between">
              <span className="font-medium">{t.label}</span>
              <ArrowRight className="w-4 h-4 text-[var(--accent)]" />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
