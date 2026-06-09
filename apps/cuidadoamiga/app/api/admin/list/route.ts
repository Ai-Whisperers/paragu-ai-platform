import { NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase/server'
import { getServiceSupabase } from '@/lib/supabase/service'

// GET = list all cases + solicitudes for the moderation panel.
// Auth: must be authenticated and present in the `moderators` table.
export async function GET() {
  const sb = await getServerSupabase()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { data: modRow } = await sb
    .from('moderators')
    .select('user_id')
    .eq('user_id', user.id)
    .single()
  if (!modRow) return NextResponse.json({ error: 'No sos moderadora' }, { status: 403 })

  // Service-role bypasses RLS so we can see all cases (not just approved)
  const svc = getServiceSupabase()

  const [casesRes, validacionesRes, solicitudesRes] = await Promise.all([
    svc.from('cases').select('*').order('creado_at', { ascending: false }).limit(500),
    svc.from('validaciones').select('*').order('created_at', { ascending: false }).limit(2000),
    svc.from('solicitudes_moderadoras').select('*').order('creado_at', { ascending: false }).limit(500),
  ])

  if (casesRes.error) {
    console.error('[api/admin/list] cases error:', casesRes.error)
    return NextResponse.json({ error: 'Error al listar casos' }, { status: 500 })
  }

  // Group validaciones by caso_id
  const valByCase = new Map<string, Array<{ id: string; decision: 'aprobado' | 'rechazado'; moderadora_id: string; motivo_rechazo: string | null }>>()
  for (const v of (validacionesRes.data ?? []) as Array<{ id: string; caso_id: string; decision: 'aprobado' | 'rechazado'; moderadora_id: string; motivo_rechazo: string | null }>) {
    const list = valByCase.get(v.caso_id) ?? []
    list.push({ id: v.id, decision: v.decision, moderadora_id: v.moderadora_id, motivo_rechazo: v.motivo_rechazo })
    valByCase.set(v.caso_id, list)
  }

  const cases = ((casesRes.data ?? []) as Array<{ id: string }>).map((c) => ({
    ...c,
    validaciones: valByCase.get(c.id) ?? [],
  }))

  return NextResponse.json({
    cases,
    solicitudes: solicitudesRes.data ?? [],
  })
}
