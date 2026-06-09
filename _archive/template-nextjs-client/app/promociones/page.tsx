"use client"
import content from "@/content/es.json"
const _c = content as any

export default function Promociones() {
  const p = content.promociones
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-2">{p.title}</h1>
      <p className="text-muted-foreground text-center mb-10">{p.subtitle}</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {p.promotions.map((promo: any) => (
          <div key={promo.id} className="rounded-xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="text-4xl mb-4">{promo.icon}</div>
            <div className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 text-white"
              style={{ backgroundColor: promo.color }}>
              {promo.badge}
            </div>
            <h3 className="font-semibold text-lg mb-2">{promo.title}</h3>
            <p className="text-muted-foreground text-sm">{promo.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <a href="https://wa.me/595981234567?text=¡Hola! Quiero información sobre promociones"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold no-underline hover:bg-primary/90 transition-colors">
          Consultar Promos por WhatsApp
        </a>
      </div>
    </div>
  )
}
