import { notFound } from "next/navigation"
import { Calendar, Tag, GitCommit, AlertCircle, Lightbulb, ExternalLink } from "lucide-react"
import enDecisions from "@/content/en/decisions.json"
import esDecisions from "@/content/es/decisions.json"
import nlDecisions from "@/content/nl/decisions.json"
import ptDecisions from "@/content/pt/decisions.json"

const LOCALES = ["en", "es", "nl", "pt"] as const
const DECISIONS: Record<string, any> = {
  en: enDecisions,
  es: esDecisions,
  nl: nlDecisions,
  pt: ptDecisions,
}

export function generateStaticParams() {
  return LOCALES.map(l => ({ lang: l }))
}

export const metadata = { title: "Decisions" }

export default async function Decisions({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!LOCALES.includes(lang as any)) notFound()
  const d = DECISIONS[lang] || enDecisions
  const base = `/${lang}`

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl sm:text-6xl font-extrabold mb-3 tracking-tight">{d.title}</h1>
      <p className="text-lg text-fg-muted mb-12 leading-relaxed">{d.subtitle}</p>

      {d.intro && (
        <section className="mb-12 p-6 bg-bg-elev border border-border rounded-xl">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" />
            {d.intro.title}
          </h2>
          <p className="text-fg-muted leading-relaxed">{d.intro.body}</p>
        </section>
      )}

      <div className="space-y-6">
        {(d.items || []).map((item: any) => (
          <article key={item.id} className="p-6 bg-bg-elev border border-border rounded-xl hover:border-accent/50 transition-colors">
            <div className="flex items-center gap-3 text-xs text-fg-muted mb-3">
              <Calendar className="w-3 h-3" />
              <time>{item.date}</time>
              {item.tags && item.tags.map((t: string) => (
                <span key={t} className="px-2 py-0.5 bg-bg border border-border rounded text-xs">{t}</span>
              ))}
            </div>
            <h2 className="text-2xl font-bold mb-3">{item.title}</h2>

            <div className="mb-4">
              <div className="text-xs uppercase tracking-wider text-accent font-bold mb-1">Decision</div>
              <p className="text-fg leading-relaxed font-medium">{item.decision}</p>
            </div>

            <div className="mb-4">
              <div className="text-xs uppercase tracking-wider text-fg-muted font-bold mb-1">Reasoning</div>
              <p className="text-fg-muted leading-relaxed text-sm">{item.reasoning}</p>
            </div>

            {item.alternatives && (
              <div className="mb-4">
                <div className="text-xs uppercase tracking-wider text-fg-muted font-bold mb-1">Alternatives considered</div>
                {item.alternatives.considered && (
                  <div className="mb-2">
                    <span className="text-xs text-fg-muted/70">Considered: </span>
                    {item.alternatives.considered.map((alt: string, i: number) => (
                      <span key={alt} className="inline-block px-2 py-0.5 bg-bg border border-border rounded text-xs mr-1 mb-1">{alt}</span>
                    ))}
                  </div>
                )}
                {item.alternatives.rejected && (
                  <p className="text-fg-muted text-sm italic">{item.alternatives.rejected}</p>
                )}
              </div>
            )}

            {(item.what_went_wrong || item.what_we_learned) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-border">
                {item.what_went_wrong && (
                  <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-red-400 font-bold mb-1">
                      <AlertCircle className="w-3 h-3" /> What went wrong
                    </div>
                    <p className="text-fg-muted text-xs leading-relaxed">{item.what_went_wrong}</p>
                  </div>
                )}
                {item.what_we_learned && (
                  <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-green-400 font-bold mb-1">
                      <Lightbulb className="w-3 h-3" /> What we learned
                    </div>
                    <p className="text-fg-muted text-xs leading-relaxed">{item.what_we_learned}</p>
                  </div>
                )}
              </div>
            )}
          </article>
        ))}
      </div>

      {d.cta && (
        <div className="mt-12 p-8 bg-gradient-to-br from-accent/10 to-accent-3/10 border border-accent/30 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">{d.cta.title}</h2>
          <p className="text-fg-muted mb-4">{d.cta.body}</p>
          <a href={`${base}/changelog`} className="inline-flex items-center gap-2 text-accent hover:text-accent-2 font-medium">
            <GitCommit className="w-4 h-4" /> View the build changelog <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  )
}
