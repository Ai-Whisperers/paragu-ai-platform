import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/v1/cases?page=1&limit=20&pais=...&tipo=...&estado=aprobado
 * Public API v1 — paginated, filtered list of approved cases.
 */
export async function GET(request: NextRequest) {
  const page = Math.max(1, Number(request.nextUrl.searchParams.get('page') ?? '1'))
  const limit = Math.min(100, Math.max(1, Number(request.nextUrl.searchParams.get('limit') ?? '20')))
  const pais = request.nextUrl.searchParams.get('pais') ?? ''
  const tipo = request.nextUrl.searchParams.get('tipo') ?? ''
  const estado = request.nextUrl.searchParams.get('estado') ?? 'aprobado'

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    return NextResponse.json({
      data: [],
      pagination: { page, limit, total: 0, totalPages: 0 },
    })
  }

  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  let query = supabase.from('cases').select('*', { count: 'exact' }).eq('estado', estado)
  if (pais) query = query.eq('pais', pais)
  if (tipo) query = query.eq('tipo', tipo)

  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data: cases, count, error } = await query.range(from, to)

  if (error) {
    console.error('[api/v1/cases] error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }

  const totalPages = Math.ceil((count ?? 0) / limit)

  return NextResponse.json({
    data: cases ?? [],
    pagination: { page, limit, total: count ?? 0, totalPages },
  })
}