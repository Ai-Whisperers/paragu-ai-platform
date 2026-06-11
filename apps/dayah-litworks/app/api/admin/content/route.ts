// Admin content API — disabled. Content is managed via content/es.json.
// To re-enable, install @supabase/supabase-js and configure env vars.
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ error: "Content API disabled — edit content/es.json directly" }, { status: 501 })
}

export async function PUT() {
  return NextResponse.json({ error: "Content API disabled — edit content/es.json directly" }, { status: 501 })
}
