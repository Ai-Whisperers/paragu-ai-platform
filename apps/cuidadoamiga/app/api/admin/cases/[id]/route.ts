import { NextRequest, NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase/server'
import { getServiceSupabase } from '@/lib/supabase/service'
import { CaseEditSchema } from '@/lib/validation/case'

// PATCH = update a case (owners only). Records the change in case_edits for audit.
export async function PATCH(
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
    return NextResponse.json({ error: 'Solo owners pueden editar casos' }, { status: 403 })
  }

  const { id } = await params
  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  // Allow partial updates: strip keys not in the schema before parsing
  const clean: Record<string, unknown> = {}
  const allowed = ['nombre', 'victima', 'fecha', 'tipo', 'pais', 'ciudad', 'descripcion', 'foto_url', 'fuentes', 'proceso_judicial', 'lat', 'lng', 'estado']
  for (const k of allowed) {
    if (k in (raw as Record<string, unknown>)) clean[k] = (raw as Record<string, unknown>)[k]
  }

  const parsed = CaseEditSchema.partial().safeParse(clean)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const svc = getServiceSupabase()

  // Fetch old for audit
  const { data: old } = await svc.from('cases').select('*').eq('id', id).single()
  if (!old) return NextResponse.json({ error: 'Caso no encontrado' }, { status: 404 })

  // Build the diff
  const changes: Record<string, { from: unknown; to: unknown }> = {}
  for (const [k, v] of Object.entries(parsed.data)) {
    const oldVal = (old as Record<string, unknown>)[k]
    if (JSON.stringify(oldVal) !== JSON.stringify(v)) {
      changes[k] = { from: oldVal, to: v }
    }
  }

  if (Object.keys(changes).length === 0) {
    return NextResponse.json({ ok: true, message: 'Sin cambios' })
  }

  const { error: updateErr } = await svc
    .from('cases')
    .update({ ...parsed.data, actualizado_at: new Date().toISOString() })
    .eq('id', id)

  if (updateErr) {
    console.error('[api/admin/cases PATCH] update error:', updateErr)
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }

  // Audit log
  await svc.from('case_edits').insert({
    case_id: id,
    moderator_id: user.id,
    changes,
    reason: (raw as { reason?: string }).reason ?? null,
  })

  return NextResponse.json({ ok: true, changes: Object.keys(changes) })
}

// DELETE = hard-delete a case (owners only). Always logged.
export async function DELETE(
  _req: NextRequest,
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
    return NextResponse.json({ error: 'Solo owners pueden eliminar casos' }, { status: 403 })
  }

  const { id } = await params
  const svc = getServiceSupabase()

  await svc.from('case_edits').insert({
    case_id: id,
    moderator_id: user.id,
    changes: { _action: 'delete' },
    reason: 'Owner-initiated delete',
  })

  const { error } = await svc.from('cases').delete().eq('id', id)
  if (error) {
    console.error('[api/admin/cases DELETE] error:', error)
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
