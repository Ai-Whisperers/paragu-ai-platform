"use client"
// Internal FAQ search — instant filtering of FAQ questions + answers.
// Pure JS, no backend. Searches title + content. Highlights matches.

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"

interface FAQItem {
  q: string
  a: string
}

interface FAQSearchProps {
  items: FAQItem[]
  placeholder?: string
  className?: string
}

export function FAQSearch({ items, placeholder = "Buscar en preguntas…", className = "" }: FAQSearchProps) {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items.filter(item =>
      item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    )
  }, [query, items])

  return (
    <div className={className}>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-fg-subtle pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent focus:outline-none transition-all"
          aria-label="Buscar preguntas frecuentes"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Limpiar búsqueda"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-subtle hover:text-fg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="text-sm text-fg-muted mb-3">
        {query ? (
          <>
            {results.length} {results.length === 1 ? "resultado" : "resultados"} para &ldquo;{query}&rdquo;
          </>
        ) : (
          <>{items.length} preguntas en total</>
        )}
      </div>
      <div className="space-y-2">
        {results.length === 0 ? (
          <div className="card p-6 text-center">
            <p className="text-fg-muted">
              No encontré preguntas que coincidan con &ldquo;{query}&rdquo;. 
              {query.length > 0 && (
                <> Probá con otras palabras o <a href={`mailto:doctora.gabi@ometsdental.com.py`} className="text-accent hover:underline">escribime por email</a>.</>
              )}
            </p>
          </div>
        ) : (
          results.map((item, i) => (
            <details key={i} className="card p-4 group">
              <summary className="cursor-pointer font-medium list-none flex items-start justify-between gap-3">
                <span className="flex-1">{item.q}</span>
                <span className="text-accent text-xs uppercase tracking-wider group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-fg-muted leading-relaxed">{item.a}</p>
            </details>
          ))
        )}
      </div>
    </div>
  )
}
