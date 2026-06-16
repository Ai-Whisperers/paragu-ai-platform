// Section: Stats — trust metrics
// Clean, spacious number grid. "verified" and "source" are hidden but kept
// in the data for future footnotes. If zero items, section is hidden.

import { Award, Heart, Globe, FileText, Activity, Star } from "lucide-react"

const ICONS: Record<string, any> = { award: Award, heart: Heart, globe: Globe, fileText: FileText, activity: Activity, star: Star }

export function Stats({ c }: { c: any }) {
  const items: any[] = c.stats?.items || []
  if (items.length === 0) return null
  return (
    <section className="bg-[var(--surface)] border-y border-[var(--border-light)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          {items.map((it: any, i: number) => {
            const Icon = ICONS[it.icon] || Award
            return (
              <div key={i} className="text-center group">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--accent)] transition-colors duration-300">
                  <Icon className="w-5 h-5 text-[var(--accent)] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-4xl md:text-5xl font-heading font-medium text-[var(--accent)] mb-1 leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                  {it.value}
                </div>
                <div className="text-sm text-[var(--fg-muted)] leading-snug">{it.label}</div>
                {it.note && (
                  <div className="text-xs text-[var(--fg-subtle)] mt-1.5 italic">{it.note}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
