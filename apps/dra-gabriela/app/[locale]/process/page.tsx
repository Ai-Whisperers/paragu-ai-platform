// /en/process + /es/process — bilingual patient journey with timeline.

import { notFound } from "next/navigation"
import { Calendar, AlertTriangle, Award, MessageCircle, CalendarCheck, FileText, Activity, Clock, type LucideIcon } from "lucide-react"
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Timeline */}
          {steps.length > 0 && (
            <div className="relative mb-16">
              {/* Connecting line (desktop) */}
              <div className="absolute left-[1.625rem] top-4 bottom-4 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--gold)] to-[var(--accent-soft)] hidden md:block" />

              <ol className="space-y-5">
                {steps.map((raw: any, i: number) => {
                  const s = norm(raw)
                  const Icon = ICONS[s.icon] || Activity
                  return (
                    <li key={i} className="relative flex items-start gap-5">
                      <div className="step-number relative z-10 bg-[var(--surface)] border-4 border-[var(--bg)]">
                        {s.order || i + 1}
                      </div>
                      <div className="card-accent card p-5 flex-1">
                        <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                          <h3 className="text-lg font-medium">{s.title}</h3>
                          {s.duration && (
                            <span className="text-xs text-[var(--fg-subtle)] flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {s.duration}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{s.body}</p>
                        {s.actions && s.actions.length > 0 && (
                          <ul className="flex flex-wrap gap-2 mt-3">
                            {s.actions.map((a: string, k: number) => (
                              <li key={k} className="text-xs px-2.5 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-medium">
                                {a}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="hidden md:flex w-10 h-10 rounded-xl bg-[var(--accent-soft)] items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-[var(--gold)]" />
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          )}

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {whatToBring && (
              <div className="card p-5">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h3 className="font-medium mb-2">{isEs ? "Qué traer" : "What to bring"}</h3>
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
              <div className="card p-5">
                <div className="w-10 h-10 rounded-xl bg-[var(--gold-soft)] flex items-center justify-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-[var(--gold-2)]" />
                </div>
                <h3 className="font-medium mb-2">{isEs ? "Política de cancelación" : "Cancellation"}</h3>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{cancellation}</p>
              </div>
            )}
            {guarantee && (
              <div className="card p-5">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mb-3">
                  <Award className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h3 className="font-medium mb-2">{isEs ? "Garantía" : "Guarantee"}</h3>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{guarantee}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
