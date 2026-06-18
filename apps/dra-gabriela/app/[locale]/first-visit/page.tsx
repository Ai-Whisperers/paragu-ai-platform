// /en/first-visit — what to bring, what to expect, after the visit.

import { notFound } from "next/navigation"
import { CheckCircle2, ListChecks, Clock, FileText } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import en from "@/content/en/first-visit.json"
import es from "@/content/es/first-visit.json"
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
  const isEs = locale === "es"
  return buildMetadata({
    slug: "first-visit",
    title: isEs ? "Primera visita" : "First visit",
    description: isEs
      ? "Qué traer a la primera visita con la Dra. Gabriella González Pane en Asunción y qué esperar."
      : "What to bring to your first visit with Dra. Gabriella González Pane in Asunción and what to expect.",
    locale: isEs ? "es" : "en",
  })
}

const ICONS_EN = [ListChecks, Clock, FileText, ListChecks]
const ICONS_ES = [ListChecks, Clock, FileText, ListChecks]

export default async function FirstVisitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const isEs = locale === "es"
  const base = `/${locale}`

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Primera visita" : "First visit"}
        title={c.title}
        subtitle={c.subtitle}
        variant="default"
        align="center"
      />

      <PageSection layout="wide" py="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {c.sections.map((s: any, i: number) => {
            const Icon = isEs ? ICONS_ES[i] : ICONS_EN[i]
            return (
              <div key={i} className="card-accent card p-6 md:p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl">{s.heading}</h2>
                </div>
                <ul className="space-y-2.5">
                  {s.items.map((it: string, j: number) => (
                    <li key={j} className="flex items-start gap-3 text-fg-muted leading-relaxed text-left">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-1" aria-hidden="true" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </PageSection>

      <PageSection layout="narrow" py="md" bg="muted">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl mb-3">
            {isEs ? "¿Listo para coordinar?" : "Ready to schedule?"}
          </h2>
          <p className="text-fg-muted mb-6 max-w-md mx-auto">
            {isEs
              ? "Escribime por WhatsApp o usá el formulario. Te respondemos en menos de 24 horas."
              : "Message me on WhatsApp or use the form. Response within 24 hours."}
          </p>
          <a href={`${base}/contact`} className="btn btn-primary">
            {isEs ? "Ir a contacto" : "Go to contact"}
          </a>
        </div>
      </PageSection>
    </>
  )
}
