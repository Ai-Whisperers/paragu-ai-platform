// Pricing page — visual hierarchy with category cards, badge, currency, and CTA.

import { notFound } from "next/navigation"
import { MessageCircle, Clock, CheckCircle2, Sparkles, Tag } from "lucide-react"
import Link from "next/link"
import en from "@/content/en/pricing.json"
import es from "@/content/es/precios.json"
import { getContent, whatsappLink } from "@/lib/content"
import { PageHero } from "@/components/PageHero"

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
  return { title: data?.title || (locale === "es" ? "Precios" : "Pricing") }
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
        <div className="bg-[var(--surface)] border-y border-[var(--border-light)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center text-sm text-[var(--fg-muted)]">
            {isEs ? "Referencia" : "Reference"}: <span className="font-mono text-[var(--accent)]">{p.usd_approx}</span>
            {p.disclaimer && <span className="block text-xs text-[var(--fg-subtle)] mt-1 italic">{p.disclaimer}</span>}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {categoryOrder.map((key) => {
          const items = p[key]
          if (!items || !Array.isArray(items) || items.length === 0) return null
          const meta = titles[key]
          if (!meta) return null
          const Icon = meta.icon
          return (
            <section key={key}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <h2 className="text-2xl">{meta.title}</h2>
                  <p className="text-sm text-[var(--fg-subtle)]">{meta.subtitle}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((it: any, i: number) => (
                  <div key={i} className="card p-4 flex flex-wrap items-baseline justify-between gap-3">
                    <div className="flex-1 min-w-[200px]">
                      <h3 className="font-medium text-[var(--fg)]">{it.name}</h3>
                      {it.duration && (
                        <p className="text-xs text-[var(--fg-subtle)] mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {it.duration}
                        </p>
                      )}
                      {it.note && <p className="text-xs text-[var(--fg-muted)] mt-1">{it.note}</p>}
                    </div>
                    <div className="text-right">
                      {it.price ? (
                        <div className="text-lg font-medium text-[var(--accent)]">
                          Gs {Number(it.price).toLocaleString("es-PY")}
                        </div>
                      ) : it.priceText ? (
                        <div className="text-sm text-[var(--fg-muted)]">{it.priceText}</div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}

        {/* Corporate note */}
        {p.corporate_note && (
          <section className="card-accent card p-6 md:p-8">
            <span className="eyebrow inline-flex">{isEs ? "Empresas" : "Corporate"}</span>
            <h2 className="text-xl mb-2">{isEs ? "Convenios corporativos" : "Corporate agreements"}</h2>
            <p className="text-[var(--fg-muted)] leading-relaxed">{p.corporate_note}</p>
          </section>
        )}

        {/* Payment options */}
        {p.payment && Array.isArray(p.payment) && p.payment.length > 0 && (
          <section>
            <h2 className="text-2xl mb-5">{isEs ? "Opciones de pago" : "Payment options"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {p.payment.map((opt: string, i: number) => (
                <div key={i} className="card p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center flex-shrink-0">
                    <Tag className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <span className="text-sm">{opt}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* CTA */}
      <section className="section-sm bg-[var(--surface)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-accent card p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl mb-3">
              {isEs ? "¿Listo para coordinar tu consulta?" : "Ready to schedule?"}
            </h2>
            <p className="text-[var(--fg-muted)] mb-6 max-w-lg mx-auto">
              {isEs
                ? "Los precios publicados son referenciales. Costo final confirmado en consulta antes de cualquier procedimiento."
                : "Published prices are reference values. Final cost confirmed at consultation before any procedure."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
        </div>
      </section>
    </>
  )
}
