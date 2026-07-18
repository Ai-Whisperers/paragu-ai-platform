"use client"
import { useState } from "react"
import content from "@/content/es.json"

interface ShippingZone {
  name: string
  price: number
  time: string
  minFree?: number
}

export function ShippingCalculator() {
  const [selected, setSelected] = useState("")
  const zones = (content.shipping?.zones || []) as ShippingZone[]
  const [result, setResult] = useState<ShippingZone | null>(null)

  const calculate = () => {
    const zone = zones.find(z => z.name === selected)
    if (zone) setResult(zone)
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h3 className="font-semibold text-sm mb-3">Calculá tu envío</h3>
      <div className="flex gap-2">
        <select value={selected} onChange={e => setSelected(e.target.value)}
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring">
          <option value="">Seleccioná tu zona</option>
          {zones.map(z => <option key={z.name} value={z.name}>{z.name}</option>)}
        </select>
        <button onClick={calculate} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90">
          Calcular
        </button>
      </div>
      {result && (
        <div className="mt-3 text-sm">
          <p className="text-foreground font-medium">{result.price === 0 ? "🚚 Envío gratis" : `💰 Gs. ${result.price.toLocaleString("es-PY")}`}</p>
          <p className="text-muted-foreground text-xs">Tiempo estimado: {result.time}</p>
          {result.minFree && result.price > 0 && (
            <p className="text-muted-foreground text-xs mt-1">Gratis en compras mayores a Gs. {result.minFree.toLocaleString("es-PY")}</p>
          )}
        </div>
      )}
    </div>
  )
}
