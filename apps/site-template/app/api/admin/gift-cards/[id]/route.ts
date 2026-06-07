import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { requireAdminAuth } from "@/lib/auth/admin-auth-guard"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminAuth(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params

  if (isSupabaseConfigured && supabaseAdmin) {
    const { data: card, error: cardError } = await supabaseAdmin
      .from("gift_cards")
      .select("*")
      .eq("id", id)
      .single()

    if (!cardError && card) {
      const { data: transactions } = await supabaseAdmin
        .from("gift_card_transactions")
        .select("*")
        .eq("gift_card_id", id)
        .order("created_at", { ascending: true })

      return NextResponse.json({ ...card, transactions: transactions || [] })
    }
  }

  return NextResponse.json({ error: "Card not found" }, { status: 404 })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminAuth(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params

  try {
    const body = await req.json()
    const { status } = body

    const validStatuses = ["active", "redeemed", "cancelled", "expired"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data: card } = await supabaseAdmin
        .from("gift_cards")
        .select("id, balance")
        .eq("id", id)
        .single()

      if (card) {
        await supabaseAdmin
          .from("gift_cards")
          .update({ status, updated_at: new Date().toISOString() })
          .eq("id", id)

        const txType = status === "cancelled" ? "cancel" : status === "expired" ? "expire" : "redeem"
        await supabaseAdmin.from("gift_card_transactions").insert({
          gift_card_id: id,
          type: txType,
          amount: 0,
          balance_after: card.balance,
          notes: `Status changed to ${status}`,
        })

        return NextResponse.json({ success: true })
      }
    }

    return NextResponse.json({ error: "Card not found" }, { status: 404 })
  } catch (err) {
    console.error("Error updating gift card:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}