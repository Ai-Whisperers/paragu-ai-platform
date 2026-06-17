// /en/expat + /es/expat — bilingual expat landing.

import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/seo"
import { MessageCircle, Globe, Languages, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import en from "@/content/en/expat.json"
import es from "@/content/es/expat.json"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"
import { getContent, whatsappLink } from "@/lib/content"

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
    slug: "expat",
    title: data?.title ? `${data.title} · Dra. Gabriella` : (isEs ? "Atención dental para expatriados" : "Dental care for expats"),
    description: isEs ? "Atención dental bilingüe en Asunción para expatriados. La Dra. Gabriella González Pane consulta en inglés y español." : "Bilingual dental care in Asunción for expats. Dra. Gabriella González Pane sees patients in English and Spanish.",
    locale: isEs ? "es" : "en",
  })
}

export default async function ExpatPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const isEs = locale === "es"
  const c2 = getContent(locale)
  const wa = whatsappLink(c2.business?.whatsapp, c2.business?.whatsappMessage)
  const base = `/${locale}`

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Pacientes internacionales" : "International patients"}
        title={c.title || (isEs ? "Atención dental en Asunción" : "Dental care in Asunción")}
        subtitle={c.subtitle}
        variant="default"
        align="center"
      >
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <MessageCircle className="w-4 h-4" />
            {isEs ? "Escribime por WhatsApp" : "Message on WhatsApp"}
          </a>
        ) : (
          <Link href={`/${locale}/contact`} className="btn btn-primary">
            {isEs ? "Ver contacto" : "See contact"} <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </PageHero>

      {/* Trust badges row */}
      <PageSection layout="wide" py="md" bg="muted">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Languages, label: "English", sub: isEs ? "Atención 100% en inglés" : "Full English care" },
            { icon: FileText, label: isEs ? "Factura" : "Invoice", sub: isEs ? "RUC para reembolso" : "RUC for reimbursement" },
            { icon: Globe, label: isEs ? "Idiomas" : "Languages", sub: "ES · EN" },
          ].map((it, i) => {
            const Icon = it.icon
            return (
              <div key={i} className="card p-5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-fg-subtle font-semibold">{it.label}</div>
                  <div className="font-medium text-sm">{it.sub}</div>
                </div>
              </div>
            )
          })}
        </div>
      </PageSection>

      {/* Sections */}
      <PageSection layout="wide" py="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="text-left">
            {(c.sections || []).map((s: any, i: number) => (
              <div key={i} className="mb-10 last:mb-0">
                <h2 className="text-2xl mb-3">{s.heading || s.title}</h2>
                {s.body && <p className="text-fg-muted leading-relaxed text-base md:text-lg">{s.body}</p>}
                {s.items && (
                  <ul className="space-y-2.5 mt-3">
                    {s.items.map((it: string, j: number) => (
                      <li key={j} className="flex items-start gap-3 text-fg-muted leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <PageSection layout="narrow" py="md" bg="muted">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl mb-3">
            {isEs ? "¿Listo para coordinar?" : "Ready to coordinate?"}
          </h2>
          <p className="text-fg-muted mb-6 max-w-lg mx-auto">
            {isEs
              ? "Atención en inglés. Respuesta en menos de 24 horas."
              : "Care in English. Response within 24 hours."}
          </p>
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <MessageCircle className="w-4 h-4" />
              {isEs ? "Escribime por WhatsApp" : "Message on WhatsApp"}
            </a>
          ) : (
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {isEs ? "Ver contacto" : "See contact"}
            </Link>
          )}
        </div>
      </PageSection>
    </>
  )
}
