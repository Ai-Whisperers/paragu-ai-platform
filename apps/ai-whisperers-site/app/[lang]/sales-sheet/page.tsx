import Link from "next/link"
import { ArrowRight, FileSpreadsheet, Github, Terminal } from "lucide-react"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"

const LOCALES = ["en", "es", "nl", "pt"] as const
const CONTENT: Record<string, any> = { en, es, nl: en, pt: en }

export function generateStaticParams() { return LOCALES.map(l => ({ lang: l })) }

export const metadata = { title: "Sales Sheet" }

export default async function SalesSheet({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = CONTENT[lang] || en
  const base = `/${lang}`
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <FileSpreadsheet className="w-16 h-16 mx-auto mb-4 text-accent" />
        <h1 className="text-4xl sm:text-6xl font-bold mb-3">Capabilities &amp; Pricing Sales Sheet</h1>
        <p className="text-fg-muted text-lg max-w-2xl mx-auto">
          All 28 capabilities, our pricing, market benchmarks, sources, and internal proof points — ready to share with prospects, investors, or partners.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-bg-elev border border-border rounded-xl">
          <h2 className="text-2xl font-bold mb-3">📊 Option 1: Apps Script (one-click Google Sheet, 60 seconds)</h2>
          <ol className="list-decimal list-inside space-y-2 text-fg-muted mb-4">
            <li>Open <a href="https://script.google.com/home" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-2 underline">script.google.com/home</a></li>
            <li>Click <strong>+ New Project</strong></li>
            <li>Paste the contents of <code className="px-1.5 py-0.5 bg-bg border border-border rounded text-sm">create-sheet.gs</code> (in the <a href="https://github.com/Ai-Whisperers/company/tree/main/Company/sales" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-2 underline">company repo</a>)</li>
            <li>Run <code className="px-1.5 py-0.5 bg-bg border border-border rounded text-sm">createCapabilitiesSheet</code></li>
            <li>Authorize when prompted. Sheet appears in your Drive root.</li>
          </ol>
          <p className="text-sm text-fg-muted">Result: 3 tabs (Capabilities, README, ICP Map) — color-coded by tier, frozen header, 17 columns, all 28 services.</p>
        </div>

        <div className="p-6 bg-bg-elev border border-border rounded-xl">
          <h2 className="text-2xl font-bold mb-3">📋 Option 2: CSV import (60 seconds, no setup)</h2>
          <ol className="list-decimal list-inside space-y-2 text-fg-muted mb-4">
            <li>Open <a href="https://sheets.google.com/create" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-2 underline">sheets.google.com/create</a></li>
            <li>Create a new blank sheet, rename to: <code className="px-1.5 py-0.5 bg-bg border border-border rounded text-sm">AI Whisperers — Capabilities &amp; Pricing (2026-06-15)</code></li>
            <li>File → Import → Upload → select <code className="px-1.5 py-0.5 bg-bg border border-border rounded text-sm">capabilities-sheet.csv</code></li>
            <li>Choose "Replace current sheet" → Import data</li>
          </ol>
        </div>

        <div className="p-6 bg-bg-elev border border-border rounded-xl">
          <h2 className="text-2xl font-bold mb-3">📂 What's in the sheet</h2>
          <p className="text-fg-muted mb-3">28 capabilities × 17 columns:</p>
          <ul className="grid grid-cols-2 gap-2 text-sm text-fg-muted">
            <li>• # / Tier / Category</li>
            <li>• Service / What it is</li>
            <li>• Setup (USD) / Recurring</li>
            <li>• Our price (summary)</li>
            <li>• Market low / high / source</li>
            <li>• Build effort / Fit / Demand</li>
            <li>• Revenue potential</li>
            <li>• Our edge / Internal proof</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center space-y-4">
        <a
          href="https://github.com/Ai-Whisperers/company/tree/main/Company/sales"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/80 transition-colors"
        >
          <Github className="w-4 h-4" /> Open the source folder
        </a>
        <div className="text-sm text-fg-muted">
          <Link href={`${base}/services`} className="text-accent hover:text-accent-2 inline-flex items-center gap-1">
            Or browse the services page <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
