import { NextRequest, NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase/server'
import { getServiceSupabase } from '@/lib/supabase/service'
import { z } from 'zod'

const VoteSchema = z.object({
  caso_id: z.string().uuid(),
  decision: z.enum(['aprobado', 'rechazado']),
  motivo_rechazo: z.string().max(500).optional().nullable(),
})

// POST = cast a moderator vote on a case.
// Auth: must be authenticated and present in the `moderators` table.
// The `validaciones_tally` trigger atomically transitions the case estado.
export async function POST(req: NextRequest) {
  // Auth check
  const sb = await getServerSupabase()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const { data: modRow } = await sb
    .from('moderators')
    .select('user_id')
    .eq('user_id', user.id)
    .single()

  if (!modRow) {
    return NextResponse.json({ error: 'No sos moderadora' }, { status: 403 })
  }

  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const parsed = VoteSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  // Use service-role to bypass the mod-INSERT RLS check (we already
  // verified the user is a moderator above; service-role lets us also
  // fetch the new estado after the trigger fires).
  const svc = getServiceSupabase()

  // Check case is still pendiente (idempotency / prevent double-vote after state change)
  const { data: caseRow, error: caseErr } = await svc
    .from('cases')
    .select('estado')
    .eq('id', parsed.data.caso_id)
    .single()

  if (caseErr || !caseRow) {
    return NextResponse.json({ error: 'Caso no encontrado' }, { status: 404 })
  }
  if (caseRow.estado !== 'pendiente') {
    return NextResponse.json({ error: 'Este caso ya no está pendiente' }, { status: 409 })
  }

  // Check if moderator already voted
  const { data: existing } = await svc
    .from('validaciones')
    .select('id')
    .eq('caso_id', parsed.data.caso_id)
    .eq('moderadora_id', user.id)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: 'Ya votaste en este caso' }, { status: 409 })
  }

  // Cast vote
  const { error: voteErr } = await svc.from('validaciones').insert({
    caso_id: parsed.data.caso_id,
    moderadora_id: user.id,
    decision: parsed.data.decision,
    motivo_rechazo: parsed.data.motivo_rechazo ?? null,
  })

  if (voteErr) {
    console.error('[api/admin/vote] insert error:', voteErr)
    return NextResponse.json({ error: 'Error al registrar el voto' }, { status: 500 })
  }

  // Fetch the new estado (the trigger has already run)
  const { data: updated } = await svc
    .from('cases')
    .select('estado')
    .eq('id', parsed.data.caso_id)
    .single()

  return NextResponse.json({ ok: true, estado: updated?.estado ?? 'pendiente' })
}
