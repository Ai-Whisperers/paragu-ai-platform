// /en/about + /es/nosotros — Dra. Gabriella bio.
// Uses PageHero (compact) for the title + PageSection for the body.
// 2-col layout: portrait + bio. Single content column for the philosophy cards.

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageCircle, GraduationCap, Globe, Award, Languages, type LucideIcon } from "lucide-react"
import en from "@/content/en/about.json"
import es from "@/content/es/nosotros.json"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"
import { getContent, whatsappLink } from "@/lib/content"
import { buildMetadata } from "@/lib/seo"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

const ICONS: Record<string, LucideIcon> = {
  graduationCap: GraduationCap, globe: Globe, award: Award, languages: Languages,
}

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = CONTENT[locale as keyof typeof CONTENT]
  const isEs = locale === "es"
  return buildMetadata({
    slug: "about",
    title: data?.title ? `${data.title} · Dra. Gabriella` : (isEs ? "Sobre mí" : "About"),
    description: data?.subtitle || (isEs
      ? "Sobre la Dra. Gabriella González Pane, odontóloga conservadora bilingüe en Asunción. Veinte años de práctica, planificación primero."
      : "About Dra. Gabriella González Pane, bilingual conservative dentist in Asunción. Twenty years of practice, planning first."),
    locale: isEs ? "es" : "en",
  })
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const isEs = locale === "es"
  const base = `/${locale}`
  const c2 = getContent(locale)
  const wa = whatsappLink(c2.business?.whatsapp, c2.business?.whatsappMessage)

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Sobre mí" : "About"}
        title={c.title}
        subtitle={c.subtitle}
        variant="compact"
        align="left"
      />

      {/* Portrait + intro — 2-col */}
      <PageSection layout="wide" py="lg">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
          {/* Portrait */}
          <div className="lg:sticky lg:top-24">
            <div className="card overflow-hidden">
              <div className="aspect-[3/4] relative">
                <Image
                  src="/images/team/dra-gp-portrait-v2.svg"
                  alt="Ometz Dental · Dra. Gabriella González Pane"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-5 border-t border-border">
                <h3 className="font-medium mb-0.5" style={{ fontFamily: "var(--font-heading)" }}>Dra. Gabriella González Pane</h3>
                <p className="text-xs text-fg-subtle">{isEs ? "Odontóloga · Cirujana dentista" : "Dental surgeon"}</p>
              </div>
            </div>
          </div>

          {/* Bio sections */}
          <div className="text-left">
            {(c.sections || []).map((s: any, i: number) => (
              <div key={i} className="mb-10 last:mb-0">
                <h2 className="text-2xl md:text-3xl mb-3">{s.heading}</h2>
                {s.body && <p className="text-base md:text-lg text-fg-muted leading-relaxed mb-4">{s.body}</p>}
                {s.items && (
                  <ul className="space-y-2.5">
                    {s.items.map((it: string, j: number) => {
                      const iconKey = s.icon_keys?.[j] || s.iconKey
                      const Icon = iconKey && ICONS[iconKey] ? ICONS[iconKey] : null
                      return (
                        <li key={j} className="flex items-start gap-3 text-fg-muted leading-relaxed">
                          {Icon ? (
                            <Icon className="w-4 h-4 text-gold mt-1.5 flex-shrink-0" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                          )}
                          <span>{it}</span>
                        </li>
                      )
                    })}
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
            {c.cta?.title || (isEs ? "¿Hablamos?" : "Let's talk?")}
          </h2>
          <p className="text-fg-muted mb-6 max-w-lg mx-auto">
            {c.cta?.body || (isEs
              ? "Coordiná tu consulta por WhatsApp."
              : "Book your consultation via WhatsApp.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <MessageCircle className="w-4 h-4" />
                {isEs ? "Escribime por WhatsApp" : "Message on WhatsApp"}
              </a>
            ) : (
              <Link href={`${base}/contact`} className="btn btn-primary">
                {isEs ? "Ver contacto" : "See contact"} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link href={`${base}/second-opinion`} className="btn btn-outline">
              {isEs ? "Segunda opinión" : "Second opinion"}
            </Link>
          </div>
        </div>
      </PageSection>

      {/* Credentials block — navy tone */}
      <section className="tone-ocean-7 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-wider text-gold font-semibold">
              {isEs ? "Credenciales" : "Credentials"}
            </span>
            <h2 className="text-3xl md:text-4xl text-white mt-3">
              {isEs ? "Formación continua, transparencia total" : "Continuous training, total transparency"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="text-gold font-medium text-sm mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {isEs ? "Formación" : "Training"}
              </div>
              <div className="text-white font-medium mb-1.5">
                {isEs ? "Universidad Autónoma del Paraguay" : "Universidad Autónoma del Paraguay"}
              </div>
              <div className="text-sm text-white/70 leading-relaxed">
                {isEs ? "Cirujana dentista con veinte años de práctica. Posgrados en endodoncia, rehabilitación oral y estética." : "Dental surgeon with twenty years of practice. Postgrad training in endodontics, oral rehabilitation, aesthetics."}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="text-gold font-medium text-sm mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {isEs ? "Membresías" : "Memberships"}
              </div>
              <ul className="space-y-1.5 text-white/90 text-sm">
                <li className="flex items-start gap-2 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                  <span>{isEs ? "Asociación de Odontólogos del Paraguay" : "Dental Association of Paraguay"}</span>
                </li>
                <li className="flex items-start gap-2 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                  <span>{isEs ? "Sociedad Paraguaya de Endodoncia" : "Paraguayan Endodontic Society"}</span>
                </li>
                <li className="flex items-start gap-2 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                  <span>{isEs ? "IADR (International Association for Dental Research)" : "IADR (International Association for Dental Research)"}</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="text-gold font-medium text-sm mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {isEs ? "Capacitación continua" : "Continuing education"}
              </div>
              <div className="text-sm text-white/90 leading-relaxed">
                {isEs
                  ? "Asistí a más de 30 congresos y cursos de actualización en los últimos 10 años, en Paraguay, Brasil, Argentina y Estados Unidos. La odontología cambia rápido — mantenerse al día es parte del trabajo."
                  : "I've attended 30+ conferences and update courses in the last 10 years, in Paraguay, Brazil, Argentina, and the US. Dentistry changes fast — staying current is part of the job."}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
