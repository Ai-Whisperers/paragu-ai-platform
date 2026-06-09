import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { case_id, motivo, detalle } = body

    if (!case_id || !motivo) {
      return NextResponse.json({ error: 'Faltan datos requeridos (case_id, motivo)' }, { status: 400 })
    }

    const validMotivos = ['factual_error', 'wrong_photo', 'wrong_person', 'fabricated', 'duplicate', 'other']
    if (!validMotivos.includes(motivo)) {
      return NextResponse.json({ error: 'Motivo inválido' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl) {
      // Dev mode: pretend it worked
      return NextResponse.json({ success: true, note: 'dev mode — not persisted' })
    }

    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      supabaseUrl,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    const { error: dbError } = await supabase.from('case_reports').insert({
      case_id,
      motivo,
      detalle: detalle || null,
      status: 'pendiente',
    })

    if (dbError) {
      console.error('case_reports insert error:', dbError)
      return NextResponse.json({ error: 'Error al guardar el reporte' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('case_reports endpoint error:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
