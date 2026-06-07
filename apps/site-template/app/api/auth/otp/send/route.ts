import { NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { business, getSiteName } from "@/lib/config/config"
import { apiError } from "@/lib/api/errors"

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json(apiError('DB_NOT_CONFIGURED', 'Database not configured'), { status: 503 })
  }

  const { phone } = await request.json()
  if (!phone || phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json(apiError('VALIDATION_ERROR', 'Ingresá un número de WhatsApp válido'), { status: 400 })
  }

  const cleaned = phone.replace(/\D/g, "")

  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
  const { count } = await supabaseAdmin
    .from("otp_codes")
    .select("*", { count: "exact", head: true })
    .eq("phone", cleaned)
    .gt("created_at", fiveMinAgo)

  if (count && count >= 3) {
    return NextResponse.json(apiError('RATE_LIMITED', 'Demasiados intentos. Esperá 5 minutos.'), { status: 429 })
  }

  const code = generateCode()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()

  await supabaseAdmin.from("otp_codes").insert({
    phone: cleaned,
    code,
    expires_at: expiresAt,
  })

  const waMsg = encodeURIComponent(`Tu código de verificación ${getSiteName()} es: ${code}. Válido por 10 minutos.`)
  const waUrl = `https://wa.me/${business.whatsapp}?text=${waMsg}`

  return NextResponse.json({ ok: true, waUrl, phone: cleaned })
}
