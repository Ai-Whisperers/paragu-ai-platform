'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { SearchInput } from '@/components/ui/SearchInput'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import type { UiSearch } from '@/lib/content-types'

interface SearchResult {
  id: string
  nombre: string
  victima: string | null
  fecha: string
  tipo: string
  pais: string
  ciudad: string
  matchField: string
}

interface SearchClientProps {
  lang: string
  ui: UiSearch
}

const TYPE_LABELS: Record<string, string> = {
  femicidio: 'Femicidio',
  abuso: 'Abuso',
  acoso: 'Acoso',
}

export function SearchClient({ lang, ui }: SearchClientProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const performSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([])
      setSearched(false)
      return
    }
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&lang=${lang}`)
      const data = await res.json()
      setResults(data.results || [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [lang])

  const handleChange = useCallback((value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => performSearch(value), 300)
  }, [performSearch])

  // Cleanup
  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current) }, [])

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <Badge tone="rose" className="mb-4">
        {lang === 'es' ? 'Búsqueda' : lang === 'en' ? 'Search' : 'Busca'}
      </Badge>
      <h1 className="text-3xl md:text-4xl font-black mb-6">
        {lang === 'es' ? 'Buscar casos' : lang === 'en' ? 'Search cases' : 'Buscar casos'}
      </h1>

      <SearchInput value={query} onChange={handleChange} ui={ui} className="mb-6" />

      {loading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner ui={{ loading: ui.searching, saving: '', processing: '', error: '' }} />
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <EmptyState title={ui.noResults} />
      )}

      {!loading && results.length > 0 && (
        <div>
          <p className="text-sm text-neutral-500 mb-4">
            {ui.resultsCount.replace('{count}', String(results.length))}
          </p>
          <div className="flex flex-col gap-3">
            {results.map((r) => (
              <Link key={r.id} href={`/${lang}/casos/${r.id}`}>
                <Card padding="md" className="cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-neutral-900 dark:text-white">{r.nombre}</h3>
                      {r.victima && <p className="text-xs text-neutral-500">{r.victima}</p>}
                      <p className="text-xs text-neutral-400 mt-1">{r.ciudad}, {r.pais}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-neutral-400 block">{r.fecha}</span>
                      <span className="text-xs text-rose-500">{TYPE_LABELS[r.tipo] || r.tipo}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
