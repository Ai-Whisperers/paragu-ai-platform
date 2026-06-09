import { NextRequest, NextResponse } from 'next/server'
import { CaseSubmissionSchema, validationErrorResponse } from '@/lib/validation/case'
import { getServerSupabase } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const parsed = CaseSubmissionSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json(validationErrorResponse(parsed.error), { status: 400 })
  }

  // RLS is the security boundary: the `public insert pendiente` policy in
  // supabase/schema.sql guarantees this can ONLY write rows with
  // `estado = 'pendiente'`, no matter what the client sends.
  const supabase = await getServerSupabase()
  const { error } = await supabase.from('cases').insert({
    ...parsed.data,
    victima: parsed.data.victima ?? null,
    foto_url: parsed.data.foto_url ?? null,
    proceso_judicial: parsed.data.proceso_judicial ?? null,
  })

  if (error) {
    console.error('[api/cases] insert error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
