import Link from "next/link"
import { ArrowRight } from "lucide-react"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"

const LOCALES = ["en", "es", "nl", "pt"] as const
const CONTENT: Record<string, any> = { en, es, nl: en, pt: en }

export function generateStaticParams() { return LOCALES.map(l => ({ lang: l })) }

export const metadata = { title: "Services" }

export default async function Services({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = CONTENT[lang] || en
  const p = c.pricing
  const base = `/${lang}`
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold mb-3">{p.title}</h1>
        <p className="text-fg-muted text-lg max-w-2xl mx-auto">{p.subtitle}</p>
      </div>
      <div className="space-y-3 mb-12">
        {p.rates.map((r: any) => (
          <div key={r.service} className="p-5 bg-bg-elev border border-border rounded-xl grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-4 font-semibold">{r.service}</div>
            <div className="md:col-span-3 font-mono text-accent">{r.rate}</div>
            <div className="md:col-span-5 text-sm text-fg-muted">{r.notes}</div>
          </div>
        ))}
      </div>
      <div className="p-8 bg-gradient-to-br from-accent/10 to-accent-3/10 border border-accent/30 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-3">Want the full 28-capability sales sheet?</h2>
        <p className="text-fg-muted mb-6 max-w-xl mx-auto">All 28 services, market benchmarks, sources, internal proof — in a shareable Google Sheet.</p>
        <Link href={`${base}/sales-sheet`} className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/80 transition-colors">
          Get the sales sheet <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
