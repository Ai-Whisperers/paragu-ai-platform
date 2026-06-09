import { NextRequest, NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase/server'
import { getServiceSupabase } from '@/lib/supabase/service'

// POST = approve or reject a moderator application. Owners only.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const sb = await getServerSupabase()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { data: modRow } = await sb
    .from('moderators')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (!modRow || modRow.role !== 'owner') {
    return NextResponse.json({ error: 'Solo owners pueden aprobar solicitudes' }, { status: 403 })
  }

  const { id } = await params
  const body = (await req.json().catch(() => ({}))) as { decision?: 'aprobada' | 'rechazada' }
  if (!body.decision || (body.decision !== 'aprobada' && body.decision !== 'rechazada')) {
    return NextResponse.json({ error: 'Decisión inválida' }, { status: 400 })
  }

  const svc = getServiceSupabase()
  const { error } = await svc
    .from('solicitudes_moderadoras')
    .update({ estado: body.decision })
    .eq('id', id)

  if (error) {
    console.error('[api/admin/solicitud] error:', error)
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, estado: body.decision })
}
