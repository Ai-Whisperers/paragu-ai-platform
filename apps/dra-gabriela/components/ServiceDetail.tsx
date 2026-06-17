// Service detail page renderer — premium layout with hero, highlights, items, CTA.

import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, MessageCircle, CheckCircle2, Clock, Sparkles } from "lucide-react"
import Image from "next/image"
import { getContent, whatsappLink, type Locale } from "@/lib/content"
import { buildMetadata } from "@/lib/seo"
import { PageHero } from "@/components/PageHero"

import enSegunda from "@/content/en/services/categories/second-opinion.json"
import enPlanning from "@/content/en/services/categories/treatment-planning.json"
import enGeneral from "@/content/en/services/categories/general-dentistry.json"
import enCosmetic from "@/content/en/services/categories/cosmetic-dentistry.json"
import enRehab from "@/content/en/services/categories/oral-rehabilitation.json"

import esSegunda from "@/content/es/services/categories/segunda-opinion.json"
import esPlanning from "@/content/es/services/categories/planificacion-tratamiento.json"
import esGeneral from "@/content/es/services/categories/odontologia-general.json"
import esCosmetic from "@/content/es/services/categories/estetica-dental.json"
import esRehab from "@/content/es/services/categories/rehabilitacion-oral.json"

type ServiceData = any

// Map of all known slugs (any language) to their content.
// Each locale gets the same 5 content files but keyed by their language slug.
const SERVICES_BY_LOCALE: Record<Locale, Record<string, ServiceData>> = {
  en: {
    "second-opinion": enSegunda,
    "treatment-planning": enPlanning,
    "general-dentistry": enGeneral,
    "cosmetic-dentistry": enCosmetic,
    "oral-rehabilitation": enRehab,
    // Spanish slugs work too (canonical URLs)
    "segunda-opinion": enSegunda,
    "planificacion-tratamiento": enPlanning,
    "odontologia-general": enGeneral,
    "estetica-dental": enCosmetic,
    "rehabilitacion-oral": enRehab,
  },
  es: {
    "segunda-opinion": esSegunda,
    "planificacion-tratamiento": esPlanning,
    "odontologia-general": esGeneral,
    "estetica-dental": esCosmetic,
    "rehabilitacion-oral": esRehab,
    // English slugs work too (cross-locale access)
    "second-opinion": esSegunda,
    "treatment-planning": esPlanning,
    "general-dentistry": esGeneral,
    "cosmetic-dentistry": esCosmetic,
    "oral-rehabilitation": esRehab,
  },
}

export const dynamic = "force-static"

export function generateStaticParams() {
  return [
    { locale: "en", slug: "second-opinion" },
    { locale: "en", slug: "treatment-planning" },
    { locale: "en", slug: "general-dentistry" },
    { locale: "en", slug: "cosmetic-dentistry" },
    { locale: "en", slug: "oral-rehabilitation" },
    { locale: "es", slug: "segunda-opinion" },
    { locale: "es", slug: "planificacion-tratamiento" },
    { locale: "es", slug: "odontologia-general" },
    { locale: "es", slug: "estetica-dental" },
    { locale: "es", slug: "rehabilitacion-oral" },
    // Cross-locale (slug from any language works)
    { locale: "en", slug: "segunda-opinion" },
    { locale: "en", slug: "planificacion-tratamiento" },
    { locale: "en", slug: "odontologia-general" },
    { locale: "en", slug: "estetica-dental" },
    { locale: "en", slug: "rehabilitacion-oral" },
    { locale: "es", slug: "second-opinion" },
    { locale: "es", slug: "treatment-planning" },
    { locale: "es", slug: "general-dentistry" },
    { locale: "es", slug: "cosmetic-dentistry" },
    { locale: "es", slug: "oral-rehabilitation" },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const data = SERVICES_BY_LOCALE[locale as Locale]?.[slug]
  if (!data) return {}
  // Build the canonical EN slug from whatever slug was passed in
  // (e.g. "segunda-opinion" → "second-opinion")
  const reverseSlugMap: Record<string, string> = {
    "segunda-opinion": "second-opinion",
    "second-opinion": "second-opinion",
    "planificacion-tratamiento": "treatment-planning",
    "treatment-planning": "treatment-planning",
    "odontologia-general": "general-dentistry",
    "general-dentistry": "general-dentistry",
    "estetica-dental": "cosmetic-dentistry",
    "cosmetic-dentistry": "cosmetic-dentistry",
    "rehabilitacion-oral": "oral-rehabilitation",
    "oral-rehabilitation": "oral-rehabilitation",
  }
  const canonicalSlug = reverseSlugMap[slug] ?? slug
  const isEs = locale === "es"
  return buildMetadata({
    slug: `services/${canonicalSlug}`,
    title: data.title ? `${data.title} · Dra. Gabriella` : (isEs ? "Servicio" : "Service"),
    description: data.description || (isEs
      ? "Servicios dentales conservadores con planificación detallada en Asunción."
      : "Conservative dental services with detailed planning in Asunción."),
    locale: isEs ? "es" : "en",
  })
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (locale !== "en" && locale !== "es") notFound()
  const data = SERVICES_BY_LOCALE[locale]?.[slug]
  if (!data) notFound()

  const c = getContent(locale)
  const wa = whatsappLink(c.business?.whatsapp, c.business?.whatsappMessage)
  const base = `/${locale}`
  const isEs = locale === "es"

  const highlights: string[] = data.highlights || []
  const items: any[] = data.items || []

  // Pick image by slug
  const slugToImage: Record<string, string> = {
    "second-opinion": "/images/services/second-opinion.png",
    "treatment-planning": "/images/services/treatment-planning.png",
    "general-dentistry": "/images/services/general-dentistry.svg",
    "cosmetic-dentistry": "/images/services/cosmetic-dentistry.png",
    "oral-rehabilitation": "/images/services/oral-rehabilitation.png",
    "segunda-opinion": "/images/services/second-opinion.png",
    "planificacion-tratamiento": "/images/services/treatment-planning.png",
    "odontologia-general": "/images/services/general-dentistry.svg",
    "estetica-dental": "/images/services/cosmetic-dentistry.png",
    "rehabilitacion-oral": "/images/services/oral-rehabilitation.png",
  }
  const heroImage = slugToImage[slug]

  return (
    <>
      {/* Custom hero with image */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent-soft via-bg to-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
          <div className="absolute inset-0 dot-pattern" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <span className="eyebrow inline-flex">
                <Sparkles className="w-3 h-3" />
                {isEs ? "Servicio" : "Service"}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-5 leading-[1.05]">
                <span className="gradient-text">{data.title}</span>
              </h1>
              {data.description && (
                <p className="text-lg md:text-xl text-fg-muted max-w-2xl mb-7 leading-relaxed">
                  {data.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                {wa ? (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <MessageCircle className="w-4 h-4" />
                    {data.cta || (isEs ? "Coordinar" : "Get in touch")}
                  </a>
                ) : (
                  <Link href={`/${locale}/contact`} className="btn btn-primary">
                    <MessageCircle className="w-4 h-4" />
                    {isEs ? "Coordinar consulta" : "Get in touch"}
                  </Link>
                )}
                <Link href={`${base}/pricing`} className="btn btn-outline">
                  {isEs ? "Ver precios" : "See pricing"} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            {heroImage && (
              <div className="lg:col-span-2 relative">
                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-xl border border-border">
                  <Image
                    src={heroImage}
                    alt={data.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full border-2 border-gold opacity-30 -z-10" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Highlights */}
      {highlights.length > 0 && (
        <section className="section">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="eyebrow inline-flex">
                <Sparkles className="w-3 h-3" />
                {isEs ? "Qué incluye" : "What's included"}
              </span>
              <h2>{isEs ? "Todo lo que necesitás" : "Everything you need"}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <div key={i} className="card-accent card p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-fg leading-relaxed pt-1.5">{h}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Detail items (if any) */}
      {items.length > 0 && (
        <section className="section bg-surface-muted">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2>{isEs ? "Detalle" : "Details"}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((it: any, i: number) => (
                <div key={i} className="card p-5">
                  <h3 className="font-medium mb-1.5">{it.name || it.title}</h3>
                  {it.description && <p className="text-sm text-fg-muted leading-relaxed mb-2">{it.description}</p>}
                  {it.duration && (
                    <span className="text-xs text-fg-subtle flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {it.duration}
                    </span>
                  )}
                  {it.priceGs && (
                    <p className="text-base font-mono text-accent mt-3">Gs {Number(it.priceGs).toLocaleString("es-PY")}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* In-text CTA */}
      <section className="section-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-accent card p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl mb-3">{isEs ? "¿Listo para empezar?" : "Ready to begin?"}</h2>
            <p className="text-fg-muted mb-6 max-w-lg mx-auto">
              {isEs
                ? "Coordiná tu consulta por WhatsApp. Respuesta en menos de 24 horas."
                : "Book your consultation via WhatsApp. Response within 24 hours."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <MessageCircle className="w-4 h-4" />
                  {isEs ? "Escribime por WhatsApp" : "Message on WhatsApp"}
                </a>
              ) : (
                <Link href={`/${locale}/contact`} className="btn btn-primary">
                  <MessageCircle className="w-4 h-4" />
                  {isEs ? "Ver datos de contacto" : "See contact details"}
                </Link>
              )}
              <Link href={`${base}/pricing`} className="btn btn-outline">
                {isEs ? "Ver precios completos" : "See all pricing"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
