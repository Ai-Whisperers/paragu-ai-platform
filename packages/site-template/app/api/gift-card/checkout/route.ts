import { NextResponse } from "next/server"
import { PYG_USD_RATE } from "@/lib/config/config"

function generateGiftCardCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let code = ""
  for (let i = 0; i < 12; i++) {
    if (i > 0 && i % 4 === 0) code += "-"
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

export async function POST(request: Request) {
  const { amount, recipientName, recipientEmail, senderName, message, buyerPhone, recipientPhone } = await request.json()

  if (!amount || amount < 10000) {
    return NextResponse.json({ error: "Monto mínimo: Gs. 10,000" }, { status: 400 })
  }

  if (!recipientName || !recipientEmail) {
    return NextResponse.json({ error: "Nombre y email requeridos" }, { status: 400 })
  }

  const code = generateGiftCardCode()

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const successUrl = `${baseUrl}/es/tarjetas-de-regalo/comprar/success?session_id={CHECKOUT_SESSION_ID}&code=${code}`
    const cancelUrl = `${baseUrl}/es/tarjetas-de-regalo`

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`
      },
      body: new URLSearchParams({
        "payment_method_types": "card",
        "line_items[0][price_data][currency]": "usd",
        "line_items[0][price_data][product_data][name]": `Tarjeta de Regalo - Gs. ${amount.toLocaleString()}`,
        "line_items[0][price_data][product_data][description]": `Para ${recipientName}`,
        "line_items[0][price_data][unit_amount]": Math.round(amount / PYG_USD_RATE).toString(),
        "line_items[0][quantity]": "1",
        "mode": "payment",
        "success_url": successUrl,
        "cancel_url": cancelUrl,
        "metadata[code]": code,
        "metadata[amount]": amount.toString(),
        "metadata[amount_gs]": amount.toString(),
        "metadata[recipient_name]": recipientName,
        "metadata[recipient_email]": recipientEmail,
        "metadata[gifter_name]": senderName || "",
        "metadata[buyer_phone]": buyerPhone || "",
        "metadata[recipient_phone]": recipientPhone || "",
        "metadata[message]": message || ""
      })
    })

    const session = await res.json()

    if (session.error) {
      return NextResponse.json({ error: session.error.message }, { status: 500 })
    }

    return NextResponse.json({ url: session.url, code })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
