// /en/clinic + /es/clinica — clinic, sterilization, equipment, materials.

import { notFound } from "next/navigation"
import { Building2, ShieldCheck, Cpu, Sparkles, X, Heart } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import en from "@/content/en/clinic.json"
import es from "@/content/es/clinic.json"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

const ICONS = [Building2, ShieldCheck, Cpu, Sparkles, X, Heart]

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isEs = locale === "es"
  return buildMetadata({
    slug: "clinic",
    title: isEs ? "Clínica, esterilización y equipamiento" : "Clinic, sterilization, and equipment",
    description: isEs
      ? "Cómo funciona la clínica, qué protocolos seguimos, y qué equipamiento usamos."
      : "How the clinic works, what protocols we follow, and what equipment we use.",
    locale: isEs ? "es" : "en",
  })
}

export default async function ClinicPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const isEs = locale === "es"
  const sections: any[] = c.sections || []
  const base = `/${locale}`

  return (
    <>
      <PageHero
        eyebrow={isEs ? "La clínica" : "The clinic"}
        title={c.title}
        subtitle={c.subtitle}
        variant="default"
        align="center"
      />

      <PageSection layout="wide" py="lg">
        <div className="space-y-12 max-w-5xl mx-auto">
          {sections.map((s: any, i: number) => {
            const Icon = ICONS[i] || Building2
            return (
              <div key={i}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${i % 2 === 0 ? "bg-accent-soft" : "bg-accent"}`}>
                    <Icon className={`w-5 h-5 ${i % 2 === 0 ? "text-accent" : "text-white"}`} aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl md:text-3xl">{s.heading}</h2>
                </div>
                {s.body && <p className="text-base text-fg-muted leading-relaxed mb-4 text-left max-w-3xl">{s.body}</p>}
                {s.items && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {s.items.map((it: string, j: number) => (
                      <li key={j} className="flex items-start gap-2.5 text-fg-muted text-sm leading-relaxed text-left">
                        <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${i % 2 === 0 ? "bg-accent" : "bg-gold"}`} />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </PageSection>

      {/* CTA */}
      <section className="tone-ocean-7 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl text-white mb-3">
            {isEs ? "Visitá la clínica" : "Visit the clinic"}
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            {isEs
              ? "Coordiná una visita para conocer el espacio y resolver tus preguntas en persona."
              : "Book a visit to see the space and answer your questions in person."}
          </p>
          <a href={`${base}/contact`} className="btn btn-white">
            {isEs ? "Coordinar visita" : "Book a visit"}
          </a>
        </div>
      </section>
    </>
  )
}
