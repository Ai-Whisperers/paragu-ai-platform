// /en/second-opinion + /es/second-opinion — featured service page with hero gradient variant.

import { notFound } from "next/navigation"
import Link from "next/link"
import { MessageCircle, ArrowRight, CheckCircle2, FileText, Shield, Sparkles, Clock } from "lucide-react"
import en from "@/content/en/second-opinion.json"
import es from "@/content/es/segunda-opinion.json"
import { PageHero } from "@/components/PageHero"
import { getContent, whatsappLink } from "@/lib/content"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = CONTENT[locale as keyof typeof CONTENT]
  return { title: data?.title || (locale === "es" ? "Segunda opinión" : "Second opinion") }
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
      {/* Featured service — gradient hero variant */}
      <PageHero
        eyebrow={isEs ? "Servicio destacado" : "Featured service"}
        title={c.title || (isEs ? "Segunda opinión escrita" : "Written second opinion")}
        subtitle={c.subtitle}
        align="center"
        variant="gradient"
      >
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            <MessageCircle className="w-4 h-4" />
            {c.cta_primary || (isEs ? "Pedir segunda opinión" : "Request a second opinion")}
          </a>
        ) : (
          <Link href={`/${locale}/contact`} className="btn btn-gold">
            {isEs ? "Ver contacto" : "See contact"}
          </Link>
        )}
        <Link href={`${base}/pricing`} className="btn btn-white">
          {isEs ? "Ver precios" : "See pricing"} <ArrowRight className="w-4 h-4" />
        </Link>
      </PageHero>

      {/* Trust stats inline */}
      <section className="bg-[var(--surface)] border-y border-[var(--border-light)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Shield, label: isEs ? "Sin conflicto de interés" : "No conflict of interest" },
              { icon: FileText, label: isEs ? "Informe escrito" : "Written report" },
              { icon: Clock, label: isEs ? "2–3 días de entrega" : "2–3 day turnaround" },
              { icon: CheckCircle2, label: isEs ? "Opciones claras" : "Clear options" },
            ].map((it: any, i) => {
              const Icon = it.icon
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Icon className="w-5 h-5 text-[var(--gold)]" />
                  <span className="text-xs text-[var(--fg-muted)]">{it.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {(c.sections || []).map((s: any, i: number) => (
            <div key={i}>
              <h2 className="text-2xl mb-3">{s.heading || s.title}</h2>
              {s.body && <p className="text-[var(--fg-muted)] leading-relaxed mb-3">{s.body}</p>}
              {s.items && (
                <ul className="space-y-2.5">
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
      </section>

      {/* CTA */}
      <section className="section-sm bg-[var(--surface)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-accent card p-8 md:p-10">
            <Sparkles className="w-8 h-8 text-[var(--gold)] mx-auto mb-3" />
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
        </div>
      </section>
    </>
  )
}
