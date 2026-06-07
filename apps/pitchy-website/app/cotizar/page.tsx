"use client"
import { useState } from "react"
import content from "@/content/es.json"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

const c = content as Record<string, any>
const productos = c.products || []

export default function CotizarPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    nombre: "", empresa: "", email: "", telefono: "",
    proyecto: "", vidrio: [] as string[], m2: "", plazo: "", mensaje: "",
  })

  const vidrioOptions = productos.map((p: any) => ({ id: p.id, name: p.name }))

  const toggleVidrio = (id: string) => {
    setForm(f => ({
      ...f,
      vidrio: f.vidrio.includes(id) ? f.vidrio.filter(v => v !== id) : [...f.vidrio, id]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `*Nuevo Pedido de Cotización*
Nombre: ${form.nombre}
Empresa: ${form.empresa}
Email: ${form.email}
Teléfono: ${form.telefono}
Tipo de proyecto: ${form.proyecto}
Vidrio: ${form.vidrio.join(", ")}
M² aproximados: ${form.m2}
Plazo: ${form.plazo}
Mensaje: ${form.mensaje}`

    const url = `https://wa.me/595981277601?text=${encodeURIComponent(msg)}`
    window.open(url, "_blank")
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-3">¡Gracias por tu solicitud!</h1>
        <p className="text-[#6B7280] mb-8">Te redirigimos a WhatsApp para que nos cuentes los detalles de tu proyecto.</p>
        <a href="https://wa.me/595981277601" target="_blank" rel="noopener noreferrer"
          className="inline-block rounded-lg bg-[#0F62FE] text-white px-8 py-4 font-semibold hover:bg-blue-700 transition-colors">
            Abrir WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <BreadcrumbJsonLd items={[{ name: "Cotizar", url: "/cotizar" }]} />
      <h1 className="text-4xl font-bold text-[#1A1A2E] mb-2">Solicitar Cotización</h1>
      <p className="text-[#6B7280] mb-8">Completá el formulario y te enviamos un presupuesto detallado en el día.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">Nombre *</label>
            <input required value={form.nombre} onChange={e => setForm(f => ({...f, nombre: e.target.value}))}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0F62FE]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">Empresa</label>
            <input value={form.empresa} onChange={e => setForm(f => ({...f, empresa: e.target.value}))}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0F62FE]" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">Email *</label>
            <input type="email" required value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0F62FE]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">Teléfono *</label>
            <input required value={form.telefono} onChange={e => setForm(f => ({...f, telefono: e.target.value}))}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0F62FE]" placeholder="+595 XXX XXX XXX" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">Tipo de proyecto</label>
          <select value={form.proyecto} onChange={e => setForm(f => ({...f, proyecto: e.target.value}))}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0F62FE]">
            <option value="">Seleccioná una opción</option>
            <option value="Edificio residencial">Edificio residencial</option>
            <option value="Edificio corporativo">Edificio corporativo</option>
            <option value="Comercial">Comercial</option>
            <option value="Hotel">Hotel</option>
            <option value="Vivienda particular">Vivienda particular</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Tipo de vidrio que necesitás</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {vidrioOptions.map((v: any) => (
              <button key={v.id} type="button" onClick={() => toggleVidrio(v.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  form.vidrio.includes(v.id)
                    ? "bg-[#0F62FE] text-white border-[#0F62FE]"
                    : "bg-white text-[#4A5568] border-gray-300 hover:border-[#0F62FE]"
                }`}>
                {v.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">M² aproximados</label>
            <input type="number" value={form.m2} onChange={e => setForm(f => ({...f, m2: e.target.value}))}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0F62FE]" placeholder="Ej: 500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">Plazo estimado</label>
            <select value={form.plazo} onChange={e => setForm(f => ({...f, plazo: e.target.value}))}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0F62FE]">
              <option value="">Seleccioná un plazo</option>
              <option value="Urgente (1-2 semanas)">Urgente (1-2 semanas)</option>
              <option value="Normal (1-2 meses)">Normal (1-2 meses)</option>
              <option value="Largo plazo (3+ meses)">Largo plazo (3+ meses)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">Mensaje / Detalles</label>
          <textarea rows={4} value={form.mensaje} onChange={e => setForm(f => ({...f, mensaje: e.target.value}))}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0F62FE]"
            placeholder="Contanos más sobre tu proyecto..." />
        </div>

        <button type="submit"
          className="w-full rounded-lg bg-[#0F62FE] text-white py-4 font-semibold text-base hover:bg-blue-700 transition-colors">
          Enviar solicitud por WhatsApp
        </button>

        <p className="text-xs text-[#6B7280] text-center">Al enviar, serás redirigido a WhatsApp para confirmar tu solicitud. No compartimos tus datos.</p>
      </form>
    </div>
  )
}
