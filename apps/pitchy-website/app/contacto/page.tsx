"use client"
import content from "@/content/es.json"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

const c = content as Record<string, any>
const info = c.contacto?.info || {}
const waPhone = info.whatsapp || "595981277601"
const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent("Hola Pitchy, quiero consultar sobre vidrio para mi proyecto.")}`

export default function Contacto() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <BreadcrumbJsonLd items={[{ name: "Contacto", url: "/contacto" }]} />
      <h1 className="text-4xl font-bold text-[#1A1A2E] mb-2">Contacto</h1>
      <p className="text-[#6B7280] mb-10 max-w-2xl">Estamos listos para ayudarte con tu proyecto. Respondemos consultas técnicas y comerciales todos los días.</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Contact info */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4">Datos de contacto</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">📱</span>
                <div>
                  <p className="font-medium text-sm text-[#1A1A2E]">WhatsApp</p>
                  <p className="text-sm text-[#6B7280]">{info.phone || waPhone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📧</span>
                <div>
                  <p className="font-medium text-sm text-[#1A1A2E]">Email</p>
                  <p className="text-sm text-[#6B7280]">{info.email || "consultar"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-medium text-sm text-[#1A1A2E]">Ubicación</p>
                  <p className="text-sm text-[#6B7280]">{info.address || "Asunción, Paraguay"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🕐</span>
                <div>
                  <p className="font-medium text-sm text-[#1A1A2E]">Horario</p>
                  <p className="text-sm text-[#6B7280]">{c.contacto?.hours || "Lun–Vie 07:30–17:30 · Sáb 07:30–12:00"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main CTA */}
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#0F62FE] text-white px-8 py-4 rounded-xl font-semibold no-underline text-lg hover:bg-blue-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/></svg>
            Contactar por WhatsApp
          </a>
        </div>

        {/* Right: Quick topics */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4">Consultas rápidas</h2>
          {[
            { icon: "📋", title: "Cotización de proyecto", msg: "Hola Pitchy, quiero un presupuesto para mi proyecto." },
            { icon: "🔧", title: "Consulta técnica", msg: "Hola Pitchy, tengo una consulta técnica sobre vidrio." },
            { icon: "🏗️", title: "Proyecto grande / obra", msg: "Hola Pitchy, represento a una constructora y queremos cotizar vidrio para una obra." },
            { icon: "🚿", title: "Blindex / mamparas", msg: "Hola Pitchy, quiero consultar precios de Blindex para baño." },
            { icon: "🔷", title: "Reparación urgente", msg: "Hola Pitchy, necesito reparación urgente de un vidrio." },
          ].map((item, i) => (
            <a key={i} href={`https://wa.me/${waPhone}?text=${encodeURIComponent(item.msg)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md hover:border-[#0F62FE] transition-all no-underline">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium text-sm text-[#1A1A2E]">{item.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
