import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

export async function POST(request: Request) {
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Email y contraseña requeridos" }, { status: 400 })
  }

  // Verify against Supabase Auth
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError || !signInData.user) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
  }

  // Create response with session cookie
  const response = NextResponse.json({ ok: true, email: signInData.user.email })

  response.cookies.set("admin_session", signInData.user.email || email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })

  return response
}