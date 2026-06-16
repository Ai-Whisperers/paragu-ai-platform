// /en/about page
import { notFound } from "next/navigation"
import en from "@/content/en/about.json"
import es from "@/content/es/nosotros.json"
import Link from "next/link"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map(l => ({ locale: l }))
}

export const metadata = { title: "About" }

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const base = `/${locale}`

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl sm:text-6xl font-bold mb-3">{c.title || "About"}</h1>
      {c.subtitle && <p className="text-xl text-gray-600 mb-12">{c.subtitle}</p>}

      {(c.sections || []).map((s: any, i: number) => (
        <section key={i} className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{s.heading}</h2>
          {s.body && <p className="text-gray-700 leading-relaxed mb-4">{s.body}</p>}
          {s.items && (
            <ul className="space-y-2">
              {s.items.map((it: string, j: number) => (
                <li key={j} className="flex gap-3">
                  <span className="text-[var(--accent)] font-bold">•</span>
                  <span className="text-gray-700">{it}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {c.cta && (
        <div className="mt-12 p-8 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-white rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">{c.cta.title}</h2>
          <p className="opacity-90 mb-6">{c.cta.body}</p>
          <Link href={c.schedule_link || `${base}/contact`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--accent)] font-semibold rounded-lg">
            {c.cta.button || (locale === "es" ? "Agendar" : "Book")}
          </Link>
        </div>
      )}
    </div>
  )
}
