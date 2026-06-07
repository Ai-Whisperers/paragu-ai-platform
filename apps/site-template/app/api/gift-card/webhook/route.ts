import { NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(request: Request) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 503 })
  }

  const rawBody = await request.text()
  const body = JSON.parse(rawBody)
  const eventType = body.type

  if (eventType !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  const sig = request.headers.get("stripe-signature")
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 500 })
  }

  if (!sig) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 })
  }

  try {
    const { default: Stripe } = await import("stripe")
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-05-27.dahlia" })
    stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 })
  }

  const session = body.data.object
  const metadata = session.metadata || {}
  const amountGs = parseInt(metadata.amount_gs || "0", 10)
  if (!amountGs) return NextResponse.json({ error: "missing_amount" }, { status: 400 })

  const code = metadata.code
  if (!code) return NextResponse.json({ error: "missing_code" }, { status: 400 })

  const { data: existing } = await supabaseAdmin
    .from("gift_cards")
    .select("id")
    .eq("stripe_session_id", session.id)
    .maybeSingle()

  if (existing) return NextResponse.json({ received: true, duplicate: true })

  const { error } = await supabaseAdmin.from("gift_cards").insert({
    code,
    amount_gs: amountGs,
    balance_gs: amountGs,
    buyer_name: metadata.gifter_name || null,
    buyer_phone: metadata.buyer_phone || null,
    recipient_phone: metadata.recipient_phone || null,
    recipient_name: metadata.recipient_name || null,
    message: metadata.message || null,
    stripe_session_id: session.id,
    status: "active",
    expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  })

  if (error) {
    console.error("gift_card_insert_error", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (metadata.buyer_phone) {
    await supabaseAdmin
      .from("clients")
      .upsert({ phone: metadata.buyer_phone, name: metadata.gifter_name || null }, { onConflict: "phone" })
  }

  return NextResponse.json({ received: true, created: true })
}
