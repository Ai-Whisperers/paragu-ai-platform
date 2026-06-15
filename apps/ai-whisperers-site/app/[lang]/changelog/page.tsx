import { getContent } from "@/lib/utils"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"
import { Calendar, Tag, ExternalLink } from "lucide-react"

const LOCALES = ["en", "es", "nl", "pt"] as const
const CONTENT: Record<string, any> = { en, es, nl: en, pt: en }

export function generateStaticParams() {
  return LOCALES.map(l => ({ lang: l }))
}

export const metadata = { title: "Changelog" }

export default async function Changelog({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = CONTENT[lang] || en
  const cl = c.changelog

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold mb-3">{cl.title}</h1>
        <p className="text-fg-muted text-lg max-w-2xl mx-auto">{cl.subtitle}</p>
      </div>

      <div className="space-y-4">
        {cl.items.map((it: any, i: number) => (
          <article key={i} className="bg-bg-elev border border-border rounded-xl p-6 hover:border-accent/50 transition-colors">
            <div className="flex items-center gap-2 mb-3 text-xs text-fg-muted">
              <Calendar className="w-3 h-3" />
              <time>{it.date}</time>
              {it.tags?.map((t: string) => (
                <span key={t} className="px-2 py-0.5 bg-bg border border-border rounded text-xs">
                  {t}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold mb-2">{it.title}</h3>
            <p className="text-sm text-fg-muted leading-relaxed mb-3">{it.body}</p>
            {it.link && (
              <a href={it.link} className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-2 font-medium">
                Read more <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
