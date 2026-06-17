// Section: Stats — trust metrics with featured treatment highlight
// The 4 stats surround a "Featured treatment" card with Gs price.

import { Award, Heart, Globe, FileText, Activity, Star, Sparkles } from "lucide-react"

const ICONS: Record<string, any> = { award: Award, heart: Heart, globe: Globe, fileText: FileText, activity: Activity, star: Star }

export function Stats({ c, locale }: { c: any; locale: string }) {
  const items: any[] = c.stats?.items || []
  const isEs = locale === "es"
  // Pick the first 4 stats
  const display = items.slice(0, 4)
  if (display.length === 0) return null

  return (
    <section className="bg-surface border-y border-border-light">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="text-center mb-10">
          <span className="eyebrow inline-flex">{isEs ? "En números" : "By the numbers"}</span>
          <h2 className="text-2xl md:text-3xl">
            {isEs ? "Veinte años de práctica" : "Twenty years in practice"}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {display.map((it: any, i: number) => {
            const Icon = ICONS[it.icon] || Award
            return (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-accent-soft flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-4xl md:text-5xl font-heading font-medium text-accent mb-1.5 leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                  {it.value}
                </div>
                <div className="text-sm text-fg-muted leading-snug max-w-[180px] mx-auto">{it.label}</div>
                {it.note && (
                  <div className="text-xs text-fg-subtle mt-1.5 italic max-w-[180px] mx-auto">{it.note}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
