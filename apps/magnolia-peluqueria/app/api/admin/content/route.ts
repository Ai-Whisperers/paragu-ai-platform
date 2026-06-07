import { NextResponse } from "next/server"
import { getSiteContent, setSiteContent } from "@/lib/data-store"

export const dynamic = "force-static"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const siteId = searchParams.get("site") || "default"

  try {
    const content = await getSiteContent(siteId)
    return NextResponse.json({ content, siteId })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const { siteId, content } = await request.json()
  if (!content) return NextResponse.json({ error: "Missing content" }, { status: 400 })

  const ok = await setSiteContent(siteId || "default", content)
  if (!ok) return NextResponse.json({ error: "Failed to save" }, { status: 500 })

  return NextResponse.json({ ok: true })
}
