// Section: Process — proper 2-col layout with sticky numbered rail.
// Each step is a 2-col card: number+icon on left, content on right.
// Big text. Breathing room. Proper visual hierarchy.

import { notFound } from "next/navigation"
import Link from "next/link"
import {
  Calendar, AlertTriangle, Award, MessageCircle, CalendarCheck,
  FileText, Activity, Clock, CheckCircle2, ArrowRight, type LucideIcon
} from "lucide-react"
import en from "@/content/en/process.json"
import es from "@/content/es/process.json"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"
import { getContent, whatsappLink } from "@/lib/content"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

const ICONS: Record<string, LucideIcon> = {
  message: MessageCircle,
  calendar: CalendarCheck,
  calendarCheck: CalendarCheck,
  fileText: FileText,
  activity: Activity,
}

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = CONTENT[locale as keyof typeof CONTENT]
  return { title: data?.title || (locale === "es" ? "Proceso" : "Process") }
}

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const c = CONTENT[locale] || en
  const isEs = locale === "es"
  const steps: any[] = c.steps || c.pasos || []
  const whatToBring: string[] = c.what_to_bring || c.que_traer || []
  const cancellation: string = c.cancellation_policy || c.politica_cancelacion || ""
  const guarantee: string = c.guarantee || c.garantia || ""

  const norm = (s: any) => ({
    order: s.order || s.orden || s.n || 0,
    title: s.title || s.titulo || "",
    body: s.body || s.subtitle || s.subtitulo || "",
    icon: s.icon || s.icono || "",
    duration: s.duration || s.week || s.duracion || "",
    actions: s.actions || s.acciones || [],
  })

  // CTA for bottom
  const c2 = (await import("@/lib/content")).getContent(locale)
  const wa = whatsappLink(c2?.business?.whatsapp, c2?.business?.whatsappMessage)
  const base = `/${locale}`

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Cómo trabajamos" : "How we work"}
        title={c.title || (isEs ? "El proceso" : "Your journey")}
        subtitle={c.subtitle || (isEs
          ? "Cuatro pasos simples, sin sorpresas, con plan escrito."
          : "Four simple steps, no surprises, with a written plan.")}
        align="center"
        variant="default"
      />

      <section className="section bg-[var(--surface)]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {steps.length > 0 && (
            <div className="space-y-8">
              {steps.map((raw: any, i: number) => {
                const s = norm(raw)
                const Icon = ICONS[s.icon] || CheckCircle2
                return (
                  <div
                    key={i}
                    className="group relative bg-[var(--surface)] border-2 border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--accent)] hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Step number band — top */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--accent)] via-[var(--gold)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_180px] gap-0">
                      {/* Left: Big number column */}
                      <div className="bg-[var(--accent)] text-white p-6 md:p-7 flex flex-col items-center md:items-start justify-center">
                        <div className="text-6xl md:text-7xl font-medium leading-none mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                          {s.order || i + 1}
                        </div>
                        <div className="text-xs uppercase tracking-widest text-[var(--gold)] font-semibold text-center md:text-left">
                          {isEs ? `Paso ${s.order || i + 1}` : `Step ${s.order || i + 1}`}
                        </div>
                        {s.duration && (
                          <div className="mt-2 text-xs text-white/70 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {s.duration}
                          </div>
                        )}
                      </div>

                      {/* Middle: Title + body + actions */}
                      <div className="p-6 md:p-7 border-t md:border-t-0 md:border-l border-[var(--border)]">
                        <h3 className="text-xl md:text-2xl font-medium mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                          {s.title}
                        </h3>
                        <p className="text-base text-[var(--fg-muted)] leading-relaxed mb-4">
                          {s.body}
                        </p>
                        {s.actions && s.actions.length > 0 && (
                          <ul className="flex flex-wrap gap-2">
                            {s.actions.map((a: string, k: number) => (
                              <li
                                key={k}
                                className="text-xs px-2.5 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-medium border border-[var(--accent)]/20"
                              >
                                {a}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Right: Big icon */}
                      <div className="hidden md:flex items-center justify-center p-6 bg-[var(--surface-muted)]">
                        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center group-hover:bg-[var(--gold)] transition-colors duration-500">
                          <Icon className="w-8 h-8 text-[var(--accent)] group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Info cards — 3-col */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16">
            {whatToBring && whatToBring.length > 0 && (
              <div className="card p-6 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-[var(--accent)]" />
                </div>
                <h3 className="text-base font-semibold mb-3 uppercase tracking-wider text-[var(--fg-subtle)] text-xs">
                  {isEs ? "Qué traer" : "What to bring"}
                </h3>
                <ul className="space-y-2 text-sm text-[var(--fg-muted)]">
                  {whatToBring.map((w: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-2 flex-shrink-0" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {cancellation && (
              <div className="card p-6 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[var(--gold-soft)] flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-[var(--gold-2)]" />
                </div>
                <h3 className="text-base font-semibold mb-3 uppercase tracking-wider text-[var(--fg-subtle)] text-xs">
                  {isEs ? "Cancelación" : "Cancellation"}
                </h3>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{cancellation}</p>
              </div>
            )}
            {guarantee && (
              <div className="card p-6 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-[var(--accent)]" />
                </div>
                <h3 className="text-base font-semibold mb-3 uppercase tracking-wider text-[var(--fg-subtle)] text-xs">
                  {isEs ? "Garantía" : "Guarantee"}
                </h3>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{guarantee}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-sm bg-[var(--surface-muted)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl mb-4">
            {isEs ? "¿Listo para empezar?" : "Ready to begin?"}
          </h2>
          <p className="text-[var(--fg-muted)] mb-6">
            {isEs
              ? "Coordiná tu primera consulta por WhatsApp — sin compromiso."
              : "Schedule your first consultation via WhatsApp — no obligation."}
          </p>
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <MessageCircle className="w-4 h-4" />
              {isEs ? "Coordinar por WhatsApp" : "Book via WhatsApp"}
            </a>
          ) : (
            <Link href={`${base}/contact`} className="btn btn-primary">
              {isEs ? "Ver contacto" : "See contact"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </section>
    </>
  )
}
