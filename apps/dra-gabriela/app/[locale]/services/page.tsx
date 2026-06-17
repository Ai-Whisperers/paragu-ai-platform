// /en/services + /es/services — bilingual services index.

import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import en from "@/content/en/services/index.json"
import es from "@/content/es/services/index.json"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

const SLUG_TO_ROUTE: Record<string, { es: string; en: string }> = {
  "segunda-opinion": { es: "/es/second-opinion", en: "/en/second-opinion" },
  "second-opinion": { es: "/es/second-opinion", en: "/en/second-opinion" },
  "planificacion-tratamiento": { es: "/es/services/treatment-planning", en: "/en/services/treatment-planning" },
  "treatment-planning": { es: "/es/services/treatment-planning", en: "/en/services/treatment-planning" },
  "odontologia-general": { es: "/es/services/general-dentistry", en: "/en/services/general-dentistry" },
  "general-dentistry": { es: "/es/services/general-dentistry", en: "/en/services/general-dentistry" },
  "estetica-dental": { es: "/es/services/cosmetic-dentistry", en: "/en/services/cosmetic-dentistry" },
  "cosmetic-dentistry": { es: "/es/services/cosmetic-dentistry", en: "/en/services/cosmetic-dentistry" },
  "rehabilitacion-oral": { es: "/es/services/oral-rehabilitation", en: "/en/services/oral-rehabilitation" },
  "oral-rehabilitation": { es: "/es/services/oral-rehabilitation", en: "/en/services/oral-rehabilitation" },
}

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = CONTENT[locale as keyof typeof CONTENT]
  return { title: data?.title || (locale === "es" ? "Servicios" : "Services") }
}

export default async function Services({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const isEs = locale === "es"
  const tabs: any[] = c.tabs || []
  const bundles: any[] = c.bundles || []

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Servicios" : "Services"}
        title={c.title || (isEs ? "Servicios" : "Services")}
        subtitle={c.subtitle}
        variant="default"
        align="center"
      />

      {/* Bundles */}
      {bundles.length > 0 && (
        <PageSection layout="wide" py="md">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-[var(--gold)]" />
            <h2 className="text-xl">{isEs ? "Paquetes" : "Bundles"}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {bundles.map((b: any) => {
              const slug = locale === "es"
                ? b.link?.replace(/^\/en/, "/es")?.replace("/es/services/", "/es/servicios/")
                : b.link?.replace(/^\/es/, "/en")
              return (
                <Link key={b.id} href={slug || "#"} className="card-accent card p-6 group block hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-medium group-hover:text-[var(--accent)] transition-colors">{b.name}</h3>
                    {b.priceGs && (
                      <span className="text-base font-mono text-[var(--accent)] whitespace-nowrap font-medium">
                        Gs {Number(b.priceGs).toLocaleString("es-PY")}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-3">{b.description}</p>
                  <span className="text-sm font-medium text-[var(--gold)] flex items-center gap-1 group-hover:gap-2 transition-all">
                    {isEs ? "Conocer" : "Learn more"} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </PageSection>
      )}

      {/* All services tabs */}
      {tabs.length > 0 && (
        <PageSection layout="wide" py="md" bg="muted">
          <h2 className="text-xl mb-5">{isEs ? "Todos los servicios" : "All services"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tabs.map((t: any) => {
              const route = SLUG_TO_ROUTE[t.id]
              const href = route ? (locale === "es" ? route.es : route.en) : `/${locale}/services#${t.id}`
              return (
                <Link key={t.id} href={href} className="card-accent card p-5 group block hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <h3 className="text-base font-medium mb-1 group-hover:text-[var(--accent)] transition-colors">{t.label}</h3>
                  <p className="text-xs text-[var(--fg-subtle)] mb-3">{t.id?.replace(/-/g, " ")}</p>
                  <span className="text-sm font-medium text-[var(--accent)] flex items-center gap-1 group-hover:gap-2 transition-all">
                    {isEs ? "Ver detalle" : "View details"} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </PageSection>
      )}
    </>
  )
}
