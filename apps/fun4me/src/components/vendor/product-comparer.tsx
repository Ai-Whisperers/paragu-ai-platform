"use client"
import { useState } from "react"
import content from "@/content/es.json"
import type { ContentProduct } from "@/types/content"

const allProducts = (content.products || []) as unknown as ContentProduct[]

export function ProductComparer() {
  const [selected, setSelected] = useState<ContentProduct[]>([])
  const [open, setOpen] = useState(false)

  const toggleProduct = (p: ContentProduct) => {
    setSelected(prev => {
      if (prev.find(x => x.id === p.id)) return prev.filter(x => x.id !== p.id)
      if (prev.length >= 3) return prev
      return [...prev, p]
    })
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="6" height="18"/><rect x="9" y="7" width="6" height="14"/><rect x="16" y="5" width="6" height="16"/>
        </svg>
        Comparar ({selected.length})
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
      <div className="bg-surface rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto border border-border" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Comparar productos</h2>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">✕</button>
        </div>

        {/* Product picker */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Seleccioná hasta 3 productos para comparar:</p>
          <div className="flex flex-wrap gap-2">
            {allProducts.map(p => (
              <button key={p.id} onClick={() => toggleProduct(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  selected.find(x => x.id === p.id)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}>
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        {selected.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Característica</th>
                  {selected.map(p => (
                    <th key={p.id} className="py-2 px-3 text-center font-semibold">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {([["Precio", (p: ContentProduct) => `Gs. ${p.price.toLocaleString("es-PY")}`],
                  ["Nivel", (p: ContentProduct) => ({ "beginner": "🌱 Principiante", "intermediate": "⭐ Intermedio", "advanced": "🔥 Avanzado" } as Record<string, string>)[p.level] || "—"],
                  ["Ruido", (p: ContentProduct) => `${"▮".repeat(p.sound || 0)}${"▯".repeat(5 - (p.sound || 0))}`],
                  ["Material", (p: ContentProduct) => p.material || "—"],
                  ["Impermeable", (p: ContentProduct) => p.waterproof ? "✅ Sí" : "❌ No"],
                  ["Recargable", (p: ContentProduct) => p.rechargeable ? "✅ Sí" : "❌ No"],
                  ["Body Safe", (p: ContentProduct) => p.body_safe ? "✅ Sí" : "❌ No"],
                  ["Stock", (p: ContentProduct) => ({ "in_stock": "✅ En stock", "low_stock": "⚠️ Últimas", "out_of_stock": "❌ Agotado" } as Record<string, string>)[p.stock] || "—"],
                ] as [string, (p: ContentProduct) => string][]).map(([label, fn]) => (
                  <tr key={label as string} className="border-b border-border/50">
                    <td className="py-2 pr-4 text-muted-foreground font-medium">{label as string}</td>
                    {selected.map(p => (
                      <td key={p.id} className="py-2 px-3 text-center">{fn(p)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selected.length === 0 && (
          <p className="text-center text-muted-foreground py-8">Seleccioná productos arriba para comparar</p>
        )}
      </div>
    </div>
  )
}
