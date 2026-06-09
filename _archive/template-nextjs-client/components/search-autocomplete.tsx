"use client"
import { useEffect, useState, useRef } from "react"
import content from "@/content/es.json"

const allProducts = content.products || []

export function SearchAutocomplete() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const results = query.trim().length > 0
    ? allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : []

  return (
    <div ref={ref} className="relative">
      <input type="text" value={query} onChange={e => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)} placeholder="Buscá productos..."
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring" />
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl border border-border bg-surface shadow-lg overflow-hidden">
          {results.map((p: any) => (
            <a key={p.slug || p.name} href={`/producto/${p.slug}`}
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-surface-light transition-colors"
              onClick={() => { setOpen(false); setQuery("") }}>
              <span className="line-clamp-1 text-foreground">{p.name}</span>
              <span className="ml-auto text-xs font-bold text-primary shrink-0">Gs. {p.price.toLocaleString("es-PY")}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
