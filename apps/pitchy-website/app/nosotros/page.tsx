"use client"
import content from "@/content/es.json"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

const c = content as Record<string, any>
const n = c.nosotros || {}
const stats = n.stats || []
const values = n.values || []

export default function Nosotros() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <BreadcrumbJsonLd items={[{ name: "Nosotros", url: "/nosotros" }]} />
      <h1 className="text-4xl font-bold text-center text-[#1A1A2E] mb-2">{n.title || "Sobre Pitchy Blindex"}</h1>
      <p className="text-[#6B7280] text-center mb-10 max-w-2xl mx-auto">{n.subtitle || ""}</p>

      {/* Story */}
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm mb-10">
        <p className="text-[#4A5568] leading-relaxed max-w-3xl mx-auto">
          {n.story || "Pitchy Blindex nace de la necesidad de proveer vidrio de calidad con stock local en Paraguay. Trabajamos directamente con Blindex para ofrecer productos certificados para proyectos de todos los tamaños."}
        </p>
      </div>

      {/* Stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s: any, i: number) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
              <div className="text-3xl font-bold text-[#0F62FE] mb-1">{s.number}</div>
              <div className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Mission */}
      {n.mission && (
        <div className="rounded-xl p-8 text-center mb-10" style={{ background: "linear-gradient(135deg, #0F62FE 0%, #00A3E0 100%)" }}>
          <p className="text-white/90 text-lg leading-relaxed max-w-3xl mx-auto">{n.mission}</p>
        </div>
      )}

      {/* Values */}
      <h2 className="text-2xl font-bold text-center text-[#1A1A2E] mb-8">Nuestros Valores</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(values.length > 0 ? values : [
          { title: "Calidad", description: "Solo trabajamos con vidrio certificado Blindex." },
          { title: "Stock local", description: "Mantenemos inventario permanente para entregas rápidas." },
          { title: "Asesoramiento", description: "Te ayudamos a elegir el producto correcto." },
          { title: "Confianza", description: "Relaciones de largo plazo con constructoras y arquitectos." },
        ]).map((v: any, i: number) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg text-[#0F62FE] mb-2">{v.title}</h3>
            {v.description && <p className="text-sm text-[#6B7280]">{v.description}</p>}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-xl p-8 text-center" style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #0F62FE 100%)" }}>
        <h2 className="text-2xl font-bold text-white mb-3">¿Tenés un proyecto en mente?</h2>
        <p className="text-white/80 mb-6 max-w-xl mx-auto">Contanos qué necesitás y te asesoramos sobre el vidrio adecuado para tu obra.</p>
        <a href="https://wa.me/595981277601" target="_blank" rel="noopener noreferrer"
          className="inline-block rounded-lg bg-white text-[#0F62FE] px-8 py-4 font-semibold hover:bg-white/90 transition-colors">
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  )
}
