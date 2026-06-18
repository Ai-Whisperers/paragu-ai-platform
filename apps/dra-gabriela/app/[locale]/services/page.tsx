// /en/services + /es/services — bilingual services index.

import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/seo"
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
  const isEs = locale === "es"
  return buildMetadata({
    slug: "services",
    title: data?.title ? `${data.title} · Dra. Gabriella` : (isEs ? "Servicios" : "Services"),
    description: isEs ? "Servicios dentales conservadores en Asunción: segunda opinión, planificación, odontología general, estética, rehabilitación." : "Conservative dental services in Asunción: second opinion, treatment planning, general dentistry, cosmetic, oral rehabilitation.",
    locale: isEs ? "es" : "en",
  })
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
            <Sparkles className="w-5 h-5 text-gold" />
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
                    <h3 className="text-lg font-medium group-hover:text-accent transition-colors">{b.name}</h3>
                    {b.priceGs && (
                      <span className="text-base font-mono text-accent whitespace-nowrap font-medium">
                        Gs {Number(b.priceGs).toLocaleString("es-PY")}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-fg-muted leading-relaxed mb-3">{b.description}</p>
                  <span className="text-sm font-medium text-gold flex items-center gap-1 group-hover:gap-2 transition-all">
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
                  <h3 className="text-base font-medium mb-1 group-hover:text-accent transition-colors">{t.label}</h3>
                  <p className="text-xs text-fg-subtle mb-3">{t.id?.replace(/-/g, " ")}</p>
                  <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                    {isEs ? "Ver detalle" : "View details"} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </PageSection>
      )}

      {/* Teal accent: our process, common to all services */}
      <section className="bg-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-wider text-gold font-semibold">
              {isEs ? "Cómo trabajo" : "How I work"}
            </span>
            <h2 className="text-3xl md:text-4xl text-white mt-3">
              {isEs ? "Mismo proceso, todos los servicios" : "Same process, every service"}
            </h2>
            <p className="text-white/80 mt-3">
              {isEs
                ? "Sin importar qué servicio necesitás, así es como trabajo. Lo que cambia es el alcance, no la honestidad."
                : "No matter what service you need, this is how I work. What changes is the scope, not the honesty."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { n: "01", t: isEs ? "Mensaje inicial" : "Initial message", d: isEs ? "Por WhatsApp o formulario. Te respondo en menos de 24h." : "Via WhatsApp or form. Response in under 24h." },
              { n: "02", t: isEs ? "Evaluación" : "Evaluation", d: isEs ? "Examen clínico + plan escrito con opciones y precios." : "Clinical exam + written plan with options and prices." },
              { n: "03", t: isEs ? "Decisión" : "Decisión", d: isEs ? "Vos decidís cuándo — o si — empezar." : "You decide when — or if — to start." },
              { n: "04", t: isEs ? "Tratamiento" : "Treatment", d: isEs ? "Procedimiento + seguimiento. Sin sorpresas." : "Procedure + follow-up. No surprises." },
            ].map((step) => (
              <div key={step.n} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-gold font-medium text-sm mb-2" style={{ fontFamily: "var(--font-heading)" }}>{step.n}</div>
                <div className="text-white font-medium mb-1.5">{step.t}</div>
                <div className="text-sm text-white/70 leading-relaxed">{step.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
