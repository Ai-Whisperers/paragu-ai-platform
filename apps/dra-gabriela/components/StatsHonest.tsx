// Stats section — only shows VERIFIED data. No fake numbers.
// Each stat has a `verified` flag; unverified ones are filtered out.

import { Award, Globe, FileText } from "lucide-react"

interface Stat {
  label: string
  value: string
  icon?: string
  verified?: boolean
  source?: string
}

const ICON_MAP: Record<string, any> = {
  award: Award,
  globe: Globe,
  fileText: FileText,
  heart: Award,
  activity: Award,
}

export function StatsHonest({ items }: { items: Stat[] }) {
  if (!items || items.length === 0) return null

  // Filter to verified only — no fake numbers
  const verified = items.filter(s => s.verified === true)

  if (verified.length === 0) {
    return null
  }

  return (
    <section className="py-10 md:py-12 bg-surface-muted/40 border-y border-border-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {verified.map((stat, i) => {
            const Icon = stat.icon && ICON_MAP[stat.icon] ? ICON_MAP[stat.icon] : Award
            return (
              <div key={i} className="text-center">
                <Icon className="w-6 h-6 mx-auto mb-2 text-accent" aria-hidden="true" />
                <div className="text-3xl md:text-4xl font-bold text-fg mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-fg-muted">
                  {stat.label}
                </div>
                {stat.source && (
                  <div className="text-[10px] text-fg-subtle mt-1 uppercase tracking-wider">
                    {stat.source}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
