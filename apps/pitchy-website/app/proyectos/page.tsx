"use client"
import content from "@/content/es.json"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

const c = content as Record<string, any>
const proyectos = c.proyectos || []

export default function ProyectosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <BreadcrumbJsonLd items={[{ name: "Proyectos", url: "/proyectos" }]} />
      <h1 className="text-4xl font-bold text-[#1A1A2E] mb-2">Proyectos</h1>
      <p className="text-[#6B7280] mb-10 max-w-2xl">Conocé algunos de los proyectos donde participamos con nuestros productos.</p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {proyectos.map((p: any, i: number) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-[#F8F9FA] overflow-hidden">
              <img src={`/images/proyectos/proyecto-0${i+1}.jpg`} alt={p.name}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class=\"flex items-center justify-center h-full\"><span class=\"text-5xl opacity-30\">🏗️</span></div>' }} />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-[#0F62FE]/10 text-[#0F62FE] text-xs font-medium px-2 py-0.5 rounded">{p.year}</span>
              </div>
              <h3 className="font-semibold text-lg text-[#1A1A2E] mb-1">{p.name}</h3>
              <p className="text-sm text-[#6B7280] mb-2">{p.location}</p>
              <p className="text-sm text-[#6B7280] font-medium">{p.scope}</p>
              <p className="text-xs text-[#6B7280] mt-2">{p.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-xl p-8 text-center border border-dashed border-gray-300 bg-[#F8F9FA]">
        <h2 className="text-xl font-bold text-[#1A1A2E] mb-2">¿Querés aparecer en nuestros proyectos?</h2>
        <p className="text-[#6B7280] mb-6">Trabajá con nosotros y sumá tu obra a nuestro portafolio.</p>
        <a href="https://wa.me/595981277601" target="_blank" rel="noopener noreferrer"
          className="inline-block rounded-lg bg-[#0F62FE] text-white px-6 py-3 font-semibold hover:bg-blue-700 transition-colors">
          Contactar por WhatsApp
        </a>
      </div>
    </div>
  )
}
