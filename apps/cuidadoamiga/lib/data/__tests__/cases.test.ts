import { describe, it, expect, vi } from 'vitest'

// ── Mutable query builder mock ──────────────────────────────────────
// Each method returns the same object for chaining. The object is
// "thenable" (has a .then method) so `await query` works like Supabase.
const mockResolved = { value: { data: [], error: null } as { data: unknown; error: null | Error } }

function mkQ() {
  const then = (resolve: (v: typeof mockResolved.value) => void, reject: (e: Error) => void) => {
    if (mockResolved.value.error) {
      reject(mockResolved.value.error)
    } else {
      resolve(mockResolved.value)
    }
  }

  const q = {
    then,
    catch: (fn: (e: Error) => void) => then(() => {}, fn),
    select: vi.fn(() => q),
    eq: vi.fn(() => q),
    gte: vi.fn(() => q),
    lte: vi.fn(() => q),
    textSearch: vi.fn(() => q),
    not: vi.fn(() => q),
    lt: vi.fn(() => q),
    limit: vi.fn(() => q),
    order: vi.fn(() => q),
    rpc: vi.fn(() => Promise.resolve({ data: null, error: new Error('rpc not found') })),
  }
  return q
}

vi.mock('@/lib/supabase/service', () => ({
  getServiceSupabase: vi.fn(() => ({
    from: vi.fn(() => mkQ()),
  })),
}))

import { searchCases, getCaseStats, getCaseStatsByCountry, getCaseStatsByState } from '../cases'

describe('searchCases', () => {
  it('returns empty result when no data', async () => {
    mockResolved.value = { data: [], error: null }
    const result = await searchCases()
    expect(result.cases).toEqual([])
    expect(result.nextCursor).toBeNull()
  })

  it('applies textSearch filter when q is provided', async () => {
    mockResolved.value = { data: [], error: null }
    const result = await searchCases({ q: 'asuncion' })
    expect(result.cases).toEqual([])
  })

  it('handles supabase error', async () => {
    mockResolved.value = { data: null, error: new Error('DB error') }
    await expect(searchCases()).rejects.toThrow('DB error')
  })

  it('generates cursor for pagination', async () => {
    const mockCases = Array.from({ length: 21 }, (_, i) => ({
      id: `case-${i}`,
      nombre: `Caso ${i}`,
      victima: `Victima ${i}`,
      tipo: 'femicidio' as const,
      pais: 'PY',
      ciudad: 'Asuncion',
      fecha: new Date(2024, 0, 21 - i).toISOString(),
      foto_url: null,
      fuentes: '[]',
    }))
    mockResolved.value = { data: mockCases, error: null }

    const result = await searchCases({ limit: 20 })
    expect(result.cases.length).toBe(20)
    expect(result.nextCursor).not.toBeNull()
  })
})

describe('getCaseStats', () => {
  it('returns zeroed stats when no data', async () => {
    mockResolved.value = { data: [], error: null }
    const stats = await getCaseStats()
    expect(stats.total).toBe(0)
    expect(stats.byPais).toEqual({})
    expect(stats.byTipo).toEqual({})
  })

  it('aggregates correctly', async () => {
    const mockRows = [
      { tipo: 'femicidio', pais: 'PY', fecha: '2024-03-01', proceso_judicial: 'en_proceso' },
      { tipo: 'femicidio', pais: 'PY', fecha: '2024-06-15', proceso_judicial: 'en_proceso' },
      { tipo: 'abuso', pais: 'AR', fecha: '2023-01-01', proceso_judicial: 'cerrado' },
    ]
    mockResolved.value = { data: mockRows, error: null }

    const stats = await getCaseStats()
    expect(stats.total).toBe(3)
    expect(stats.byPais).toEqual({ PY: 2, AR: 1 })
    expect(stats.byTipo).toEqual({ femicidio: 2, abuso: 1 })
  })
})

describe('getCaseStatsByCountry', () => {
  it('returns scoped stats for a country', async () => {
    const mockRows = [
      { tipo: 'femicidio', pais: 'PY', fecha: '2024-03-01', proceso_judicial: 'en_proceso' },
      { tipo: 'abuso', pais: 'PY', fecha: '2023-01-01', proceso_judicial: 'cerrado' },
    ]
    mockResolved.value = { data: mockRows, error: null }

    const result = await getCaseStatsByCountry('PY')
    expect(result.total).toBe(2)
    expect(Object.keys(result.byYear)).toHaveLength(2)
    expect(result.byTipo.femicidio).toBe(1)
  })
})

describe('getCaseStatsByState', () => {
  it('counts sources and states', async () => {
    const mockRows = [
      { proceso_judicial: 'en_proceso', fuentes: '[{"url":"https://..."}]' },
      { proceso_judicial: 'en_proceso', fuentes: '[]' },
      { proceso_judicial: 'cerrado', fuentes: '[{"url":"https://..."}]' },
    ]
    mockResolved.value = { data: mockRows, error: null }

    const result = await getCaseStatsByState('PY')
    expect(result.total).toBe(3)
    expect(result.withSources).toBe(2)
    expect(result.openCases).toBe(2)
    expect(result.byJudicial).toEqual({ en_proceso: 2, cerrado: 1 })
  })
})
