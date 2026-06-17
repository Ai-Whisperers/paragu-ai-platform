// /es/filosofia + /en/philosophy — bilingual philosophy page.

import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/seo"
import { Quote, type LucideIcon } from "lucide-react"
import esData from "@/content/es/filosofia.json"
import enData from "@/content/en/philosophy.json"
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
    slug: "philosophy",
    title: data?.title ? `${data.title} · Dra. Gabriella` : (isEs ? "Filosofía" : "Philosophy"),
    description: isEs ? "La filosofía de práctica dental conservadora de la Dra. Gabriella González Pane: planificar primero, actuar con criterio." : "The conservative dental practice philosophy of Dra. Gabriella González Pane: plan first, act with judgment.",
    locale: isEs ? "es" : "en",
  })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== "en" && locale !== "es") notFound()
  const data = locale === "es" ? esData : enData
  const isEs = locale === "es"
  if (!data) notFound()

  const first = data.sections?.[0]
  const principles = data.sections?.[1]
  const other = data.sections?.slice(2) || []

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Filosofía" : "Philosophy"}
        title={data.title}
        subtitle={data.subtitle}
        variant="default"
        align="center"
      />

      {/* Quote / opening — centered narrow */}
      {first && (
        <PageSection layout="narrow" py="md">
          <div className="card-accent card p-8 md:p-10 relative">
            <Quote className="w-10 h-10 text-gold absolute -top-3 -left-3 bg-bg p-2 rounded-lg" />
            <p className="text-xl md:text-2xl text-fg leading-relaxed mb-4 italic font-medium">
              {first.body}
            </p>
            <p className="text-sm text-fg-muted">— {data.title?.split(" ").slice(0, 2).join(" ") || "Dra. Gabriella"}</p>
          </div>
        </PageSection>
      )}

      {/* Principles — 2-col grid */}
      {principles && principles.items && (
        <PageSection layout="wide" py="lg" bg="muted">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl">{principles.heading}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(principles.items || []).map((item: string, i: number) => {
              const [title, ...rest] = item.split(":")
              return (
                <div key={i} className="card p-6 flex items-start gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <div className="step-number w-12 h-12 text-lg flex-shrink-0">{i + 1}</div>
                  <div>
                    <h3 className="font-medium text-lg mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                      {title}
                    </h3>
                    {rest.length > 0 && (
                      <p className="text-sm text-fg-muted leading-relaxed">
                        {rest.join(":").trim()}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </PageSection>
      )}

      {/* Other sections */}
      {other.length > 0 && (
        <PageSection layout="narrow" py="lg">
          <div className="space-y-10">
            {other.map((s: any, i: number) => (
              <div key={i}>
                <h2 className="text-2xl md:text-3xl mb-3">{s.heading}</h2>
                {s.body && <p className="text-fg-muted leading-relaxed text-base md:text-lg">{s.body}</p>}
              </div>
            ))}
          </div>
        </PageSection>
      )}
    </>
  )
}
