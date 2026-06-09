import { NextRequest, NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase/server'
import { getServiceSupabase } from '@/lib/supabase/service'
import { CaseSubmissionSchema } from '@/lib/validation/case'

// POST = moderator creates a case directly in 'aprobado' estado (skips voting).
// For when a moderator has a verified source themselves.
export async function POST(req: NextRequest) {
  const sb = await getServerSupabase()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

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

  const parsed = CaseSubmissionSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  const svc = getServiceSupabase()
  const { data, error } = await svc
    .from('cases')
    .insert({
      ...parsed.data,
      victima: parsed.data.victima ?? null,
      foto_url: parsed.data.foto_url ?? null,
      proceso_judicial: parsed.data.proceso_judicial ?? null,
      estado: 'aprobado', // Mod-created cases are pre-approved
    })
    .select('id')
    .single()

  if (error || !data) {
    console.error('[api/admin/cases POST] error:', error)
    return NextResponse.json({ error: 'Error al crear el caso' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id: data.id }, { status: 201 })
}
