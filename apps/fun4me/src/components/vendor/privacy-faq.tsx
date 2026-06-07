"use client"
import { useState } from "react"
import content from "@/content/es.json"

export function PrivacyFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const privacyQA = [
    { q: "¿El empaque tiene algún logo o identificación?", a: "No. Todos nuestros envíos van en cajas completamente neutras. Sin logos, sin marcas, sin ninguna referencia al contenido. Solo vos sabés lo que hay adentro." },
    { q: "¿Qué pasa si alguien más abre mi pedido?", a: "Nadie podría saber qué contiene. El empaque es una caja marrón común sin ninguna identificación. El remitente tampoco es identificable." },
    { q: "¿El nombre del negocio aparece en el extracto bancario?", a: "Trabajamos para que la transferencia aparezca bajo un nombre genérico. Consultanos por WhatsApp para más detalles." },
    { q: "¿Puedo retirar personalmente?", a: "Sí. Coordinamos retiro en un punto neutral en Asunción. Sin necesidad de dar tu dirección." },
    { q: "¿Cómo protegen mis datos personales?", a: "No almacenamos información de pago. Tus datos son solo para el envío y no los compartimos con terceros. Podés pedir que los eliminemos después de la entrega." },
    { q: "¿Puedo comprar sin dar mi nombre real?", a: "Sí. Solo necesitamos un número de contacto para coordinar la entrega." },
    { q: "¿Qué hago si llega a mis manos el paquete y alguien pregunta?", a: "Podés decir que es un regalo o una compra de otro producto. El paquete no revela nada." },
    { q: "¿Ofrecen envío a un punto de retiro en vez de mi casa?", a: "Sí. Trabajamos con puntos de retiro en Asunción. También podemos coordinar entrega en tu trabajo u otro lugar." },
  ]

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold mb-4">Privacidad y Discreción</h2>
      {privacyQA.map((item, i) => (
        <div key={i} className="rounded-xl border border-border bg-surface overflow-hidden">
          <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full px-5 py-4 text-left text-foreground font-medium text-sm cursor-pointer flex justify-between items-center gap-4 hover:bg-surface-light transition-colors">
            <span>{item.q}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`transition-transform shrink-0 ${openIdx === i ? "rotate-180" : ""}`}>
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
          {openIdx === i && (
            <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed">{item.a}</div>
          )}
        </div>
      ))}
    </div>
  )
}
