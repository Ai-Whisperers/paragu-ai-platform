"use client"

import Link from "next/link"
import { Globe, MessageCircle } from "lucide-react"
import { useState } from "react"

const LANGS = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "nl", label: "NL" },
  { code: "pt", label: "PT" },
]

export function Navbar({ lang, content }: { lang: string; content: any }) {
  const [open, setOpen] = useState(false)
  const base = `/${lang}`
  const items = [
    { href: `${base}/services`, label: "Services" },
    { href: `${base}/portfolio`, label: "Portfolio" },
    { href: `${base}/process`, label: "Process" },
    { href: `${base}/open-source`, label: "Open Source" },
    { href: `${base}/pricing`, label: "Pricing" },
    { href: `${base}/faq`, label: "FAQ" },
    { href: `${base}/changelog`, label: "Changelog" },
    { href: `${base}/decisions`, label: "Decisions" },
    { href: `${base}/about`, label: "About" },
  ]
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-bg/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={base} className="flex items-center gap-2 font-bold text-lg">
            <span className="w-7 h-7 rounded-md bg-gradient-to-br from-accent to-accent-3 flex items-center justify-center text-white text-sm">AW</span>
            <span>AI Whisperers</span>
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {items.map(it => (
              <Link key={it.href} href={it.href} className="px-2 py-2 text-xs text-fg-muted hover:text-fg hover:bg-bg-elev rounded-md transition-colors whitespace-nowrap">{it.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 text-xs">
              <Globe className="w-3 h-3 text-fg-muted" />
              {LANGS.map(l => (
                <Link
                  key={l.code}
                  href={`/${l.code}`}
                  className={`px-2 py-1 rounded font-mono uppercase ${l.code === lang ? "bg-accent text-white" : "text-fg-muted hover:text-fg"}`}
                >{l.label}</Link>
              ))}
            </div>
            <Link href={`${base}/contact`} className="hidden md:inline-flex items-center gap-1 px-3 py-2 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/80 transition-colors">
              <MessageCircle className="w-4 h-4" /> Contact
            </Link>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-fg-muted hover:text-fg" aria-label="Open menu">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden pb-4 grid grid-cols-2 gap-1">
            {items.map(it => (
              <Link key={it.href} href={it.href} className="px-3 py-2 text-sm text-fg-muted hover:text-fg hover:bg-bg-elev rounded-md">{it.label}</Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
