import { getServiceSupabase } from '@/lib/supabase/service'
import type { Case } from '@/lib/types'

// ── Types ──────────────────────────────────────────────────────────────

export interface CaseFilters {
  pais?: string
  tipo?: 'femicidio' | 'abuso' | 'acoso'
  year?: number
  estado?: 'aprobado' | 'pendiente' | 'rechazado'
  q?: string
  hasPhoto?: boolean
  hasSources?: boolean
  limit?: number
  cursor?: string
}

export interface CaseSearchResult {
  cases: Pick<Case, 'id' | 'nombre' | 'victima' | 'tipo' | 'pais' | 'ciudad' | 'fecha' | 'foto_url' | 'fuentes'>[]
  nextCursor: string | null
}

export interface CaseStats {
  total: number
  byPais: Record<string, number>
  byTipo: Record<string, number>
  byYear: Record<number, number>
  byJudicial: Record<string, number>
}

// ── Queries ────────────────────────────────────────────────────────────

const BASE_QUERY = () =>
  getServiceSupabase()
    .from('cases')
    .select('id, nombre, victima, tipo, pais, ciudad, fecha, foto_url, fuentes, proceso_judicial, estado, visible')
    .eq('estado', 'aprobado')
    .eq('visible', true)
    .order('fecha', { ascending: false })

/**
 * Search cases with optional filters. Returns cursor-based pagination.
 * Designed for the /casos list page and the /data page.
 */
export async function searchCases(filters: CaseFilters = {}): Promise<CaseSearchResult> {
  const limit = filters.limit ?? 20
  let query = BASE_QUERY()

  if (filters.pais) query = query.eq('pais', filters.pais)
  if (filters.tipo) query = query.eq('tipo', filters.tipo)
  if (filters.year) {
    const start = new Date(filters.year, 0, 1).toISOString().split('T')[0]
    const end = new Date(filters.year, 11, 31).toISOString().split('T')[0]
    query = query.gte('fecha', start).lte('fecha', end)
  }
  if (filters.q) {
    query = query.textSearch('fulltext_search', filters.q, {
      type: 'websearch',
      config: 'spanish',
    })
  }
  if (filters.hasPhoto) query = query.not('foto_url', 'is', null)
  if (filters.hasSources) query = query.not('fuentes', 'eq', '[]')

  if (filters.cursor) {
    query = query.lt('fecha', filters.cursor)
  }

  query = query.limit(limit + 1) // fetch 1 extra to detect cursor

  const { data, error } = await query
  if (error) throw new Error(`Failed to search cases: ${error.message}`)
  const records = data ?? []

  const hasMore = records.length > limit
  const cases = records.slice(0, limit)
  const nextCursor = hasMore && cases.length > 0
    ? cases[cases.length - 1]!.fecha
    : null

  return { cases, nextCursor }
}

/**
 * Fetch aggregate stats for the /data page. Results are cached for 1h by
 * the caller (via `Cache-Control` headers). Pass filters to scope stats
 * (e.g., per-country page).
 */
export async function getCaseStats(filters: Omit<CaseFilters, 'limit' | 'cursor'> = {}): Promise<CaseStats> {
  // Use the Postgres RPC when available; fall back to client-side aggregation
  try {
    const { data, error } = await getServiceSupabase().rpc('get_case_stats', {
      p_pais: filters.pais ?? null,
      p_year: filters.year ?? null,
    })
    if (!error && data) return data as unknown as CaseStats
  } catch {
    // RPC not available yet — fall through to client aggregation
  }

  // Client-side aggregation (works with any PostgREST instance)
  let query = getServiceSupabase().from('cases').select('tipo, pais, fecha, proceso_judicial').eq('estado', 'aprobado').eq('visible', true)
  if (filters.pais) query = query.eq('pais', filters.pais)
  if (filters.year) {
    const start = `${filters.year}-01-01`
    const end = `${filters.year}-12-31`
    query = query.gte('fecha', start).lte('fecha', end)
  }

  const { data, error } = await query
  if (error) throw new Error(`Failed to fetch stats: ${error.message}`)
  if (!data) return { total: 0, byPais: {}, byTipo: {}, byYear: {}, byJudicial: {} }

  const rows = data as Array<{ tipo: string; pais: string; fecha: string; proceso_judicial: string | null }>
  const byPais: Record<string, number> = {}
  const byTipo: Record<string, number> = {}
  const byYear: Record<number, number> = {}
  const byJudicial: Record<string, number> = {}

  for (const row of rows) {
    byPais[row.pais] = (byPais[row.pais] ?? 0) + 1
    byTipo[row.tipo] = (byTipo[row.tipo] ?? 0) + 1
    const year = new Date(row.fecha).getFullYear()
    byYear[year] = (byYear[year] ?? 0) + 1
    const js = row.proceso_judicial ?? 'no_especificado'
    byJudicial[js] = (byJudicial[js] ?? 0) + 1
  }

  return {
    total: rows.length,
    byPais,
    byTipo,
    byYear,
    byJudicial,
  }
}

/**
 * Per-country stats. Scoped to one country, used on /data/[pais] pages.
 */
export async function getCaseStatsByCountry(pais: string): Promise<{
  total: number
  byYear: Record<number, number>
  byTipo: Record<string, number>
}> {
  const stats = await getCaseStats({ pais })
  return {
    total: stats.total,
    byYear: stats.byYear,
    byTipo: stats.byTipo,
  }
}

/**
 * State-level breakdown for a country. Returns case counts by judicial
 * state (en_proceso / cerrado), plus source-verified count.
 */
export async function getCaseStatsByState(pais: string): Promise<{
  total: number
  withSources: number
  openCases: number
  byJudicial: Record<string, number>
}> {
  const query = getServiceSupabase()
    .from('cases')
    .select('proceso_judicial, fuentes')
    .eq('estado', 'aprobado')
    .eq('visible', true)
    .eq('pais', pais)

  const { data, error } = await query
  if (error) throw new Error(`Failed to fetch state stats: ${error.message}`)
  if (!data) return { total: 0, withSources: 0, openCases: 0, byJudicial: {} }

  const rows = data as Array<{ proceso_judicial: string | null; fuentes: string }>
  const byJudicial: Record<string, number> = {}
  let withSources = 0
  let openCases = 0

  for (const row of rows) {
    const js = row.proceso_judicial ?? 'no_especificado'
    byJudicial[js] = (byJudicial[js] ?? 0) + 1
    if (row.fuentes && row.fuentes !== '[]') withSources++
    if (js === 'en_proceso') openCases++
  }

  return {
    total: rows.length,
    withSources,
    openCases,
    byJudicial,
  }
}
