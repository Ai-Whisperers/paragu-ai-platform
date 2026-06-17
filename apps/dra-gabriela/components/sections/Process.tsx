// Section: Process — 4-step patient journey
// Vertical timeline with connecting line between steps.

import { MessageCircle, Calendar, FileText, Activity, CheckCircle2, Clock, type LucideIcon } from "lucide-react"

const ICONS: Record<string, LucideIcon> = { message: MessageCircle, calendar: Calendar, fileText: FileText, activity: Activity }

export function Process({ c, locale }: { c: any; locale: string }) {
  const steps: any[] = c.process?.steps || c.process?.pasos || []
  if (steps.length === 0) return null
  const isEs = locale === "es"

  // Normalise ES/EN key differences
  const normalise = (s: any) => ({
    order: s.order || s.orden || 0,
    title: s.title || s.titulo || "",
    subtitle: s.subtitle || s.subtitulo || "",
    icon: s.icon || s.icono || "",
    duration: s.duration || s.duracion || "",
    actions: s.actions || s.acciones || [],
  })

  return (
    <section className="section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="eyebrow">{c.process?.eyebrow || (isEs ? "Cómo trabajamos" : "Our process")}</span>
          <h2>{c.process?.title || (isEs ? "El proceso" : "Your journey")}</h2>
          {c.process?.subtitle && <p className="text-fg-muted text-lg mt-3">{c.process.subtitle}</p>}
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[1.375rem] top-0 bottom-0 w-px bg-border hidden md:block" />

          <ol className="space-y-8 md:space-y-0">
            {steps.map((raw: any, i: number) => {
              const s = normalise(raw)
              const Icon = ICONS[s.icon] || CheckCircle2
              const isLast = i === steps.length - 1
              return (
                <li key={s.order || i} className="md:flex md:items-start md:gap-6 md:pb-8 relative">
                  {/* Step number (desktop) */}
                  <div className="hidden md:flex md:flex-col md:items-center">
                    <div className={`step-number relative z-10 ${isLast ? "" : ""}`}>
                      {s.order || i + 1}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="card p-6 md:p-7">
                      {/* Mobile number + title row */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="md:hidden step-number w-9 h-9 text-sm">
                          {s.order || i + 1}
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-heading" style={{ fontFamily: "var(--font-heading)" }}>
                            {s.title}
                          </h3>
                          {s.duration && (
                            <span className="text-xs text-fg-subtle flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3" /> {s.duration}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="md:ml-0">
                        <p className="text-sm text-fg-muted leading-relaxed">{s.subtitle}</p>
                        {s.actions && s.actions.length > 0 && (
                          <ul className="flex flex-wrap gap-2 mt-3">
                            {s.actions.map((a: string, k: number) => (
                              <li key={k} className="text-xs px-2.5 py-1 rounded-full bg-accent-soft text-accent font-medium">
                                {a}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="hidden md:flex md:items-center md:justify-center md:w-12 md:h-12 md:rounded-xl md:bg-accent-soft md:flex-shrink-0">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
