import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/search?q=...&lang=es
 * Searches approved cases by name, description, ciudad, and pais.
 * Case-insensitive partial matching. Returns up to 20 results.
 */
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim()
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] })
  }

  const query = q.toLowerCase()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    // Dev mode: return mock
    return NextResponse.json({
      results: [
        { id: 'example-1', nombre: 'María García', fecha: '2024-03-08', pais: 'Argentina', ciudad: 'Buenos Aires', tipo: 'femicidio', matchField: 'nombre' },
      ].filter((r) =>
        r.nombre.toLowerCase().includes(query) ||
        r.pais.toLowerCase().includes(query) ||
        r.ciudad.toLowerCase().includes(query),
      ),
    })
  }

  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const { data: cases, error } = await supabase
    .from('cases')
    .select('id, nombre, victima, fecha, tipo, pais, ciudad, descripcion')
    .eq('estado', 'aprobado')
    .or(
      `nombre.ilike.%${query}%,victima.ilike.%${query}%,ciudad.ilike.%${query}%,pais.ilike.%${query}%,descripcion.ilike.%${query}%`,
    )
    .limit(20)

  if (error) {
    console.error('[api/search] error:', error)
    return NextResponse.json({ error: 'Error de búsqueda' }, { status: 500 })
  }

  // Rank: exact match > starts-with > contains
  const ranked = (cases as any[])
    .map((c) => {
      let score = 0
      const name = (c.nombre || '').toLowerCase()
      const victima = (c.victima || '').toLowerCase()
      const ciudad = (c.ciudad || '').toLowerCase()
      const pais = (c.pais || '').toLowerCase()

      if (name === query || victima === query) score = 4
      else if (name.startsWith(query) || victima.startsWith(query)) score = 3
      else if (ciudad === query || pais === query) score = 3
      else if (ciudad.startsWith(query) || pais.startsWith(query)) score = 2
      else score = 1

      return { ...c, score, matchField: name.includes(query) ? 'nombre' : victima.includes(query) ? 'victima' : ciudad.includes(query) ? 'ciudad' : 'descripcion' }
    })
    .sort((a, b) => b.score - a.score)

  return NextResponse.json({ results: ranked })
}
