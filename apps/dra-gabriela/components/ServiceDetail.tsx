// Service detail page renderer. Reads content/{locale}/services/categories/{slug}.json
// and renders a single, focused service page. Slug map translates English slugs
// (cosmetic-dentistry) to their Spanish content files (estetica-dental).

import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react"
import { getContent, whatsappLink, type Locale } from "@/lib/content"
import { CtaBanner } from "@/components/sections/CtaBanner"

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
  },
  es: {
    "segunda-opinion": esSegunda,
    "planificacion-tratamiento": esPlanning,
    "odontologia-general": esGeneral,
    "estetica-dental": esCosmetic,
    "rehabilitacion-oral": esRehab,
  },
}

const SLUG_ALIAS: Record<string, Record<Locale, string>> = {
  "second-opinion": { en: "second-opinion", es: "segunda-opinion" },
  "segunda-opinion": { en: "second-opinion", es: "segunda-opinion" },
  "treatment-planning": { en: "treatment-planning", es: "planificacion-tratamiento" },
  "planificacion-tratamiento": { en: "treatment-planning", es: "planificacion-tratamiento" },
  "general-dentistry": { en: "general-dentistry", es: "odontologia-general" },
  "odontologia-general": { en: "general-dentistry", es: "odontologia-general" },
  "cosmetic-dentistry": { en: "cosmetic-dentistry", es: "estetica-dental" },
  "estetica-dental": { en: "cosmetic-dentistry", es: "estetica-dental" },
  "oral-rehabilitation": { en: "oral-rehabilitation", es: "rehabilitacion-oral" },
  "rehabilitacion-oral": { en: "oral-rehabilitation", es: "rehabilitacion-oral" },
}

export const dynamic = "force-static"

export function generateStaticParams() {
  // All slugs x both locales
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
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const data = SERVICES_BY_LOCALE[locale as Locale]?.[slug]
  if (!data) return {}
  return {
    title: data.title,
    description: data.description,
  }
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

  return (
    <>
      <section className="section bg-gradient-to-br from-[var(--accent-soft)] via-[var(--bg)] to-[var(--bg)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href={`${base}/servicios`} className="text-sm text-[var(--accent)] inline-flex items-center gap-1 mb-6 hover:underline">
            ← {isEs ? "Todos los servicios" : "All services"}
          </Link>
          <span className="eyebrow">{isEs ? "Servicio" : "Service"}</span>
          <h1 className="text-3xl md:text-5xl mb-6">
            <span className="gradient-text">{data.title}</span>
          </h1>
          {data.description && <p className="text-lg text-[var(--fg-muted)] leading-relaxed">{data.description}</p>}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <MessageCircle className="w-4 h-4" /> {data.cta || (isEs ? "Coordinar" : "Get in touch")}
              </a>
            ) : (
              <Link href={`${base}/contacto`} className="btn btn-primary">
                <MessageCircle className="w-4 h-4" /> {isEs ? "Coordinar" : "Get in touch"}
              </Link>
            )}
            <Link href={`${base}/precios`} className="btn btn-outline">
              {isEs ? "Ver precios" : "See pricing"} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {data.highlights && data.highlights.length > 0 && (
        <section className="section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl mb-8 text-center">{isEs ? "Qué incluye" : "What's included"}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.highlights.map((h: string, i: number) => (
                <li key={i} className="card p-5 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--fg)] leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {data.items && data.items.length > 0 && (
        <section className="section bg-[var(--surface-muted)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl mb-8 text-center">{isEs ? "Detalle" : "Details"}</h2>
            <ul className="space-y-3">
              {data.items.map((it: any, i: number) => (
                <li key={i} className="card p-5">
                  <h3 className="font-medium mb-1">{it.name || it.title}</h3>
                  {it.description && <p className="text-sm text-[var(--fg-muted)]">{it.description}</p>}
                  {it.priceGs && (
                    <p className="text-sm font-mono text-[var(--accent)] mt-2">Gs {Number(it.priceGs).toLocaleString("es-PY")}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBanner c={c} locale={locale} />
    </>
  )
}
