'use client'

import { useCallback, useMemo } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

type UrlState = Record<string, string | string[] | undefined>

/**
 * Generic URL state sync hook. Reads and writes to URL search params
 * via Next.js App Router. Handles array params, clearing, and reset.
 *
 * Example:
 * ```ts
 * const [params, setParam, clearParams] = useUrlState()
 * // params.pais -> 'AR' or undefined
 * // setParam('pais', 'BR') -> ?pais=BR
 * // setParam('tipo', ['femicidio', 'abuso']) -> ?tipo=femicidio&tipo=abuso
 * ```
 */
export function useUrlState() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const state = useMemo<UrlState>(() => {
    const result: UrlState = {}
    const seen = new Set<string>()
    for (const [key, value] of searchParams.entries()) {
      if (seen.has(key)) {
        const prev = result[key]
        result[key] = Array.isArray(prev) ? [...prev, value] : [prev as string, value]
      } else {
        result[key] = value
        seen.add(key)
      }
    }
    return result
  }, [searchParams])

  const setParam = useCallback(
    (key: string, value: string | string[] | undefined) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(key)
      if (value !== undefined) {
        if (Array.isArray(value)) {
          for (const v of value) params.append(key, v)
        } else {
          params.set(key, value)
        }
      }
      const qs = params.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  const clearParams = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [router, pathname])

  return [state, setParam, clearParams] as const
}
