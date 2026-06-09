// Health check endpoint — used by Vercel, UptimeRobot, and the Paragu-AI
// platform's status page.
//
// Returns 200 with a JSON payload listing critical subsystem health.
// Returns 503 if any subsystem is degraded.

import { NextResponse } from 'next/server'
import { createClient as createRawClient } from '@supabase/supabase-js'

interface HealthStatus {
  status: 'ok' | 'degraded'
  timestamp: string
  checks: {
    supabase: { ok: boolean; latency_ms: number | null; error?: string }
    app: { ok: boolean; version: string }
  }
}

const APP_VERSION = process.env.npm_package_version ?? '0.0.0'

export async function GET() {
  const checks: HealthStatus['checks'] = {
    supabase: { ok: false, latency_ms: null },
    app: { ok: true, version: APP_VERSION },
  }

  // Supabase connectivity check
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (url && key && !url.includes('placeholder')) {
    const t0 = Date.now()
    try {
      const c = createRawClient(url, key, { auth: { persistSession: false } })
      const { error } = await c.from('cases').select('id', { count: 'exact', head: true }).limit(1)
      checks.supabase.latency_ms = Date.now() - t0
      checks.supabase.ok = !error
      if (error) checks.supabase.error = error.message
    } catch (err) {
      checks.supabase.ok = false
      checks.supabase.error = err instanceof Error ? err.message : 'unknown'
    }
  } else {
    checks.supabase.ok = true // not configured in dev
    checks.supabase.latency_ms = 0
  }

  const status: HealthStatus['status'] = checks.app.ok && checks.supabase.ok ? 'ok' : 'degraded'
  const code = status === 'ok' ? 200 : 503
  return NextResponse.json({ status, timestamp: new Date().toISOString(), checks } satisfies HealthStatus, {
    status: code,
    headers: { 'Cache-Control': 'no-store' },
  })
}
