import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/cases/export?pais=...&tipo=...&desde=...&hasta=...
 * Returns a CSV download of filtered approved cases.
 */
export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    // Dev mode: return example CSV
    const exampleCsv = `id,nombre,victima,fecha,tipo,pais,ciudad,descripcion,proceso_judicial,fuentes
example-1,María García,,2024-03-08,femicidio,Argentina,Buenos Aires,Caso de ejemplo,en_proceso,"[""https://example.com""]"`
    return new NextResponse(exampleCsv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="casos-ejemplo.csv"',
      },
    })
  }

  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const params = Object.fromEntries(request.nextUrl.searchParams)
  let query = supabase.from('cases').select('*').eq('estado', 'aprobado').order('fecha', { ascending: false })

  if (params.pais) query = query.eq('pais', params.pais)
  if (params.tipo) query = query.eq('tipo', params.tipo)

  const { data: cases, error } = await query

  if (error) {
    console.error('[api/cases/export] error:', error)
    return NextResponse.json({ error: 'Error al exportar' }, { status: 500 })
  }

  // Build CSV
  const headers = ['id', 'nombre', 'victima', 'fecha', 'tipo', 'pais', 'ciudad', 'descripcion', 'proceso_judicial', 'fuentes']
  const rows = (cases as any[]).map((c) =>
    headers
      .map((h) => {
        const val = c[h] ?? ''
        const str = String(val)
        // Escape CSV fields containing commas, quotes, or newlines
        return str.includes(',') || str.includes('"') || str.includes('\n')
          ? `"${str.replace(/"/g, '""')}"`
          : str
      })
      .join(','),
  )

  const csv = [headers.join(','), ...rows].join('\n')
  const filename = `casos-${params.pais || 'todos'}-${new Date().toISOString().slice(0, 10)}.csv`

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
