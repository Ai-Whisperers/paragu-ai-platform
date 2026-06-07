"use client"
import content from "@/content/es.json"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

const c = content as Record<string, any>
const servicios = c.servicios || []

export default function ServiciosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <BreadcrumbJsonLd items={[{ name: "Servicios", url: "/servicios" }]} />
      <h1 className="text-4xl font-bold text-[#1A1A2E] mb-2">Servicios</h1>
      <p className="text-[#6B7280] mb-10 max-w-2xl">Ofrecemos un servicio integral en vidrio para la construcción, desde el asesoramiento hasta la post-venta.</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {servicios.map((s: any, i: number) => (
          <div key={s.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{s.icon}</div>
            <h2 className="text-lg font-semibold text-[#1A1A2E] mb-2">{s.title}</h2>
            <p className="text-sm text-[#6B7280]">{s.description}</p>
          </div>
        ))}
      </div>

      {/* Process */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-center text-[#1A1A2E] mb-10">¿Cómo trabajamos?</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { step: "1", title: "Consultá", desc: "Contactanos por WhatsApp o el formulario. Contanos tu proyecto." },
            { step: "2", title: "Medimos", desc: "Visitamos tu obra para tomar medidas y evaluar necesidades." },
            { step: "3", title: "Cotizamos", desc: "Te enviamos un presupuesto detallado sin compromiso." },
            { step: "4", title: "Entregamos", desc: "Producto listo en tiempo récord con stock local." },
          ].map((p, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#0F62FE] text-white flex items-center justify-center text-lg font-bold mx-auto mb-3">{p.step}</div>
              <h3 className="font-semibold text-[#1A1A2E] mb-1">{p.title}</h3>
              <p className="text-sm text-[#6B7280]">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 rounded-xl p-10 text-center" style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #0F62FE 100%)" }}>
        <h2 className="text-2xl font-bold text-white mb-3">¿Necesitás vidrio para tu proyecto?</h2>
        <p className="text-white/80 mb-6">Te asesoramos sin compromiso. Respondemos en el día.</p>
        <a href="https://wa.me/595981277601" target="_blank" rel="noopener noreferrer"
          className="inline-block rounded-lg bg-white text-[#0F62FE] px-8 py-4 font-semibold hover:bg-white/90 transition-colors">
            Consultar por WhatsApp
        </a>
      </section>
    </div>
  )
}
