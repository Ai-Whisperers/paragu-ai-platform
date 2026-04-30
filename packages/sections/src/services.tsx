import React from "react"
interface ServiceItem { name?: string; description?: string; priceUSD?: string; pricePYG?: string; delivery?: string; includes?: string[] }
export function ServicesSection({ title, subtitle, items, primaryColor }: { title?: string; subtitle?: string; items: ServiceItem[]; primaryColor?: string }) {
  const pc = primaryColor || "#d43d5e"
  return <section className="py-16"><div className="mx-auto max-w-7xl px-4">
    {title && <h2 className="mb-2 text-center text-3xl font-bold text-foreground">{title}</h2>}
    {subtitle && <p className="mb-10 text-center text-muted-foreground">{subtitle}</p>}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((svc, i) => (
        <div key={i} className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-lg font-bold text-foreground">{svc.name}</h3>
          {svc.description && <p className="mb-3 text-sm text-muted-foreground">{svc.description}</p>}
          <div className="mb-3 flex items-center gap-3"><span className="text-xl font-bold" style={{color:pc}}>{svc.priceUSD}</span><span className="text-sm text-muted-foreground">/ {svc.pricePYG}</span></div>
          {svc.delivery && <p className="mb-3 text-xs text-muted-foreground">Delivery: {svc.delivery}</p>}
          {svc.includes && svc.includes.length > 0 && <ul className="mb-4 space-y-1">{svc.includes.slice(0,5).map((inc, j) => <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground"><span style={{color:pc}}>✓</span>{inc}</li>)}</ul>}
        </div>
      ))}
    </div>
  </div></section>
}
