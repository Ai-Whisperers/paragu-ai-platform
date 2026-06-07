"use client"
import Link from "next/link"
import content from "@/content/es.json"

const c = content as any
const f = c.footer || {}
const socialIcons: Record<string, string> = {
  instagram: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 5A3.6 3.6 0 0 0 4 10.6v2.8A3.6 3.6 0 0 0 7.6 17h2.8A3.6 3.6 0 0 0 14 13.4v-2.8A3.6 3.6 0 0 0 10.4 7H7.6Zm-.6 2a1.6 1.6 0 0 1 1.6-1.6h2.8A1.6 1.6 0 0 1 13 9v2.8a1.6 1.6 0 0 1-1.6 1.6H8.6A1.6 1.6 0 0 1 7 11.8V9Zm7.5 6.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  "message-circle": "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z",
}

export function Footer() {
  const cols = f.columns || []
  const social = f.social || []
  const payments = f.paymentMethods || []
  const contactStrip = f.contactStrip || []

  return (
    <footer className="bg-secondary py-12 text-secondary-foreground relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent" />
      <div className="mx-auto max-w-7xl px-4">
        {/* Contact strip */}
        {contactStrip.length > 0 && (
          <div className="mb-10 grid gap-4 border-b border-white/20 pb-8 sm:grid-cols-2">
            {contactStrip.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-3 text-sm text-white/80">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand column */}
          <div>
            <div className="text-xl font-extrabold text-accent mb-3">
              Fun<span className="text-primary">4</span>Me
            </div>
            <p className="text-sm text-white/60 leading-relaxed">{f.description}</p>
          </div>

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

        {/* Social */}
        {social.length > 0 && (
          <div className="mt-10 flex items-center gap-3">
            {social.map((s: any, i: number) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all"
                aria-label={s.name}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d={socialIcons[s.icon] || ""}/>
                </svg>
              </a>
            ))}
          </div>
        )}

        {/* Payment methods */}
        {payments.length > 0 && (
          <div className="mt-10 border-t border-white/20 pt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">Medios de pago</p>
            <div className="flex flex-wrap gap-3">
              {payments.map((pm: any, i: number) => (
                <div key={i} className="flex items-center rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white/70 shadow-sm">
                  {pm.name}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-xs text-white/40">
          {f.copyright || `© ${new Date().getFullYear()} Fun4Me Store. Todos los derechos reservados.`}
        </div>
      </div>
    </footer>
  )
}
