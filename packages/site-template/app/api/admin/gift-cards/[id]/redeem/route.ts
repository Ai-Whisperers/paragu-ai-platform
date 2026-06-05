import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { requireAdminAuth } from "@/lib/auth/admin-auth-guard"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminAuth(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params

  try {
    const body = await req.json()
    const { amount, notes, redeemedBy } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Amount must be positive" }, { status: 400 })
    }

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data: card, error: cardError } = await supabaseAdmin
        .from("gift_cards")
        .select("id, balance, status")
        .eq("id", id)
        .single()

      if (cardError || !card) {
        return NextResponse.json({ error: "Card not found" }, { status: 404 })
      }

      if (card.status !== "active") {
        return NextResponse.json({ error: "Card is not active" }, { status: 400 })
      }

      if (amount > card.balance) {
        return NextResponse.json({ error: "Amount exceeds balance" }, { status: 400 })
      }

      const newBalance = card.balance - amount
      const newStatus = newBalance === 0 ? "redeemed" : "active"

      await supabaseAdmin
        .from("gift_cards")
        .update({ balance: newBalance, status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", id)

      await supabaseAdmin.from("gift_card_transactions").insert({
        gift_card_id: id,
        type: "redeem",
        amount,
        balance_after: newBalance,
        notes: notes || null,
        redeemed_by: redeemedBy || null,
      })

      return NextResponse.json({
        success: true,
        balance: newBalance,
        status: newStatus,
      })
    }

    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
  } catch (err) {
    console.error("Error redeeming gift card:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}