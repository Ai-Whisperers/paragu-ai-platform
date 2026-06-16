// /en/faq + /es/faq — bilingual FAQ with hero + collapsible cards.

import { notFound } from "next/navigation"
import { HelpCircle, ChevronDown } from "lucide-react"
import en from "@/content/en/faqs.json"
import es from "@/content/es/faqs.json"
import { PageHero } from "@/components/PageHero"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = CONTENT[locale as keyof typeof CONTENT]
  return { title: data?.title || "FAQ" }
}

export default async function FAQ({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const groups = c.groups || []
  const isEs = locale === "es"

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={c.title || (isEs ? "Preguntas frecuentes" : "Frequently asked questions")}
        subtitle={c.subtitle || (isEs
          ? "Las preguntas que más recibimos. Si no está tu duda, escribime por WhatsApp."
          : "The questions we get most. If yours isn't here, message us on WhatsApp.")}
        align="center"
        variant="default"
      />

      <section className="section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {groups.map((g: any, gi: number) => (
            <div key={gi}>
              {g.name && (
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <h2 className="text-xl">{g.name}</h2>
                </div>
              )}
              <div className="space-y-3">
                {(g.items || []).map((it: any, i: number) => (
                  <details key={i} className="card group">
                    <summary className="cursor-pointer p-5 list-none flex items-center justify-between gap-4">
                      <span className="font-medium">{it.q || it.question}</span>
                      <ChevronDown className="w-4 h-4 text-[var(--fg-subtle)] group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="px-5 pb-5 -mt-1">
                      <p className="text-sm text-[var(--fg-muted)] leading-relaxed border-t border-[var(--border-light)] pt-3">
                        {it.a || it.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
