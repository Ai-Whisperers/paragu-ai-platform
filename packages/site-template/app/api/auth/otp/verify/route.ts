import { NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { createSessionToken } from "@/lib/auth/client-auth"
import { apiError } from "@/lib/api/errors"

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS_PER_WINDOW = 5

const rateLimitMap = new Map<string, { count: number; windowStart: number }>()

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(key, { count: 1, windowStart: now })
    return { allowed: true, remaining: MAX_ATTEMPTS_PER_WINDOW - 1 }
  }

  if (entry.count >= MAX_ATTEMPTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: MAX_ATTEMPTS_PER_WINDOW - entry.count }
}

function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return request.headers.get("x-real-ip") || "unknown"
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json(apiError('DB_NOT_CONFIGURED', 'Database not configured'), { status: 503 })
  }

  const { phone, code } = await request.json()
  if (!phone || !code) {
    return NextResponse.json(apiError('MISSING_FIELDS', 'Teléfono y código son requeridos'), { status: 400 })
  }

  const cleaned = phone.replace(/\D/g, "")
  const rateKey = `otp_verify:${cleaned}`
  const ipKey = `otp_verify:ip:${getClientIP(request)}`

  const phoneCheck = checkRateLimit(rateKey)
  const ipCheck = checkRateLimit(ipKey)

  if (!phoneCheck.allowed || !ipCheck.allowed) {
    return NextResponse.json(
      apiError('TOO_MANY_REQUESTS', 'Demasiados intentos. Intenta nuevamente en 15 minutos.'),
      { status: 429 }
    )
  }

  const { data: records, error } = await supabaseAdmin
    .from("otp_codes")
    .select("*")
    .eq("phone", cleaned)
    .eq("code", code)
    .eq("verified", false)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)

  if (error || !records || records.length === 0) {
    return NextResponse.json(apiError('INVALID_SIGNATURE', 'Código inválido o expirado'), { status: 401 })
  }

  await supabaseAdmin
    .from("otp_codes")
    .update({ verified: true })
    .eq("id", records[0].id)

  await supabaseAdmin
    .from("clients")
    .upsert({ phone: cleaned }, { onConflict: "phone" })

  rateLimitMap.delete(rateKey)
  rateLimitMap.delete(ipKey)

  const token = createSessionToken(cleaned)

  const response = NextResponse.json({ ok: true, phone: cleaned })
  response.cookies.set("tu-emprendimiento_client_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  })
  return response
}
