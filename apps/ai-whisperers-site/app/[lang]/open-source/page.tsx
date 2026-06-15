import { Github, ExternalLink, Sparkles } from "lucide-react"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"

const LOCALES = ["en", "es", "nl", "pt"] as const
const CONTENT: Record<string, any> = { en, es, nl: en, pt: en }

export function generateStaticParams() { return LOCALES.map(l => ({ lang: l })) }

export const metadata = { title: "Open Source" }

export default async function OpenSource({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = CONTENT[lang] || en
  const oss = c.openSource
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold mb-3">{oss.title}</h1>
        <p className="text-fg-muted text-lg max-w-2xl mx-auto">{oss.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {oss.items.map((it: any) => (
          <a key={it.name} href={it.url} target="_blank" rel="noopener noreferrer" className="group p-5 bg-bg-elev border border-border rounded-xl hover:border-accent/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-fg" />
                <h3 className="font-mono font-bold text-lg">{it.name}</h3>
              </div>
              <ExternalLink className="w-4 h-4 text-fg-muted group-hover:text-accent" />
            </div>
            <p className="text-sm text-fg-muted mb-3">{it.desc}</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 bg-bg border border-border rounded font-mono">{it.license}</span>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-12 p-6 bg-bg-elev border border-border rounded-xl text-center">
        <p className="text-fg-muted">
          <strong className="text-fg">42 public repos total.</strong> See the full org: <a href="https://github.com/Ai-Whisperers" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-2 underline">github.com/Ai-Whisperers</a>
        </p>
      </div>
    </div>
  )
}
