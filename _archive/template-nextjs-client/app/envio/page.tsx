"use client"
import content from "@/content/es.json"
const _c = content as any

const WA_PHONE = "595981234567"

export default function Envio() {
  const e = content.envio
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-2">{e.title}</h1>
      <p className="text-muted-foreground text-center mb-12">{e.subtitle}</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {e.points.map((p, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 text-lg">
              {p.icon}
            </div>
            <h3 className="font-semibold text-base mb-2">{p.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <a href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent("¡Hola! Quiero consultar sobre envíos")}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold no-underline hover:bg-primary/90 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
          </svg>
          {e.cta}
        </a>
      </div>
    </div>
  )
}
