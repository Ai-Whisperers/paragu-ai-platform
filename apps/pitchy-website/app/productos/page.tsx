"use client"
import content from "@/content/es.json"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

const c = content as Record<string, any>
const baseUrl = c.site?.url || "https://pitchy.paragu-ai.com"
const productos = c.products || []

function ProductJsonLd({ p }: { p: any }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": p.name,
    "description": p.description,
    "category": p.applications?.[0] || "Construcción",
    "url": `${baseUrl}/productos#${p.id}`,
    "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "PYG", "price": "0" }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export default function ProductosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <BreadcrumbJsonLd items={[{ name: "Productos", url: "/productos" }]} />
      {productos.map((p: any) => <ProductJsonLd key={p.id} p={p} />)}
      <h1 className="text-4xl font-bold text-[#1A1A2E] mb-2">Productos</h1>
      <p className="text-[#6B7280] mb-10 max-w-2xl">Vidrio Blindex certificado para proyectos de construcción de todos los tamaños. Stock local, entrega rápida.</p>

      <div className="space-y-10">
        {productos.map((p: any) => (
          <section key={p.id} id={p.id} className="scroll-mt-24 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3">{p.name}</h2>
                <p className="text-[#6B7280] mb-4">{p.description}</p>

                <h3 className="font-semibold text-sm text-[#1A1A2E] uppercase tracking-wider mb-2">Características</h3>
                <ul className="list-disc list-inside text-sm text-[#6B7280] mb-4 space-y-1">
                  {(p.features || []).map((f: string, i: number) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>

                <h3 className="font-semibold text-sm text-[#1A1A2E] uppercase tracking-wider mb-2">Aplicaciones</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(p.applications || []).map((a: string, i: number) => (
                    <span key={i} className="bg-[#E8ECF0] text-[#4A5568] text-xs font-medium px-3 py-1.5 rounded-full">{a}</span>
                  ))}
                </div>

                <a href={`https://wa.me/595981277601?text=${encodeURIComponent(`Hola Pitchy, quiero cotizar: ${p.name}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0F62FE] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/></svg>
                  {p.cta || "Solicitar cotización"}
                </a>
              </div>
              <div className="hidden md:flex items-center justify-center rounded-xl min-h-[200px] overflow-hidden bg-[#F8F9FA]">
                <img src={`/images/products/${p.id}.jpg`} alt={p.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.style.background = p.id === "vidrio-templado" ? "linear-gradient(135deg, #E8ECF0, #CBD5E1)" : p.id === "vidrio-laminado" ? "linear-gradient(135deg, #D1FAE5, #A7F3D0)" : p.id === "dvh" ? "linear-gradient(135deg, #DBEAFE, #93C5FD)" : p.id === "muro-cortina" ? "linear-gradient(135deg, #F3E8FF, #D8B4FE)" : p.id === "low-e" ? "linear-gradient(135deg, #FEF3C7, #FCD34D)" : p.id === "blindex" ? "linear-gradient(135deg, #E0E7FF, #A5B4FC)" : "linear-gradient(135deg, #FCE4EC, #F48FB1)"
                      parent.innerHTML = `<div class="text-center"><span class="text-5xl opacity-40 block mb-2">${p.id === "vidrio-templado" ? "🔷" : p.id === "vidrio-laminado" ? "🪟" : p.id === "dvh" ? "🪞" : p.id === "muro-cortina" ? "🏢" : p.id === "low-e" ? "☀️" : p.id === "blindex" ? "🚿" : "🔧"}</span><span class="text-xs font-medium text-[#6B7280] opacity-70">${p.name}</span></div>`
                    }
                  }} />
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Final CTA */}
      <section className="mt-16 rounded-xl p-10 text-center" style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #0F62FE 100%)" }}>
        <h2 className="text-2xl font-bold text-white mb-3">¿No encontrás lo que buscás?</h2>
        <p className="text-white/80 mb-6">Consultános por productos y medidas especiales. Te respondemos en el día.</p>
        <a href="https://wa.me/595981277601" target="_blank" rel="noopener noreferrer"
          className="inline-block rounded-lg bg-white text-[#0F62FE] px-8 py-4 font-semibold hover:bg-white/90 transition-colors">
            Consultar por WhatsApp
        </a>
      </section>
    </div>
  )
}
