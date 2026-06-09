import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/stats?pais=...&tipo=...&desde=...&hasta=...
 * Returns aggregated statistics across approved cases.
 */
export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    // Dev mode: return mock data
    return NextResponse.json({
      total: 0,
      thisYear: 0,
      thisMonth: 0,
      byCountry: [],
      byYear: [],
      byType: [],
      byJudicialState: [],
      countries: 0,
    })
  }

  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const params = Object.fromEntries(request.nextUrl.searchParams)
  const query = supabase
    .from('cases')
    .select('*')
    .eq('estado', 'aprobado')

  if (params.pais) query.eq('pais', params.pais)
  if (params.tipo) query.eq('tipo', params.tipo)
  if (params.desde) query.gte('fecha', params.desde)
  if (params.hasta) query.lte('fecha', params.hasta)

  const { data: cases, error } = await query

  if (error) {
    console.error('[api/stats] query error:', error)
    return NextResponse.json({ error: 'Error al obtener estadísticas' }, { status: 500 })
  }

  const currentYear = new Date().getFullYear()
  const currentMonth = `${currentYear}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
  const thisYear = cases.filter((c: any) => c.fecha?.startsWith(String(currentYear)))
  const thisMonth = cases.filter((c: any) => c.fecha?.startsWith(currentMonth))

  // Aggregate by country
  const byCountryMap = new Map<string, number>()
  for (const c of cases as any[]) {
    byCountryMap.set(c.pais, (byCountryMap.get(c.pais) || 0) + 1)
  }
  const byCountry = Array.from(byCountryMap.entries())
    .map(([pais, count]) => ({ pais, count }))
    .sort((a, b) => b.count - a.count)

  // Aggregate by year
  const byYearMap = new Map<string, number>()
  for (const c of cases as any[]) {
    const year = c.fecha?.slice(0, 4)
    if (year) byYearMap.set(year, (byYearMap.get(year) || 0) + 1)
  }
  const byYear = Array.from(byYearMap.entries())
    .map(([year, count]) => ({ year: Number(year), count }))
    .sort((a, b) => a.year - b.year)

  // Aggregate by type
  const byTypeMap = new Map<string, number>()
  for (const c of cases as any[]) {
    byTypeMap.set(c.tipo, (byTypeMap.get(c.tipo) || 0) + 1)
  }
  const byType = Array.from(byTypeMap.entries()).map(([tipo, count]) => ({ tipo, count }))

  // Aggregate by judicial state
  const byJudicialStateMap = new Map<string, number>()
  for (const c of cases as any[]) {
    const state = c.proceso_judicial || 'sin_datos'
    byJudicialStateMap.set(state, (byJudicialStateMap.get(state) || 0) + 1)
  }
  const byJudicialState = Array.from(byJudicialStateMap.entries()).map(([state, count]) => ({ state, count }))

  return NextResponse.json({
    total: cases.length,
    thisYear: thisYear.length,
    thisMonth: thisMonth.length,
    countries: byCountryMap.size,
    byCountry,
    byYear,
    byType,
    byJudicialState,
  })
}
