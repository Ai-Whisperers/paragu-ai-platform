import { NextResponse } from "next/server"
import Stripe from "stripe"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { siteConfig, PYG_USD_RATE } from "@/lib/config/config"

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  const slug = siteConfig.site?.slug || "REGALO"
  const prefix = slug.slice(0, 6).toUpperCase().replace(/[^A-Z0-9]/g, "")
  return `${prefix}-${seg()}-${seg()}`
}

async function ensureCodeUnique(code: string): Promise<string> {
  if (!isSupabaseConfigured || !supabaseAdmin) return code
  let attempts = 0
  let current = code
  while (attempts < 5) {
    const { data: existing } = await supabaseAdmin
      .from("gift_cards")
      .select("id")
      .eq("code", current)
      .maybeSingle()
    if (!existing) break
    current = generateCode()
    attempts++
  }
  return current
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.json({ error: "missing session_id" }, { status: 400 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 })
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    const metadata = session.metadata || {}

    const amount = session.amount_total ? Math.round((session.amount_total / 100) * PYG_USD_RATE) : 0
    const code = metadata.code || ""
    const recipientName = metadata.recipientName || metadata.recipient_name || ""
    const recipientEmail = metadata.recipientEmail || metadata.recipient_email || session.customer_details?.email || ""
    const senderName = metadata.senderName || metadata.gifter_name || ""
    const message = metadata.message || ""

    if (session.payment_status === "paid" && code) {
      const uniqueCode = await ensureCodeUnique(code)

      if (isSupabaseConfigured && supabaseAdmin) {
        const { data: existing } = await supabaseAdmin
          .from("gift_cards")
          .select("id, code")
          .eq("code", uniqueCode)
          .maybeSingle()

        if (!existing) {
          const amountGs = parseInt(metadata.amount_gs || String(amount), 10)
          await supabaseAdmin.from("gift_cards").insert({
            code: uniqueCode,
            token: crypto.randomUUID(),
            amount: amountGs,
            balance: amountGs,
            recipient_name: recipientName || null,
            recipient_email: recipientEmail || null,
            status: "active",
          })
        }
      }
    }

    return NextResponse.json({
      paid: session.payment_status === "paid",
      amount,
      denomination: metadata.denomination || "Tarjeta de Regalo",
      recipientName,
      recipientEmail,
      senderName,
      message,
      code: code || null,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
