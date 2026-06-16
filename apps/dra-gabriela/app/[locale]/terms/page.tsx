// /en/terms + /es/terminos — bilingual terms of service with PageHero.

import { notFound } from "next/navigation"
import { FileText } from "lucide-react"
import esData from "@/content/es/terminos.json"
import enData from "@/content/en/terminos.json"
import { PageHero } from "@/components/PageHero"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = locale === "es" ? esData : enData
  return { title: data?.title || (locale === "es" ? "Términos" : "Terms") }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== "en" && locale !== "es") notFound()
  const data = locale === "es" ? esData : enData
  const isEs = locale === "es"
  if (!data) notFound()

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Legal" : "Legal"}
        title={data.title}
        subtitle={data.subtitle}
        align="center"
        variant="default"
      >
        <div className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)]">
          <FileText className="w-4 h-4 text-[var(--gold)]" />
          {isEs ? "Vigente desde junio 2026" : "Effective June 2026"}
        </div>
      </PageHero>

      <section className="section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {data.sections?.map((s: any, i: number) => (
            <div key={i}>
              <h2 className="text-xl mb-3">{s.heading}</h2>
              {s.body && <p className="text-[var(--fg-muted)] leading-relaxed mb-3">{s.body}</p>}
              {s.items && (
                <ul className="space-y-2">
                  {s.items.map((item: string, j: number) => (
                    <li key={j} className="flex items-start gap-3 text-[var(--fg-muted)] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-2.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
