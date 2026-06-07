// Admin content API — disabled. Content is managed via content/ files.
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ error: "Content API disabled. Edit content/es.json and content/en.json directly." }, { status: 501 })
}

export async function POST() {
  return NextResponse.json({ error: "Content API disabled." }, { status: 501 })
}
