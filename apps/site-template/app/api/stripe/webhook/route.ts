import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createGiftCard } from "@/lib/stores"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  return `MAGNOLIA-${seg()}-${seg()}`
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

function logEmailDelivery(to: string, subject: string) {
  console.debug("[EMAIL] Demo mode - no Resend configured")
  console.debug(`[EMAIL] To: ${to}, Subject: ${subject}`)
}

function buildGiftCardEmail(params: {
  recipientName: string
  gifterName: string
  amount: number
  code: string
  message?: string
}): { subject: string; html: string } {
  const { recipientName, gifterName, amount, code, message } = params
  return {
    subject: `¡Tienes una Tarjeta de Regalo de Gs. ${amount.toLocaleString("es-PY")}!`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #f43f5e, #be185d); padding: 32px; text-align: center; color: white; }
    .header h1 { margin: 0; font-size: 28px; }
    .body { padding: 32px; }
    .card { background: linear-gradient(135deg, #fda4af, #f472b6); border-radius: 12px; padding: 24px; text-align: center; color: white; margin-bottom: 24px; }
    .card .amount { font-size: 36px; font-weight: bold; }
    .card .label { font-size: 14px; opacity: 0.9; }
    .code-box { background: #f3f4f6; border: 2px dashed #d1d5db; border-radius: 8px; padding: 16px; text-align: center; margin: 24px 0; }
    .code { font-family: monospace; font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #be185d; }
    .message { background: #fff1f2; border-left: 4px solid #f43f5e; padding: 16px; border-radius: 0 8px 8px 0; margin: 16px 0; font-style: italic; }
    .footer { padding: 24px; text-align: center; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎁 ¡Tarjeta de Regalo!</h1>
    </div>
    <div class="body">
      <p>Hola <strong>${recipientName}</strong>,</p>
      <p><strong>${gifterName || "Alguien"}</strong> te ha regalado una Tarjeta de Regalo:</p>
      <div class="card">
        <div class="label">Valor de tu tarjeta</div>
        <div class="amount">Gs. ${amount.toLocaleString("es-PY")}</div>
      </div>
      ${message ? `<div class="message">"${message}"</div>` : ""}
      <p>Tu código de tarjeta:</p>
      <div class="code-box">
        <div class="code">${code}</div>
      </div>
      <p>Usa este código en el local para reclamar tu tarjeta de regalo. También puedes usarlo para pagar servicios con tu código QR.</p>
      <p>¡Que lo disfrutes!</p>
    </div>
    <div class="footer">
      Válido por 12 meses desde la fecha de compra
    </div>
  </div>
</body>
</html>`,
  }
}

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get("stripe-signature")
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 })
  }

  let event: Stripe.Event

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: `webhook_error: ${message}` }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      console.debug("[stripe-webhook] checkout.session.completed", session.id)

      if (session.payment_status !== "paid") {
        console.debug("[stripe-webhook] session not paid yet, skipping")
        break
      }

      const metadata = session.metadata || {}

      const amount = parseInt(metadata.amount_gs || "0", 10)
      const code = metadata.code || generateCode()
      const uniqueCode = await ensureCodeUnique(code)
      const recipientName = metadata.recipientName || metadata.recipient_name || ""
      const recipientEmail = metadata.recipientEmail || metadata.recipient_email || session.customer_details?.email || ""
      const gifterName = metadata.senderName || metadata.gifter_name || ""
      const message = metadata.message || ""

      console.debug("[stripe-webhook] Creating gift card:", { amount, code: uniqueCode, recipientName, recipientEmail })

      await createGiftCard({
        amount,
        recipient_name: recipientName || null,
        recipient_email: recipientEmail || null,
      })

      if (recipientEmail) {
        const { subject } = buildGiftCardEmail({
          recipientName: recipientName || "Cliente",
          gifterName,
          amount,
          code: uniqueCode,
          message,
        })
        logEmailDelivery(recipientEmail, subject)
      } else {
        console.debug("[stripe-webhook] No recipient email, skipping email delivery")
      }

      break
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.error("[stripe-webhook] payment_intent.payment_failed", paymentIntent.id)
      break
    }
    default:
      console.debug(`[stripe-webhook] unhandled event: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
