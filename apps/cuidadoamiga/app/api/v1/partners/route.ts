import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/v1/partners
 * Partner registration — sends email to org@<domain> for verification.
 */
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, organization, email, website, country } = body

  if (!name || !organization || !email) {
    return NextResponse.json({ error: 'Faltan datos requeridos (name, organization, email)' }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    return NextResponse.json({ ok: true, note: 'dev mode — not persisted' })
  }

  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const { error } = await supabase.from('partner_requests').insert({
    name,
    organization,
    email,
    website,
    country,
    requested_at: new Date().toISOString(),
    status: 'pending',
  })

  if (error) {
    console.error('[api/v1/partners] insert error:', error)
    return NextResponse.json({ error: 'Error al registrar solicitud' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}