// /en/second-opinion + /es/second-opinion — featured service with gradient hero.

import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/seo"
import Link from "next/link"
import { ArrowRight, MessageCircle, CheckCircle2, FileText, Shield, Sparkles, Clock } from "lucide-react"
import en from "@/content/en/second-opinion.json"
import es from "@/content/es/segunda-opinion.json"
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
    slug: "second-opinion",
    title: data?.title ? `${data.title} · Dra. Gabriella` : (isEs ? "Segunda opinión dental" : "Dental second opinion"),
    description: isEs ? "Servicio de segunda opinión dental escrita en Asunción. Revisamos tu caso sin conflicto de interés, plan escrito en 2-3 días." : "Written dental second opinion service in Asunción. We review your case with no conflict of interest, written plan in 2-3 days.",
    locale: isEs ? "es" : "en",
  })
}

export default async function SecondOpinionPage({ params }: { params: Promise<{ locale: string }> }) {
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
        eyebrow={isEs ? "Servicio destacado" : "Featured service"}
        title={c.title || (isEs ? "Segunda opinión escrita" : "Written second opinion")}
        subtitle={c.subtitle}
        variant="gradient"
        align="center"
      >
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-gold text-base px-8 py-4">
            <MessageCircle className="w-5 h-5" />
            {c.cta_primary || (isEs ? "Pedir segunda opinión" : "Request a second opinion")}
          </a>
        ) : (
          <Link href={`/${locale}/contact`} className="btn btn-gold text-base px-8 py-4">
            {isEs ? "Ver contacto" : "See contact"}
          </Link>
        )}
        <Link href={`${base}/pricing`} className="btn btn-white text-base px-8 py-4">
          {isEs ? "Ver precios" : "See pricing"} <ArrowRight className="w-5 h-5" />
        </Link>
      </PageHero>

      {/* Trust strip — 2-col content + stats */}
      <PageSection layout="wide" py="md" bg="muted">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Shield, label: isEs ? "Sin conflicto de interés" : "No conflict of interest" },
            { icon: FileText, label: isEs ? "Informe escrito" : "Written report" },
            { icon: Clock, label: isEs ? "2–3 días de entrega" : "2–3 day turnaround" },
            { icon: CheckCircle2, label: isEs ? "Opciones claras" : "Clear options" },
          ].map((it: any, i) => {
            const Icon = it.icon
            return (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-[var(--accent)]" />
                </div>
                <span className="text-sm text-[var(--fg-muted)]">{it.label}</span>
              </div>
            )
          })}
        </div>
      </PageSection>

      {/* Sections */}
      <PageSection layout="wide" py="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="text-left">
            {(c.sections || []).slice(0, Math.ceil((c.sections || []).length / 2)).map((s: any, i: number) => (
              <div key={i} className="mb-8 last:mb-0">
                <h2 className="text-2xl mb-3">{s.heading || s.title}</h2>
                {s.body && <p className="text-[var(--fg-muted)] leading-relaxed">{s.body}</p>}
              </div>
            ))}
          </div>
          <div className="text-left">
            {(c.sections || []).slice(Math.ceil((c.sections || []).length / 2)).map((s: any, i: number) => (
              <div key={i} className="mb-8 last:mb-0">
                <h2 className="text-2xl mb-3">{s.heading || s.title}</h2>
                {s.body && <p className="text-[var(--fg-muted)] leading-relaxed">{s.body}</p>}
                {s.items && (
                  <ul className="space-y-2.5 mt-3">
                    {s.items.map((it: string, j: number) => (
                      <li key={j} className="flex items-start gap-3 text-[var(--fg-muted)] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[var(--gold)] mt-1 flex-shrink-0" />
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
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--gold-soft)] mb-3">
            <Sparkles className="w-6 h-6 text-[var(--gold-2)]" />
          </div>
          <h2 className="text-2xl md:text-3xl mb-3">
            {c.cta_primary || (isEs ? "Pedí tu segunda opinión" : "Request your second opinion")}
          </h2>
          <p className="text-[var(--fg-muted)] mb-6 max-w-lg mx-auto">
            {isEs
              ? "Reviso tu caso en 2–3 días hábiles. Plan escrito, opciones claras, sin compromiso."
              : "Review within 2–3 business days. Written plan, clear options, no obligation."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <MessageCircle className="w-4 h-4" />
                {isEs ? "Escribime por WhatsApp" : "Message on WhatsApp"}
              </a>
            ) : (
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {isEs ? "Ver datos de contacto" : "See contact details"}
              </Link>
            )}
            <Link href={`${base}/services/second-opinion`} className="btn btn-outline">
              {isEs ? "Ver detalle del servicio" : "Service details"}
            </Link>
          </div>
        </div>
      </PageSection>
    </>
  )
}
