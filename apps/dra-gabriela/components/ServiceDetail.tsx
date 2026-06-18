// Service detail page renderer — full layout with hero, highlights, items,
// process, FAQs, and CTA. Premium feel, mobile-first.
//
// Each service has 5 content blocks:
//  1. Hero (title + description + image)
//  2. Highlights (4-card grid)
//  3. Items (procedures with prices + durations)
//  4. Process (numbered steps)
//  5. FAQs (accordion)
//  6. CTA (gradient banner)

import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, MessageCircle, CheckCircle2, Clock, Sparkles, FileText, HelpCircle } from "lucide-react"
import Image from "next/image"
import { getContent, whatsappLink, type Locale } from "@/lib/content"
import { buildMetadata } from "@/lib/seo"
import { PageHero } from "@/components/PageHero"
import { ContactButtons } from "@/components/ContactButton"
import { ServiceFaq } from "@/components/ServiceFaq"

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

const SERVICES_BY_LOCALE: Record<Locale, Record<string, ServiceData>> = {
  en: {
    "second-opinion": enSegunda,
    "treatment-planning": enPlanning,
    "general-dentistry": enGeneral,
    "cosmetic-dentistry": enCosmetic,
    "oral-rehabilitation": enRehab,
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

const SLUG_TO_CANONICAL: Record<string, string> = {
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const data = SERVICES_BY_LOCALE[locale as Locale]?.[slug]
  if (!data) return {}
  const canonicalSlug = SLUG_TO_CANONICAL[slug] ?? slug
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

const SLUG_TO_IMAGE: Record<string, string> = {
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

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (locale !== "en" && locale !== "es") notFound()
  const data = SERVICES_BY_LOCALE[locale]?.[slug]
  if (!data) notFound()

  const c = getContent(locale)
  const base = `/${locale}`
  const isEs = locale === "es"
  const canonicalSlug = SLUG_TO_CANONICAL[slug] ?? slug
  const heroImage = SLUG_TO_IMAGE[slug]

  const highlights: string[] = data.highlights || []
  const items: any[] = data.items || []
  const process: string[] = data.process || []
  const faqs: any[] = data.faqs || []

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-surface border-b border-border-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-1.5 text-xs text-fg-subtle">
            <li>
              <Link href={base} className="hover:text-accent transition-colors">
                {isEs ? "Inicio" : "Home"}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`${base}/services`} className="hover:text-accent transition-colors">
                {isEs ? "Servicios" : "Services"}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-fg font-medium" aria-current="page">{data.title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent-soft via-bg to-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
          <div className="absolute inset-0 dot-pattern" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <span className="eyebrow inline-flex">
                <Sparkles className="w-3 h-3" />
                {isEs ? "Servicio" : "Service"}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight mb-4 leading-[1.05]">
                <span className="gradient-text">{data.title}</span>
              </h1>
              {data.description && (
                <p className="text-lg md:text-xl text-fg-muted max-w-2xl mb-7 leading-relaxed">
                  {data.description}
                </p>
              )}
              <ContactButtons
                business={c.business}
                locale={locale}
                variant="primary"
                primaryLabel={data.cta || (isEs ? "Coordinar" : "Get in touch")}
                secondaryLabel={isEs ? "Ver precios" : "See pricing"}
              />
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
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="eyebrow inline-flex">
                <Sparkles className="w-3 h-3" />
                {isEs ? "Qué incluye" : "What's included"}
              </span>
              <h2 className="text-3xl md:text-4xl text-left">{isEs ? "Todo lo que necesitás" : "Everything you need"}</h2>
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

      {/* Items / Procedures with prices */}
      {items.length > 0 && (
        <section className="py-16 md:py-20 bg-surface-muted">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="eyebrow inline-flex">
                <FileText className="w-3 h-3" />
                {isEs ? "Procedimientos" : "Procedures"}
              </span>
              <h2 className="text-3xl md:text-4xl text-left">{isEs ? "Qué incluye cada opción" : "What's in each option"}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((it: any, i: number) => (
                <div key={i} className="card p-5 md:p-6">
                  <h3 className="text-lg font-medium mb-2 text-left" style={{ fontFamily: "var(--font-heading)" }}>{it.name}</h3>
                  {it.description && <p className="text-sm text-fg-muted leading-relaxed mb-3 text-left">{it.description}</p>}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-fg-subtle">
                    {it.duration && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {it.duration}
                      </span>
                    )}
                    {it.priceGs && (
                      <span className="text-base font-mono text-accent font-medium">
                        Gs {Number(it.priceGs).toLocaleString("es-PY")}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-fg-subtle mt-6 text-left">
              {isEs
                ? "Precios de referencia. El costo final se confirma en la consulta antes de cualquier procedimiento."
                : "Reference prices. Final cost is confirmed during the visit before any procedure."}
            </p>
          </div>
        </section>
      )}

      {/* Process */}
      {process.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="eyebrow inline-flex">
                <ArrowRight className="w-3 h-3" />
                {isEs ? "Cómo trabajamos" : "How we work"}
              </span>
              <h2 className="text-3xl md:text-4xl text-left">{isEs ? "El proceso" : "The process"}</h2>
            </div>
            <ol className="space-y-4">
              {process.map((step: string, i: number) => (
                <li key={i} className="flex items-start gap-4 md:gap-5">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent text-white flex items-center justify-center font-medium text-lg md:text-xl" style={{ fontFamily: "var(--font-heading)" }}>
                    {i + 1}
                  </div>
                  <p className="text-base md:text-lg text-fg leading-relaxed pt-1.5 md:pt-2.5 text-left">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="py-16 md:py-20 bg-surface-muted">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="eyebrow inline-flex">
                <HelpCircle className="w-3 h-3" />
                {isEs ? "Preguntas frecuentes" : "Frequently asked questions"}
              </span>
              <h2 className="text-3xl md:text-4xl text-left">{isEs ? "Sobre este servicio" : "About this service"}</h2>
            </div>
            <ServiceFaq items={faqs} />
          </div>
        </section>
      )}

      {/* Other services */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href={`${base}/services`} className="inline-flex items-center gap-2 text-accent hover:text-accent-2 transition-colors text-sm font-medium">
              <ArrowRight className="w-4 h-4 rotate-180" />
              {isEs ? "Ver todos los servicios" : "See all services"}
            </Link>
          </div>
        </div>
      </section>

      {/* In-text CTA */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-accent card p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl mb-3">{isEs ? "¿Listo para empezar?" : "Ready to begin?"}</h2>
            <p className="text-fg-muted mb-6 max-w-lg mx-auto">
              {isEs
                ? "Coordiná tu consulta por WhatsApp. Respuesta en menos de 24 horas."
                : "Book your consultation via WhatsApp. Response within 24 hours."}
            </p>
            <ContactButtons
              business={c.business}
              locale={locale}
              variant="primary"
              primaryLabel={isEs ? "Escribime por WhatsApp" : "Message on WhatsApp"}
              secondaryLabel={isEs ? "Ver precios" : "See pricing"}
            />
          </div>
        </div>
      </section>
    </>
  )
}
