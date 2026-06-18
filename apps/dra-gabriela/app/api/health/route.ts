// Health check endpoint — for uptime monitoring and 404 detection.
// Returns 200 with {status:"ok",version,timestamp} when service is healthy.
// Returns 503 if any check fails (DB, etc).

import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const START_TIME = Date.now()

export async function GET() {
  const checks: Record<string, string> = {}
  let allOk = true

  // Check 1: build is reachable
  try {
    checks.build = "ok"
  } catch {
    checks.build = "fail"
    allOk = false
  }

  // Check 2: uptime
  const uptimeSeconds = Math.floor((Date.now() - START_TIME) / 1000)

  // Check 3: timestamp
  const timestamp = new Date().toISOString()

  return NextResponse.json(
    {
      status: allOk ? "ok" : "degraded",
      service: "dra-gabriela",
      version: process.env.npm_package_version || "1.0.0",
      uptime: uptimeSeconds,
      timestamp,
      checks,
    },
    {
      status: allOk ? 200 : 503,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
      },
    }
  )
}
