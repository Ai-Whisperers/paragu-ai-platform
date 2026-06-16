// Section: Process
// 4-step horizontal timeline on desktop, vertical on mobile. Each step has
// a number, icon, title, subtitle, and duration chip.

import { MessageCircle, Calendar, FileText, Activity, Clock, CheckCircle2, type LucideIcon } from "lucide-react"

const ICONS: Record<string, LucideIcon> = { message: MessageCircle, calendar: Calendar, fileText: FileText, activity: Activity }

export function Process({ c }: { c: any }) {
  const steps: any[] = c.process?.steps || []
  if (steps.length === 0) return null
  return (
    <section className="section bg-[var(--surface-muted)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="eyebrow">{c.process?.eyebrow || "Cómo trabajamos"}</span>
          <h2 className="text-3xl md:text-4xl">{c.process?.title || "El proceso"}</h2>
          {c.process?.subtitle && <p className="text-[var(--fg-muted)] mt-3 max-w-2xl mx-auto">{c.process.subtitle}</p>}
        </div>
        <ol className="space-y-4">
          {steps.map((s: any, i: number) => {
            const Icon = ICONS[s.icon] || CheckCircle2
            return (
              <li key={s.order || i} className="card p-5 md:p-6 flex items-start gap-4 md:gap-5">
                <div className="flex-shrink-0 w-11 h-11 rounded-[var(--radius-md)] bg-[var(--accent)] text-white flex items-center justify-center font-medium text-base">
                  {s.order || i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <h3 className="text-lg">{s.title}</h3>
                    {s.duration && (
                      <span className="text-xs text-[var(--fg-subtle)] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {s.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-2">{s.subtitle}</p>
                  {s.actions && s.actions.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mt-2">
                      {s.actions.map((a: string, k: number) => (
                        <li key={k} className="text-xs px-2 py-1 bg-[var(--accent-soft)] text-[var(--accent)] rounded-md">
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Icon className="w-5 h-5 text-[var(--gold)] flex-shrink-0 hidden md:block" />
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
