import { NextResponse } from "next/server"
import { getGiftCards, getGiftCard, createGiftCard, updateGiftCardBalance } from "@/lib/stores"
import { requireAdminAuth } from "@/lib/auth/admin-auth-guard"
import type { GiftCard } from "@/lib/stores"

interface CreateGiftCardInput {
  amount: number
  recipient_name?: string
  recipient_email?: string
  recipient_phone?: string
  purchaser_phone?: string
  valid_months?: number
}

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const cards = await getGiftCards()
    return NextResponse.json({ cards })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminAuth(request)
  if (auth instanceof NextResponse) return auth

  const { amount, recipientName, recipientEmail, recipientPhone, purchaserPhone, validMonths } = await request.json() as {
    amount?: number
    recipientName?: string
    recipientEmail?: string
    recipientPhone?: string
    purchaserPhone?: string
    validMonths?: number
  }

  if (!amount || amount < 10000) {
    return NextResponse.json({ error: "Monto mínimo: Gs. 10,000" }, { status: 400 })
  }

  try {
    const input: CreateGiftCardInput = {
      amount,
      recipient_name: recipientName || undefined,
      recipient_email: recipientEmail || undefined,
      recipient_phone: recipientPhone || undefined,
      purchaser_phone: purchaserPhone || undefined,
      valid_months: validMonths || 6,
    }
    const card: GiftCard = await createGiftCard(input)
    return NextResponse.json({
      id: card.id,
      code: card.code || card.token?.slice(0, 8).toUpperCase(),
      token: card.token,
      denomination: card.amount,
      balance: card.balance,
      recipient_name: card.recipient_name,
      recipient_phone: card.recipient_phone,
      purchaser_phone: card.purchaser_phone,
      status: card.status,
      valid_until: card.valid_until,
    }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const auth = await requireAdminAuth(request)
  if (auth instanceof NextResponse) return auth

  const { token, amount } = await request.json() as { token?: string; amount?: number }
  if (!token || amount === undefined) {
    return NextResponse.json({ error: "token y amount requeridos" }, { status: 400 })
  }

  try {
    const card = await getGiftCard(token)
    if (!card) {
      return NextResponse.json({ error: "Tarjeta no encontrada" }, { status: 404 })
    }
    const result = await updateGiftCardBalance(token, amount, card.balance)
    if (!result.success) {
      const msg = result.conflict ? "Conflicto de versión, intente de nuevo" : "Error actualizando"
      return NextResponse.json({ error: msg }, { status: result.conflict ? 409 : 404 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}