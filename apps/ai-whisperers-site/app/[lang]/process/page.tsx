import { getContent } from "@/lib/utils"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"
import { Clock } from "lucide-react"

const LOCALES = ["en", "es", "nl", "pt"] as const
const CONTENT: Record<string, any> = { en, es, nl: en, pt: en }

export function generateStaticParams() {
  return LOCALES.map(l => ({ lang: l }))
}

export const metadata = { title: "How we work" }

export default function Process({ params }: { params: { lang: string } }) {
  const c = CONTENT[params.lang] || en
  const p = c.process

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold mb-3">{p.title}</h1>
        <p className="text-fg-muted text-lg max-w-2xl mx-auto">{p.subtitle}</p>
      </div>

      <div className="space-y-4">
        {p.steps.map((s: any) => (
          <div key={s.n} className="flex gap-6 p-6 bg-bg-elev border border-border rounded-xl">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-3 flex items-center justify-center text-white font-bold text-2xl">
              {s.n}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <h3 className="text-xl font-bold">{s.title}</h3>
                <span className="text-xs px-2 py-1 bg-accent/10 border border-accent/30 text-accent rounded font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {s.week}
                </span>
              </div>
              <p className="text-fg-muted leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-gradient-to-br from-accent/10 to-accent-3/10 border border-accent/30 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-3">This is the default</h2>
        <p className="text-fg-muted max-w-2xl mx-auto">
          Every engagement follows this 4-phase flow. Larger projects add steps, smaller projects compress them. But the cadence is the same: <strong>audit first, prototype fast, deploy carefully, support long-term.</strong>
        </p>
      </div>
    </div>
  )
}
