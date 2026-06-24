import { NextResponse } from 'next/server'

/**
 * GET /api/health
 *
 * Lightweight liveness/readiness probe used by:
 *   - Docker HEALTHCHECK in Dockerfile.standalone
 *   - scripts/health-check.sh (cron)
 *   - Uptime monitors
 *
 * Returns 200 with a small JSON payload. Does NOT check Supabase / external
 * services — it's a pure liveness check. For readiness (with dependency
 * checks), add /api/readyz as a separate route.
 */

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      service: 'nexa-paraguay',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '0.0.0',
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Content-Type': 'application/json; charset=utf-8',
      },
    },
  )
}
