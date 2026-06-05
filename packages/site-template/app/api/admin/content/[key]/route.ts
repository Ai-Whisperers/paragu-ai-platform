import { NextResponse } from "next/server"
import { setSiteContent } from "@/lib/stores"
import { requireAdminAuth } from "@/lib/auth/admin-auth-guard"
import type { SiteContent } from "@ai-whisperers/client-kit"

/**
 * ANNOTATION: Admin Content API — Single Section by Key
 *
 * PUT /api/admin/content/[key] — update one named section within the site content.
 * The key is the content section name (e.g. "hero", "services", "footer").
 * Body shape: { content: SiteContent[keyof SiteContent] }
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const auth = await requireAdminAuth(request)
  if (auth instanceof NextResponse) return auth

  const { key } = await params
  const { content } = await request.json() as { content: SiteContent[keyof SiteContent] }

  if (!content) {
    return NextResponse.json({ error: "content is required" }, { status: 400 })
  }

  try {
    const existing = await import("@/lib/stores").then(m => m.getSiteContent("default"))
    const updated = { ...existing, [key]: content }
    const ok = await setSiteContent("default", updated)
    if (!ok) {
      return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 })
    }
    return NextResponse.json({ section: { key, content, lastUpdated: new Date().toISOString() } })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}