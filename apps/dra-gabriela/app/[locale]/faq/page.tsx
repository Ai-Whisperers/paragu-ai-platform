// /en/faq + /es/faq — bilingual FAQ with hero + grouped collapsible cards.

import { notFound } from "next/navigation"
import { ChevronDown, HelpCircle } from "lucide-react"
import en from "@/content/en/faqs.json"
import es from "@/content/es/faqs.json"
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
  return { title: data?.title || "FAQ" }
}

export default async function FAQ({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const isEs = locale === "es"
  const groups = c.groups || []

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={c.title || (isEs ? "Preguntas frecuentes" : "Frequently asked questions")}
        subtitle={c.subtitle || (isEs
          ? "Las preguntas que más recibimos. Si no está tu duda, escribime por WhatsApp."
          : "The questions we get most. If yours isn't here, message us on WhatsApp.")}
        variant="default"
        align="center"
      />

      <PageSection layout="wide" py="lg">
        <div className="space-y-12">
          {groups.map((g: any, gi: number) => (
            <div key={gi}>
              {g.name && (
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <h2 className="text-2xl">{g.name}</h2>
                </div>
              )}
              <div className="space-y-3">
                {(g.items || []).map((it: any, i: number) => (
                  <details key={i} className="group bg-[var(--surface)] border-2 border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--accent)] hover:shadow-lg transition-all">
                    <summary className="cursor-pointer p-5 md:p-6 list-none flex items-start justify-between gap-4 hover:bg-[var(--surface-muted)] transition-colors">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] font-medium text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <span className="font-medium text-lg md:text-xl pt-1 text-left">{it.q || it.question}</span>
                      </div>
                      <ChevronDown className="w-5 h-5 text-[var(--fg-subtle)] group-open:rotate-180 transition-transform flex-shrink-0 mt-2" />
                    </summary>
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pl-16 md:pl-[5.5rem]">
                      <p className="text-[var(--fg-muted)] leading-relaxed border-t border-[var(--border-light)] pt-4 text-left">
                        {it.a || it.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageSection>
    </>
  )
}
