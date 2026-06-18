// /en/patient-rights + /es/derechos — Patient rights under Paraguayan law.

import { notFound } from "next/navigation"
import { Shield, FileText, ChevronRight } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import en from "@/content/en/patient-rights.json"
import es from "@/content/es/patient-rights.json"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isEs = locale === "es"
  return buildMetadata({
    slug: "patient-rights",
    title: isEs ? "Derechos del paciente" : "Patient rights",
    description: isEs
      ? "Tus derechos como paciente en Paraguay. Ley 2332/2003 explicada en lenguaje claro."
      : "Your rights as a patient in Paraguay. Law 2332/2003 explained in plain language.",
    locale: isEs ? "es" : "en",
  })
}

export default async function PatientRightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const isEs = locale === "es"
  const base = `/${locale}`

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Derechos del paciente" : "Patient rights"}
        title={c.title}
        subtitle={c.subtitle}
        variant="default"
        align="center"
      />

      {/* Intro */}
      <PageSection layout="narrow" py="md">
        <div className="card-accent card p-6 md:p-7 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <p className="text-fg-muted leading-relaxed text-left flex-1">
            {c.intro}
          </p>
        </div>
      </PageSection>

      {/* Rights grid */}
      <PageSection layout="wide" py="md" bg="muted">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {c.rights.map((r: any, i: number) => (
            <div key={i} className="card p-5 md:p-6">
              <div className="flex items-start gap-3 mb-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center text-accent font-medium text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-base md:text-lg font-medium text-fg flex-1 text-left">{r.title}</h3>
              </div>
              <p className="text-sm text-fg-muted leading-relaxed text-left pl-11">{r.body}</p>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Contact */}
      <PageSection layout="narrow" py="md">
        <div className="card-accent card p-6 md:p-7 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-accent" aria-hidden="true" />
          </div>
          <p className="text-fg-muted leading-relaxed text-left flex-1">{c.contact}</p>
        </div>
      </PageSection>

      {/* Teal CTA */}
      <section className="bg-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl text-white mb-3">
            {isEs ? "¿Tenés alguna pregunta?" : "Have questions?"}
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            {isEs
              ? "Si tenés alguna duda sobre tus derechos, no dudes en escribirnos. Estamos para ayudarte."
              : "If you have questions about your rights, don't hesitate to reach out. We're here to help."}
          </p>
          <a href={`${base}/contact`} className="btn btn-white inline-flex items-center gap-2">
            {isEs ? "Ir a contacto" : "Go to contact"}
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  )
}
