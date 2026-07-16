import { NextResponse } from "next/server";

// Lightweight health endpoint. No DB calls, no auth, no caching.
// Used by uptime monitors and cron health probes.
//
// Returns 200 OK if the service is alive and serving.
//
// OPSEC note: we DO NOT include version/build info here (attack surface).
// We also DO NOT include uptime (it leaks deploy cadence).

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "somosgay-site",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, private",
        "X-Robots-Tag": "noindex, nofollow",
      },
    }
  );
}