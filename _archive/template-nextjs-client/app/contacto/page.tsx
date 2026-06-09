"use client"
import content from "@/content/es.json"
import contentRaw from "@/content/es.json"

const c = content as any
const WA_PHONE = "595981234567"

export default function Contacto() {
  const waUrl = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent("¡Hola! Quiero hacer una consulta sobre productos")}`
  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-3">Contacto</h1>
      <p className="text-muted-foreground text-center mb-10">Estamos acá para ayudarte. Respondemos rápido por WhatsApp.</p>
      <div className="space-y-4">
        <a href={waUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-semibold no-underline text-lg hover:bg-[#20BD5A] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
          </svg>
          Contactar por WhatsApp
        </a>

        <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">📍</span>
            <div>
              <p className="font-medium text-sm text-foreground">Asunción, Paraguay</p>
              <p className="text-xs text-muted-foreground">Coordinamos retiro sin cita previa</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">🕐</span>
            <div>
              <p className="font-medium text-sm text-foreground">Horario de atención</p>
              <p className="text-xs text-muted-foreground">Lu–Vi 9:00–19:00 · Sá 9:00–13:00</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">📱</span>
            <div>
              <p className="font-medium text-sm text-foreground">WhatsApp</p>
              <p className="text-xs text-muted-foreground">Respuesta en menos de 1 hora</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">💬</span>
            <div>
              <p className="font-medium text-sm text-foreground">Instagram</p>
              <p className="text-xs text-muted-foreground">@fun4me_py</p>
            </div>
          </div>
        </div>

        {/* Quick contact topics */}
        <div className="grid grid-cols-2 gap-2">
          <a href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent("¡Hola! Quiero información sobre productos")}`}
            target="_blank" rel="noopener noreferrer"
            className="rounded-xl border border-border bg-surface p-3 text-center text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors no-underline">
            📦 Consultar productos
          </a>
          <a href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent("¡Hola! Quiero consultar el estado de mi pedido")}`}
            target="_blank" rel="noopener noreferrer"
            className="rounded-xl border border-border bg-surface p-3 text-center text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors no-underline">
            🚚 Estado del pedido
          </a>
          <a href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent("¡Hola! Quiero información sobre envíos")}`}
            target="_blank" rel="noopener noreferrer"
            className="rounded-xl border border-border bg-surface p-3 text-center text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors no-underline">
            📬 Consultar envío
          </a>
          <a href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent("¡Hola! Quiero hacer un reclamo o devolución")}`}
            target="_blank" rel="noopener noreferrer"
            className="rounded-xl border border-border bg-surface p-3 text-center text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors no-underline">
            ↩️ Reclamo / devolución
          </a>
        </div>
      </div>
    </div>
  )
}
