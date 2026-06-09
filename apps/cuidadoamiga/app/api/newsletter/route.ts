import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, lang } = body

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    return NextResponse.json({ ok: true, note: 'dev mode — not persisted' })
  }

  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const { error } = await supabase.from('newsletter_subscriptions').insert({ email, lang: lang ?? 'es', subscribed_at: new Date().toISOString() })

  if (error) {
    console.error('[api/newsletter] insert error:', error)
    return NextResponse.json({ error: 'Error al suscribirse' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}