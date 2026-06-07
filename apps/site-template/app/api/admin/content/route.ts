import { NextResponse } from "next/server"
import { getSiteContent, setSiteContent } from "@/lib/stores"
import { requireAdminAuth } from "@/lib/auth/admin-auth-guard"
import type { SiteContent } from "@paragu-ai/engine"

export const dynamic = "force-static"

/**
 * ANNOTATION: Admin Content API — Full Site Content
 *
 * GET /api/admin/content?site=default — returns all content sections as SiteContent
 * PUT /api/admin/content — replaces full content (siteId + content body)
 *
 * Content shape follows @ai-whisperers/client-kit schema (SiteContent interface):
 *   { site?, hero?, about?, services?, process?, team?, testimonials?,
 *     faq?, gallery?, categories?, products?, contact?, footer?, ... }
 */
export async function GET(request: Request) {
  const auth = await requireAdminAuth(request)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(request.url)
  const siteId = searchParams.get("site") || "default"

  try {
    const content = await getSiteContent(siteId)
    const siteContent: SiteContent = content as SiteContent
    return NextResponse.json({ content: siteContent, siteId })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const auth = await requireAdminAuth(request)
  if (auth instanceof NextResponse) return auth

  const body = await request.json()
  const { siteId, content } = body as { siteId?: string; content: SiteContent }

  if (!content) {
    return NextResponse.json({ error: "content is required" }, { status: 400 })
  }

  const ok = await setSiteContent(siteId || "default", content)
  if (!ok) return NextResponse.json({ error: "Failed to save" }, { status: 500 })

  return NextResponse.json({
    section: { key: siteId || "default", content, lastUpdated: new Date().toISOString() }
  })
}