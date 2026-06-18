// /en/pricing + /es/precios — bilingual pricing with grouped categories.
// Uses 2-col grid layout to avoid the "flat list of 11 H2s" problem.

import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/seo"
import Link from "next/link"
import { MessageCircle, Clock, CheckCircle2, Sparkles, Tag } from "lucide-react"
import en from "@/content/en/pricing.json"
import es from "@/content/es/precios.json"
import { getContent, whatsappLink } from "@/lib/content"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

const CATEGORY_TITLES_EN: Record<string, { title: string; subtitle: string; icon: any }> = {
  consultation: { title: "Consultation", subtitle: "First visit and assessments", icon: MessageCircle },
  second_opinion: { title: "Second Opinion", subtitle: "Written reviews", icon: CheckCircle2 },
  treatment_planning: { title: "Treatment Planning", subtitle: "Comprehensive plans", icon: Tag },
  complex_planning: { title: "Complex Planning", subtitle: "Multi-phase cases", icon: Tag },
  preventive: { title: "Preventive", subtitle: "Cleaning & prophylaxis", icon: Sparkles },
  operatoria: { title: "Operative (Fillings)", subtitle: "Restorations", icon: Tag },
  endodoncia: { title: "Endodontics", subtitle: "Root canals", icon: Tag },
  exodoncia: { title: "Extractions", subtitle: "Surgical removals", icon: Tag },
  protesis: { title: "Prosthesis", subtitle: "Crowns, bridges", icon: Tag },
  implantes: { title: "Implants", subtitle: "Implant placement", icon: Tag },
  estetica: { title: "Aesthetic", subtitle: "Veneers, whitening", icon: Sparkles },
  odontopediatria: { title: "Pediatric", subtitle: "Children's care", icon: Tag },
}
const CATEGORY_TITLES_ES: Record<string, { title: string; subtitle: string; icon: any }> = {
  consultation: { title: "Consulta", subtitle: "Primera visita y evaluación", icon: MessageCircle },
  second_opinion: { title: "Segunda Opinión", subtitle: "Revisión escrita", icon: CheckCircle2 },
  treatment_planning: { title: "Planificación", subtitle: "Planes integrales", icon: Tag },
  complex_planning: { title: "Planificación Compleja", subtitle: "Casos multifase", icon: Tag },
  preventive: { title: "Preventivo", subtitle: "Limpieza y profilaxis", icon: Sparkles },
  operatoria: { title: "Operatoria", subtitle: "Restauraciones", icon: Tag },
  endodoncia: { title: "Endodoncia", subtitle: "Conductos", icon: Tag },
  exodoncia: { title: "Exodoncias", subtitle: "Extracciones quirúrgicas", icon: Tag },
  protesis: { title: "Prótesis", subtitle: "Coronas, puentes", icon: Tag },
  implantes: { title: "Implantes", subtitle: "Colocación de implantes", icon: Tag },
  estetica: { title: "Estética", subtitle: "Carillas, blanqueamiento", icon: Sparkles },
  odontopediatria: { title: "Odontopediatría", subtitle: "Atención infantil", icon: Tag },
}

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = CONTENT[locale as keyof typeof CONTENT]
  const isEs = locale === "es"
  return buildMetadata({
    slug: "pricing",
    title: data?.title ? `${data.title} · Dra. Gabriella` : (isEs ? "Precios" : "Pricing"),
    description: isEs ? "Precios públicos de servicios dentales en Asunción. Consulta desde Gs 300.000, segunda opinión, planificación y tratamientos." : "Published dental service pricing in Asunción. Consultation from Gs 300,000, second opinion, treatment planning and procedures.",
    locale: isEs ? "es" : "en",
  })
}

export default async function Pricing({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const p = c.pricing || {}
  const titles = locale === "es" ? CATEGORY_TITLES_ES : CATEGORY_TITLES_EN
  const categoryOrder = [
    "consultation", "second_opinion", "treatment_planning", "complex_planning",
    "preventive", "operatoria", "endodoncia", "exodoncia",
    "protesis", "implantes", "estetica", "odontopediatria",
  ]
  const isEs = locale === "es"
  const c2 = getContent(locale)
  const wa = whatsappLink(c2.business?.whatsapp, c2.business?.whatsappMessage)

  // Filter to only categories that have items
  const visible = categoryOrder.filter((k) => {
    const items = p[k]
    return items && Array.isArray(items) && items.length > 0 && titles[k]
  })

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Precios" : "Pricing"}
        title={c.title || (isEs ? "Precios" : "Pricing")}
        subtitle={c.metaDescription}
        variant="default"
        align="center"
      />

      {/* Currency / disclaimer note */}
      {p.usd_approx && (
        <div className="bg-surface border-b border-border-light">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center text-sm text-fg-muted">
            {isEs ? "Referencia" : "Reference"}: <span className="font-mono text-accent">{p.usd_approx}</span>
            {p.disclaimer && <span className="block text-xs text-fg-subtle mt-1 italic">{p.disclaimer}</span>}
          </div>
        </div>
      )}

      {/* Sticky jump-nav for the 11 categories */}
      {visible.length > 4 && (
        <div className="sticky top-16 md:top-20 z-30 bg-surface/85 backdrop-blur-md border-b border-border-light">
          <nav
            aria-label={isEs ? "Categorías" : "Pricing categories"}
            className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3"
          >
            <ul className="flex gap-2 overflow-x-auto scrollbar-thin">
              {visible.map((key) => {
                const meta = titles[key]
                const Icon = meta.icon
                return (
                  <li key={key} className="flex-shrink-0">
                    <a
                      href={`#cat-${key}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full text-fg-muted hover:text-fg hover:bg-surface-muted transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {meta.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {visible.map((key) => {
            const items = p[key]
            const meta = titles[key]
            const Icon = meta.icon
            return (
              <div key={key} id={`cat-${key}`} className="card-accent card p-6 md:p-7 hover:shadow-lg transition-shadow scroll-mt-32">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-medium" style={{ fontFamily: "var(--font-heading)" }}>
                      {meta.title}
                    </h2>
                    <p className="text-xs text-fg-subtle uppercase tracking-wider mt-0.5">{meta.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-2.5 border-t border-border-light pt-4">
                  {items.map((it: any, i: number) => (
                    <li key={i} className="flex flex-wrap items-baseline justify-between gap-2 py-1.5">
                      <div className="flex-1 min-w-[200px]">
                        <div className="text-sm font-medium text-fg">{it.name}</div>
                        {it.duration && (
                          <div className="text-xs text-fg-subtle mt-0.5 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {it.duration}
                          </div>
                        )}
                        {it.note && <div className="text-xs text-fg-muted mt-0.5">{it.note}</div>}
                      </div>
                      {it.price ? (
                        <div className="text-base font-mono text-accent font-medium whitespace-nowrap">
                          Gs {Number(it.price).toLocaleString("es-PY")}
                        </div>
                      ) : it.priceText ? (
                        <div className="text-xs text-fg-muted whitespace-nowrap">{it.priceText}</div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Corporate note */}
        {p.corporate_note && (
          <div className="mt-12 card-accent card p-6 md:p-8">
            <span className="eyebrow inline-flex">{isEs ? "Empresas" : "Corporate"}</span>
            <h2 className="text-xl mb-2 mt-2">{isEs ? "Convenios corporativos" : "Corporate agreements"}</h2>
            <p className="text-fg-muted leading-relaxed">{p.corporate_note}</p>
          </div>
        )}

        {/* Payment options */}
        {p.payment && Array.isArray(p.payment) && p.payment.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl mb-4">{isEs ? "Opciones de pago" : "Payment options"}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {p.payment.map((opt: string, i: number) => (
                <div key={i} className="card p-3 flex items-center gap-2.5 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center flex-shrink-0">
                    <Tag className="w-4 h-4 text-accent" />
                  </div>
                  <span>{opt}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* How pricing works — teal accent block */}
      <section className="bg-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 items-start">
            <div>
              <span className="text-xs uppercase tracking-wider text-gold font-semibold">
                {isEs ? "Cómo funcionan los precios" : "How pricing works"}
              </span>
              <h2 className="text-3xl md:text-4xl text-white mt-3 leading-tight">
                {isEs ? "Precios públicos, sin sorpresas" : "Published prices, no surprises"}
              </h2>
            </div>
            <div className="space-y-4 text-white/90 leading-relaxed">
              <p>
                {isEs
                  ? "Publicamos precios de referencia para que sepas qué esperar antes de la consulta. El costo final depende de tu caso específico, pero nunca te cobramos de más por un procedimiento que no necesitás."
                  : "We publish reference prices so you know what to expect before the visit. The final cost depends on your specific case, but we never charge extra for a procedure you don't need."}
              </p>
              <p>
                {isEs
                  ? "Si después del diagnóstico necesitás algo distinto a lo que esperabas, te lo digo antes de continuar. Sin presión para aceptar. Sin sorpresas al final."
                  : "If after the diagnosis you need something different from what you expected, I'll tell you before continuing. No pressure to accept. No end-of-treatment surprises."}
              </p>
              <p className="text-sm text-white/70 pt-2 border-t border-white/10">
                {isEs
                  ? "Cada consulta incluye examen + diagnóstico + plan escrito con opciones y precios. No se inicia ningún tratamiento sin tu aprobación."
                  : "Every consultation includes exam + diagnosis + written plan with options and prices. No treatment starts without your approval."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-accent card p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl mb-3">
              {isEs ? "¿Listo para coordinar tu consulta?" : "Ready to schedule?"}
            </h2>
            <p className="text-fg-muted mb-6 max-w-lg mx-auto">
              {isEs
                ? "Los precios publicados son referenciales. Costo final confirmado en consulta antes de cualquier procedimiento."
                : "Published prices are reference values. Final cost confirmed at consultation before any procedure."}
            </p>
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <MessageCircle className="w-4 h-4" />
                {isEs ? "Pedir presupuesto" : "Request a quote"}
              </a>
            ) : (
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                <MessageCircle className="w-4 h-4" />
                {isEs ? "Ver datos de contacto" : "See contact details"}
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
