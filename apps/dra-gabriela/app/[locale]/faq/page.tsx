// /en/faq page
import { notFound } from "next/navigation"
import en from "@/content/en/faqs.json"
import es from "@/content/es/faqs.json"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map(l => ({ locale: l }))
}

export const metadata = { title: "FAQ" }

export default async function FAQ({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const groups = c.groups || [{ title: "", items: c.items || [] }]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl sm:text-6xl font-bold mb-3">{c.title || "FAQ"}</h1>

      <div className="space-y-10 mt-8">
        {groups.map((g: any, gi: number) => (
          <section key={gi}>
            {g.title && <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200">{g.title}</h2>}
            <div className="space-y-3">
              {(g.items || []).map((it: any, i: number) => (
                <details key={i} className="p-5 bg-white border border-gray-200 rounded-xl group">
                  <summary className="font-semibold cursor-pointer flex items-center justify-between">
                    {it.q || it.question}
                    <span className="text-[var(--accent)] text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{it.a || it.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
