// Section: Stats
// Renders the four/five trust stats. "verified" and "source" fields are kept in
// the data for future per-stat footnote. If the JSON is empty, the section
// hides itself entirely (no empty bar).

import { Award, Heart, Globe, FileText, Activity, Star } from "lucide-react"

const ICONS: Record<string, any> = { award: Award, heart: Heart, globe: Globe, fileText: FileText, activity: Activity, star: Star }

export function Stats({ c }: { c: any }) {
  const items: any[] = c.stats?.items || []
  if (items.length === 0) return null
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((it: any, i: number) => {
            const Icon = ICONS[it.icon] || Award
            return (
              <div key={i} className="text-center md:text-left">
                <Icon className="w-5 h-5 text-[var(--gold)] mb-2 mx-auto md:mx-0" />
                <div className="text-3xl md:text-4xl font-medium text-[var(--accent)] mb-1">{it.value}</div>
                <div className="text-sm text-[var(--fg-muted)]">{it.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
