// Section: Reasons — "Why us" cards
// 6 problem-aware cards linking to second-opinion page.
// Each card has icon, title, body, and a subtle hover lift.

import Link from "next/link"
import { Search, FileText, Shield, MessageCircle, Users, BarChart3, ArrowRight } from "lucide-react"

const ICONS: Record<string, any> = {
  search: Search, fileText: FileText, shield: Shield,
  messageCircle: MessageCircle, users: Users, barChart: BarChart3,
}

export function Reasons({ c, locale }: { c: any; locale: string }) {
  const items: any[] = c.reasons?.items || []
  if (items.length === 0) return null
  const target = locale === "es" ? "/es/segunda-opinion" : "/en/second-opinion"

  return (
    <section className="section">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow">{c.reasons?.eyebrow || (locale === "es" ? "Por qué elegirnos" : "Why us")}</span>
          <h2>{c.reasons?.title || (locale === "es" ? "¿Por qué este consultorio?" : "Why this practice?")}</h2>
        </div>
        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((r: any, i: number) => {
            const Icon = ICONS[r.icon] || FileText
            return (
              <Link key={i} href={target} className="card p-6 md:p-7 group block">
                <div className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center mb-5 group-hover:bg-accent transition-all duration-300">
                  <Icon className="w-5 h-5 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-heading mb-2.5 group-hover:text-accent transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                  {r.title}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed mb-5">{r.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:gap-2.5 transition-all">
                  {locale === "es" ? "Saber más" : "Learn more"} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
