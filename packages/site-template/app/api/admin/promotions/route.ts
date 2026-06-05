import { NextResponse } from "next/server"
import { getPromotions, createPromotion, updatePromotion, deletePromotion } from "@/lib/stores"
import { requireAdminAuth } from "@/lib/auth/admin-auth-guard"

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const promotions = await getPromotions()
    return NextResponse.json({ promotions })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminAuth(request)
  if (auth instanceof NextResponse) return auth

  const body = await request.json()
  const { title, subtitle, badge, description, wa_message, color, expires_at, is_active, sort_order } = body

  if (!title) return NextResponse.json({ error: "title requerido" }, { status: 400 })

  const promo = await createPromotion({
    title,
    subtitle,
    badge,
    description,
    wa_message,
    color: color || "secondary",
    expires_at,
    is_active: is_active ?? true,
    sort_order: sort_order || 0,
  })

  return NextResponse.json(promo, { status: 201 })
}

export async function PATCH(request: Request) {
  const auth = await requireAdminAuth(request)
  if (auth instanceof NextResponse) return auth

  const { id, ...updates } = await request.json()
  if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 })

  const result = await updatePromotion(id, updates)
  if (!result) return NextResponse.json({ error: "Promoción no encontrada" }, { status: 404 })

  return NextResponse.json(result)
}

export async function DELETE(request: Request) {
  const auth = await requireAdminAuth(request)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 })

  const ok = await deletePromotion(id)
  if (!ok) return NextResponse.json({ error: "Promoción no encontrada" }, { status: 404 })

  return NextResponse.json({ ok: true })
}