import { ArrowRight } from "lucide-react"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"

const LOCALES = ["en", "es", "nl", "pt"] as const
const CONTENT: Record<string, any> = { en, es, nl: en, pt: en }

export function generateStaticParams() { return LOCALES.map(l => ({ lang: l })) }

export const metadata = { title: "Portfolio" }

export default function Portfolio({ params }: { params: { lang: string } }) {
  const c = CONTENT[params.lang] || en
  const cases = c.caseStudies
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold mb-3">{cases.title}</h1>
        <p className="text-fg-muted text-lg">Every project has a public GitHub repo. Click through to see the code.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases.items.map((cs: any) => (
          <a key={cs.title} href={cs.url} target="_blank" rel="noopener noreferrer" className="group p-6 bg-bg-elev border border-border rounded-xl hover:border-accent/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs text-fg-muted font-mono uppercase tracking-wider">{cs.tier}</span>
                <h3 className="text-2xl font-bold mt-1">{cs.title}</h3>
                <p className="text-fg-muted">{cs.subtitle}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-fg-muted group-hover:text-accent flex-shrink-0" />
            </div>
            <p className="text-fg-muted mb-4 leading-relaxed">{cs.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {cs.stack.map((s: string) => (
                <span key={s} className="px-2 py-0.5 bg-bg border border-border rounded text-xs font-mono text-fg-muted">{s}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
