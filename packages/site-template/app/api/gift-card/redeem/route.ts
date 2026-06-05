import { NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(request: Request) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 503 })
  }

  const body = await request.json()
  const { code, amount_gs, service, redeemed_by } = body

  if (!code || !amount_gs || !redeemed_by) {
    return NextResponse.json({ error: "Faltan campos requeridos: code, amount_gs, redeemed_by" }, { status: 400 })
  }

  const redeemAmount = Number(amount_gs)
  if (!redeemAmount || redeemAmount <= 0) {
    return NextResponse.json({ error: "Monto inválido" }, { status: 400 })
  }

  const { data: card, error: fetchErr } = await supabaseAdmin
    .from("gift_cards")
    .select("*")
    .eq("code", code)
    .single()

  if (fetchErr || !card) {
    return NextResponse.json({ error: "Tarjeta no encontrada" }, { status: 404 })
  }

  if (card.status !== "active" && card.status !== "partial") {
    return NextResponse.json({ error: `Tarjeta con estado: ${card.status}` }, { status: 400 })
  }

  if (redeemAmount > card.balance_gs) {
    return NextResponse.json({ error: `Saldo insuficiente. Balance: Gs. ${card.balance_gs.toLocaleString("es-PY")}` }, { status: 400 })
  }

  const newBalance = card.balance_gs - redeemAmount
  const newStatus = newBalance === 0 ? "redeemed" : "partial"

  const { error: updateErr, count } = await supabaseAdmin
    .from("gift_cards")
    .update({ balance_gs: newBalance, status: newStatus, version: (card.version || 0) + 1 })
    .eq("id", card.id)
    .eq("balance_gs", card.balance_gs)
    .eq("version", card.version || 0)

  if (updateErr || !count || count === 0) {
    return NextResponse.json({ error: "La tarjeta fue modificada por otra transacción. Intenta nuevamente." }, { status: 409 })
  }

  await supabaseAdmin.from("gift_card_redemptions").insert({
    gift_card_id: card.id,
    amount_gs: redeemAmount,
    service: service || null,
    redeemed_by,
  })

  if (card.recipient_phone) {
    const { data: client } = await supabaseAdmin
      .from("clients")
      .select("id")
      .eq("phone", card.recipient_phone)
      .maybeSingle()

    if (client) {
      await supabaseAdmin.from("gift_card_redemptions").update({ client_id: client.id }).eq("gift_card_id", card.id)
    }
  }

  return NextResponse.json({
    code: card.code,
    redeemed: redeemAmount,
    balance_gs: newBalance,
    status: newStatus,
  })
}
