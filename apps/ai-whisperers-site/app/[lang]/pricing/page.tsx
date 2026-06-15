import Link from "next/link"
import { ArrowRight, Download, FileSpreadsheet } from "lucide-react"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"

const LOCALES = ["en", "es", "nl", "pt"] as const
const CONTENT: Record<string, any> = { en, es, nl: en, pt: en }

export function generateStaticParams() { return LOCALES.map(l => ({ lang: l })) }

export const metadata = { title: "Pricing" }

export default function Pricing({ params }: { params: { lang: string } }) {
  const c = CONTENT[params.lang] || en
  const p = c.pricing
  const base = `/${params.lang}`
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold mb-3">{p.title}</h1>
        <p className="text-fg-muted text-lg max-w-2xl mx-auto">{p.subtitle}</p>
      </div>
      <div className="space-y-3">
        {p.rates.map((r: any) => (
          <div key={r.service} className="p-5 bg-bg-elev border border-border rounded-xl grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-4 font-semibold">{r.service}</div>
            <div className="md:col-span-3 font-mono text-accent">{r.rate}</div>
            <div className="md:col-span-5 text-sm text-fg-muted">{r.notes}</div>
          </div>
        ))}
      </div>
      <div className="mt-12 p-6 bg-bg-elev border border-border rounded-xl text-center">
        <h2 className="text-xl font-bold mb-2">Source of truth</h2>
        <p className="text-fg-muted text-sm mb-4">All rates match our canonical pricing document in the company repo.</p>
        <Link href={`${base}/sales-sheet`} className="inline-flex items-center gap-2 text-accent hover:text-accent-2 font-medium">
          Get the full 28-capability sales sheet <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
