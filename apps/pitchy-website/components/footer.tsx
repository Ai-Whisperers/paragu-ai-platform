"use client"
import Link from "next/link"
import content from "@/content/es.json"

const c = content as Record<string, any>
const f = c.footer || {}
const cols = f.columns || []
const social = f.social || []

export function Footer() {
  return (
    <footer className="bg-[#1A1A2E] py-12 text-white relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00A3E0] via-[#0F62FE] to-[#00A3E0]" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="text-xl font-extrabold text-[#00A3E0] mb-3">
              Pitchy <span className="text-[#0F62FE]">Blindex</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">{f.description}</p>
            {social.length > 0 && (
              <div className="flex items-center gap-3 mt-4">
                {social.map((s: any, i: number) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all"
                    aria-label={s.name}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {cols.map((col: any, i: number) => (
            <div key={i}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">{col.title}</h4>
              <div className="flex flex-col gap-2 text-sm">
                {(col.links || []).map((lnk: any, j: number) => (
                  <Link key={j} href={lnk.href} className="text-white/60 hover:text-white transition-colors">
                    {lnk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          {f.copyright || `© ${new Date().getFullYear()} Pitchy Blindex. Todos los derechos reservados.`}
        </div>
      </div>
    </footer>
  )
}
