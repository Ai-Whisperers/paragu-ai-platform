import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { SolicitudSchema } from '@/lib/validation/solicitud'
import { getServiceSupabase } from '@/lib/supabase/service'

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

export async function POST(req: NextRequest) {
  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const parsed = SolicitudSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const supabase = getServiceSupabase()
  const { error: dbError } = await supabase.from('solicitudes_moderadoras').insert({
    nombre: parsed.data.nombre,
    mail: parsed.data.mail,
    pais: parsed.data.pais,
    organizacion: parsed.data.organizacion ?? null,
    motivo: parsed.data.motivo,
    como_se_entero: parsed.data.como_se_entero,
    estado: 'pendiente',
  })

  if (dbError) {
    console.error('[api/solicitud] db error:', dbError)
    return NextResponse.json({ error: 'Error al guardar la solicitud.' }, { status: 500 })
  }

  const resend = getResend()
  if (resend) {
    const { error: mailError } = await resend.emails.send({
      from: 'Cuidado Amiga <noreply@cuidadoamiga.com>',
      to: 'cuidadoamiga@proton.me',
      subject: `Nueva solicitud de moderadora — ${parsed.data.nombre}`,
      html: `<p>${parsed.data.nombre} (${parsed.data.mail}) desde ${parsed.data.pais} quiere ser moderadora.</p>
             <p>Cómo se enteró: ${parsed.data.como_se_entero}</p>
             <blockquote>${parsed.data.motivo}</blockquote>`,
    })
    if (mailError) {
      console.error('[api/solicitud] mail error:', mailError)
    }
  } else {
    console.warn('[api/solicitud] RESEND_API_KEY not set — skipping email notification')
  }

  return NextResponse.json({ ok: true })
}
