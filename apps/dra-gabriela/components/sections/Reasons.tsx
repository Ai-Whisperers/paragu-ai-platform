// Section: Reasons
// "Why us" — six cards. Each card has an icon, title, body. Clicking goes to
// the second-opinion page (the primary conversion target).

import Link from "next/link"
import { Search, FileText, Shield, MessageCircle, Users, BarChart3, ArrowRight } from "lucide-react"

const ICONS: Record<string, any> = { search: Search, fileText: FileText, shield: Shield, messageCircle: MessageCircle, users: Users, barChart: BarChart3 }

export function Reasons({ c, locale }: { c: any; locale: string }) {
  const items: any[] = c.reasons?.items || []
  if (items.length === 0) return null
  const target = `${locale === "es" ? "/es/segunda-opinion" : "/en/second-opinion"}`
  return (
    <section className="section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="eyebrow">{c.reasons?.eyebrow || "Por qué elegirnos"}</span>
          <h2 className="text-3xl md:text-4xl">{c.reasons?.title || "¿Por qué este consultorio?"}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((r: any, i: number) => {
            const Icon = ICONS[r.icon] || FileText
            return (
              <Link key={i} href={target} className="card p-6 group block">
                <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--accent-soft)] flex items-center justify-center mb-4 group-hover:bg-[var(--accent)] transition-colors">
                  <Icon className="w-5 h-5 text-[var(--accent)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg mb-2">{r.title}</h3>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{r.desc}</p>
                <div className="mt-4 text-sm text-[var(--accent)] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  {locale === "es" ? "Saber más" : "Learn more"} <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
