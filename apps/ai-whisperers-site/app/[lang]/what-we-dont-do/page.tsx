import { getContent } from "@/lib/utils"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"
import { Ban } from "lucide-react"

const LOCALES = ["en", "es", "nl", "pt"] as const
const CONTENT: Record<string, any> = { en, es, nl: en, pt: en }

export function generateStaticParams() {
  return LOCALES.map(l => ({ lang: l }))
}

export const metadata = { title: "What we don't do" }

export default async function WhatWeDontDo({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = CONTENT[lang] || en
  const w = c.whatWeDontDo

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <Ban className="w-16 h-16 mx-auto mb-4 text-fg-muted opacity-50" />
        <h1 className="text-4xl sm:text-6xl font-bold mb-3">{w.title}</h1>
        <p className="text-fg-muted text-lg max-w-2xl mx-auto">{w.subtitle}</p>
      </div>

      <div className="space-y-3">
        {w.items.map((it: any, i: number) => (
          <div key={i} className="p-5 bg-bg-elev border border-border rounded-xl flex gap-4">
            <Ban className="w-6 h-6 flex-shrink-0 text-red-400 mt-1" />
            <div>
              <h3 className="text-lg font-bold mb-1 text-red-300">{it.topic}</h3>
              <p className="text-fg-muted">{it.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
