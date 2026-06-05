import { NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

interface HealthStatus {
  ok: boolean
  timestamp: string
  version: string
  env: string
  checks: {
    database: { ok: boolean; message: string }
    stripe: { ok: boolean; message: string }
    auth: { ok: boolean; message: string }
  }
}

export async function GET(): Promise<NextResponse> {
  const checks: HealthStatus["checks"] = {
    database: { ok: false, message: "not configured" },
    stripe: { ok: false, message: "not configured" },
    auth: { ok: false, message: "not configured" },
  }

  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin.from("bookings").select("id").limit(1)
      checks.database = error
        ? { ok: false, message: error.message }
        : { ok: true, message: "connected" }
    } catch (err) {
      checks.database = {
        ok: false,
        message: err instanceof Error ? err.message : "connection failed",
      }
    }
  } else {
    checks.database = { ok: false, message: "not configured" }
  }

  checks.stripe = process.env.STRIPE_SECRET_KEY
    ? { ok: true, message: "configured" }
    : { ok: false, message: "not configured" }

  checks.auth = process.env.CLIENT_AUTH_SECRET
    ? { ok: true, message: "configured" }
    : { ok: false, message: "not configured" }

  const allOk = checks.database.ok && checks.stripe.ok && checks.auth.ok

  const status: HealthStatus = {
    ok: allOk,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
    env: process.env.NODE_ENV || "development",
    checks,
  }

  return NextResponse.json(status, { status: allOk ? 200 : 503 })
}