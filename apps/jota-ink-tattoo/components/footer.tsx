"use client"
import Link from "next/link"
import content from "@/content/es.json"

const c = content as Record<string, any>
const f = c.footer || {}
const socialIcons: Record<string, string> = {
  instagram: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 5A3.6 3.6 0 0 0 4 10.6v2.8A3.6 3.6 0 0 0 7.6 17h2.8A3.6 3.6 0 0 0 14 13.4v-2.8A3.6 3.6 0 0 0 10.4 7H7.6Zm-.6 2a1.6 1.6 0 0 1 1.6-1.6h2.8A1.6 1.6 0 0 1 13 9v2.8a1.6 1.6 0 0 1-1.6 1.6H8.6A1.6 1.6 0 0 1 7 11.8V9Zm7.5 6.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  "message-circle": "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z",
}

export function Footer() {
  const cols = f.columns || []
  const social = f.social || []

  return (
    <footer className="bg-ink-dark border-t border-border py-12 text-foreground/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="text-lg font-extrabold text-accent mb-3 tracking-wider">
              JOTA <span className="text-foreground">INK</span>
            </div>
            <p className="text-sm text-foreground/50 leading-relaxed">{f.description}</p>
          </div>

          {cols.map((col: any, i: number) => (
            <div key={i}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/40">{col.title}</h4>
              <div className="flex flex-col gap-2 text-sm">
                {(col.links || []).map((lnk: any, j: number) => (
                  <Link key={j} href={lnk.href} className="text-foreground/50 hover:text-accent transition-colors">
                    {lnk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {social.length > 0 && (
          <div className="mt-10 flex items-center gap-3 border-t border-border pt-8">
            {social.map((s: any, i: number) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/50 hover:text-accent hover:border-accent transition-all"
                aria-label={s.name}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d={socialIcons[s.icon] || ""}/>
                </svg>
              </a>
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-xs text-foreground/30">
          {f.copyright || `© 2026 Jota Ink.`}
        </div>
      </div>
    </footer>
  )
}
