'use client'

import { useMemo } from 'react'
import { useUrlState } from './useUrlState'

export interface FilterState {
  pais: string | undefined
  tipo: string | undefined
  year: number | undefined
  q: string | undefined
  estado: string | undefined
}

/**
 * Type-safe filter state hook built on `useUrlState`. All filter values are
 * synced to URL search params so filters are shareable via link.
 *
 * Returns the current filter state, a setter for individual filters, and a
 * clear-all function. Use with `lib/data/cases` server functions on the
 * client side.
 *
 * The `clear` function resets all filters to undefined. Pass `exclude` to
 * preserve specific keys (e.g. `['q']` to keep the search query).
 */
export function useFilterState(exclude?: string[]) {
  const [params, setParam, clearParams] = useUrlState()

  const filters = useMemo<FilterState>(() => ({
    pais: params.pais as string | undefined,
    tipo: params.tipo as string | undefined,
    year: params.year ? parseInt(params.year as string, 10) : undefined,
    q: params.q as string | undefined,
    estado: params.estado as string | undefined,
  }), [params])

  const setFilter = (key: keyof FilterState, value: string | undefined) => {
    if (key === 'year') {
      setParam(key, value)
    } else {
      setParam(key, value)
    }
  }

  const clear = () => {
    if (exclude?.length) {
      const keep: Record<string, string> = {}
      for (const key of exclude) {
        if (filters[key as keyof FilterState]) {
          keep[key] = filters[key as keyof FilterState] as string
        }
      }
      clearParams()
      for (const [k, v] of Object.entries(keep)) {
        setParam(k, v)
      }
    } else {
      clearParams()
    }
  }

  return { filters, setFilter, clear, hasActiveFilters: Object.values(filters).some(v => v !== undefined) }
}
