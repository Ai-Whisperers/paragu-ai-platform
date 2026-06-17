// /en/terms + /es/terminos — bilingual terms of service.

import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/seo"
import { FileText } from "lucide-react"
import esData from "@/content/es/terminos.json"
import enData from "@/content/en/terminos.json"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = locale === "es" ? esData : enData
  const isEs = locale === "es"
  return buildMetadata({
    slug: "terms",
    title: data?.title ? `${data.title} · Dra. Gabriella` : (isEs ? "Términos y condiciones" : "Terms and conditions"),
    description: isEs ? "Términos y condiciones de la práctica dental de la Dra. Gabriella González Pane en Asunción." : "Terms and conditions of Dra. Gabriella González Pane's dental practice in Asunción.",
    locale: isEs ? "es" : "en",
  })
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
        variant="default"
        align="center"
      >
        <div className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] px-3 py-1.5 rounded-full border border-[var(--border)]">
          <FileText className="w-4 h-4 text-[var(--gold)]" />
          {isEs ? "Vigente desde junio 2026" : "Effective June 2026"}
        </div>
      </PageHero>

      <PageSection layout="narrow" py="lg">
        <div className="space-y-10">
          {data.sections?.map((s: any, i: number) => (
            <div key={i} className="text-left">
              <h2 className="text-xl md:text-2xl mb-3">{s.heading}</h2>
              {s.body && <p className="text-[var(--fg-muted)] leading-relaxed text-base md:text-lg mb-3">{s.body}</p>}
              {s.items && (
                <ul className="space-y-2">
                  {s.items.map((item: string, j: number) => (
                    <li key={j} className="flex items-start gap-3 text-[var(--fg-muted)] leading-relaxed text-base">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-3 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </PageSection>
    </>
  )
}
