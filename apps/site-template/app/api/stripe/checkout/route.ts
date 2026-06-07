import { NextResponse } from "next/server"
import Stripe from "stripe"

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  return `MAGNOLIA-${seg()}-${seg()}`
}

export async function POST(request: Request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const {
    amount,
    denomination,
    recipientName,
    recipientEmail,
    senderName,
    message,
    buyerPhone,
    recipientPhone,
    lang = "es",
  } = body

  if (!amount || amount < 10000) {
    return NextResponse.json({ error: "Monto mínimo: Gs. 10,000" }, { status: 400 })
  }

  if (!denomination) {
    return NextResponse.json({ error: "Denominación requerida" }, { status: 400 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 })
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const code = generateCode()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "required",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Tarjeta de Regalo – ${denomination}`,
              description: recipientName ? `Para ${recipientName}` : "Tarjeta de Regalo",
            },
            unit_amount: Math.round(amount / 7600 * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${lang}/tarjetas-de-regalo/comprar/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${lang}/tarjetas-de-regalo/comprar?cancelled=true`,
      metadata: {
        denomination,
        recipientName: recipientName || "",
        recipientEmail: recipientEmail || "",
        senderName: senderName || "",
        message: message || "",
        buyerPhone: buyerPhone || "",
        recipientPhone: recipientPhone || "",
        amount_gs: String(amount),
        code,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
