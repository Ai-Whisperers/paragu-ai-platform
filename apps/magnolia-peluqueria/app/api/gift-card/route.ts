import { NextResponse } from "next/server"
import { businessData, waLink } from "@/lib/config"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("session_id")
  if (!sessionId) return NextResponse.json({ error: "missing session_id" }, { status: 400 })

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 })
  }

  try {
    const { default: Stripe } = await import("stripe")
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-05-27.dahlia" })
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return NextResponse.json({
      paid: session.payment_status === "paid",
      amount: session.amount_total,
      customer_email: session.customer_details?.email ?? null,
    })
  } catch (err) {
    return NextResponse.json({ error: "stripe_error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  const { amount, card_name } = body

  // Validate amount: 50,000 – 500,000 Gs, multiples of 10,000
  const MIN = 50000, MAX = 500000, STEP = 10000
  const numAmount = Number(amount)
  if (!numAmount || numAmount < MIN || numAmount > MAX || numAmount % STEP !== 0) {
    return NextResponse.json(
      { error: `Monto inválido. Ingresa un valor entre Gs. ${MIN.toLocaleString("es-PY")} y Gs. ${MAX.toLocaleString("es-PY")}, en múltiplos de Gs. ${STEP.toLocaleString("es-PY")}.` },
      { status: 400 }
    )
  }

  // If Stripe is not configured, fall back to WhatsApp
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({
      waFallback: true,
      url: `https://wa.me/${businessData().whatsapp}?text=${encodeURIComponent(
        `¡Hola! Quiero comprar una Tarjeta de Regalo de Gs. ${numAmount.toLocaleString("es-PY")}${card_name ? ` (${card_name})` : ""}`
      )}`,
    })
  }

  try {
    const { default: Stripe } = await import("stripe")
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-05-27.dahlia" })
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: card_name || "Tarjeta de Regalo – Magnolia Peluquería",
            description: `Regalo de Gs. ${numAmount.toLocaleString("es-PY")}`,
          },
          unit_amount: Math.round(numAmount / 7600 * 100), // approximate Gs/USD conversion
        },
        quantity: 1,
      }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://magnolia-peluqueria.paragu-ai.com"}/es/reserva/success?session_id={CHECKOUT_SESSION_ID}&gift_card=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://magnolia-peluqueria.paragu-ai.com"}/es/reserva?cancelled=1`,
      metadata: { gifter_name: card_name || "", amount_gs: String(numAmount) },
    })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    // Any Stripe error → WhatsApp fallback
    return NextResponse.json({
      waFallback: true,
      url: `https://wa.me/${businessData().whatsapp}?text=${encodeURIComponent(
        `¡Hola! Quiero comprar una Tarjeta de Regalo de Gs. ${numAmount.toLocaleString("es-PY")}`
      )}`,
    })
  }
}
