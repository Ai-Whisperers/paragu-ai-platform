// /en/process + /es/process — bilingual patient journey with timeline.

import { notFound } from "next/navigation"
import { Calendar, AlertTriangle, Award, MessageCircle, CalendarCheck, FileText, Activity, Clock, CheckCircle2, type LucideIcon } from "lucide-react"
import en from "@/content/en/process.json"
import es from "@/content/es/process.json"
import { PageHero } from "@/components/PageHero"

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

      <section className="section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Timeline — 2-column: numbers left, content right */}
          {steps.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
              {/* Left rail: vertical numbered list */}
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <div className="text-xs uppercase tracking-widest text-[var(--fg-subtle)] font-semibold mb-4">
                    {isEs ? "Pasos" : "Steps"}
                  </div>
                  <ol className="space-y-3">
                    {steps.map((raw: any, i: number) => {
                      const s = norm(raw)
                      const Icon = ICONS[s.icon] || CheckCircle2
                      return (
                        <li key={i} className="flex items-center gap-3 group cursor-default">
                          <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] font-medium flex items-center justify-center text-sm group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                            {s.order || i + 1}
                          </span>
                          <span className="text-sm font-medium text-[var(--fg)] leading-tight">{s.title}</span>
                          <Icon className="w-3.5 h-3.5 text-[var(--gold)] ml-auto" />
                        </li>
                      )
                    })}
                  </ol>
                </div>
              </div>

              {/* Right: step details */}
              <div className="relative">
                {/* Connecting line on mobile */}
                <div className="absolute left-[1.375rem] top-4 bottom-4 w-px bg-[var(--border)] lg:hidden" />

                <ol className="space-y-6">
                  {steps.map((raw: any, i: number) => {
                    const s = norm(raw)
                    const Icon = ICONS[s.icon] || CheckCircle2
                    return (
                      <li key={i} className="relative flex items-start gap-5 group">
                        {/* Mobile number */}
                        <div className="lg:hidden step-number relative z-10 flex-shrink-0 bg-[var(--surface)] border-4 border-[var(--bg)]">
                          {s.order || i + 1}
                        </div>
                        <div className="card-accent card p-6 flex-1 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                          <div className="flex flex-wrap items-baseline gap-3 mb-2">
                            <h3 className="text-xl font-medium" style={{ fontFamily: "var(--font-heading)" }}>
                              {s.title}
                            </h3>
                            <span className="text-xs text-[var(--fg-subtle)] flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {s.duration}
                            </span>
                          </div>
                          <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-3">{s.body}</p>
                          {s.actions && s.actions.length > 0 && (
                            <ul className="flex flex-wrap gap-2">
                              {s.actions.map((a: string, k: number) => (
                                <li key={k} className="text-xs px-2.5 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-medium">
                                  {a}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        {/* Desktop icon indicator */}
                        <div className="hidden lg:flex w-12 h-12 rounded-xl bg-[var(--accent-soft)] items-center justify-center flex-shrink-0 group-hover:bg-[var(--gold)] transition-colors duration-300">
                          <Icon className="w-5 h-5 text-[var(--gold)] group-hover:text-white transition-colors" />
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </div>
          )}

          {/* Info cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            {whatToBring && (
              <div className="card p-5 hover:-translate-y-0.5 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h3 className="font-medium mb-2 text-sm uppercase tracking-wider text-[var(--fg-subtle)]">
                  {isEs ? "Qué traer" : "What to bring"}
                </h3>
                {Array.isArray(whatToBring) ? (
                  <ul className="space-y-1.5 text-sm text-[var(--fg-muted)]">
                    {whatToBring.map((w: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[var(--gold)] mt-2 flex-shrink-0" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[var(--fg-muted)]">{whatToBring}</p>
                )}
              </div>
            )}
            {cancellation && (
              <div className="card p-5 hover:-translate-y-0.5 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-[var(--gold-soft)] flex items-center justify-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-[var(--gold-2)]" />
                </div>
                <h3 className="font-medium mb-2 text-sm uppercase tracking-wider text-[var(--fg-subtle)]">
                  {isEs ? "Cancelación" : "Cancellation"}
                </h3>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{cancellation}</p>
              </div>
            )}
            {guarantee && (
              <div className="card p-5 hover:-translate-y-0.5 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mb-3">
                  <Award className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h3 className="font-medium mb-2 text-sm uppercase tracking-wider text-[var(--fg-subtle)]">
                  {isEs ? "Garantía" : "Guarantee"}
                </h3>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{guarantee}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
