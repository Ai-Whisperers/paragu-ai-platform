import { NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(request: Request) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 503 })
  }

  const body = await request.json()
  const { referrer_phone, referred_phone } = body

  if (!referrer_phone || !referred_phone) {
    return NextResponse.json({ error: "referrer_phone y referred_phone son requeridos" }, { status: 400 })
  }

  if (referrer_phone === referred_phone) {
    return NextResponse.json({ error: "No podés referirte a vos mismo" }, { status: 400 })
  }

  const { data: referrer } = await supabaseAdmin
    .from("clients")
    .select("id")
    .eq("phone", referrer_phone)
    .maybeSingle()

  if (!referrer) {
    return NextResponse.json({ error: "Referidor no encontrado" }, { status: 404 })
  }

  const { data: referred } = await supabaseAdmin
    .from("clients")
    .select("id")
    .eq("phone", referred_phone)
    .maybeSingle()

  if (!referred) {
    return NextResponse.json({ error: "La persona referida debe tener una cuenta" }, { status: 404 })
  }

  const referralSlug = `referral_${referrer.id}_${referred.id}`

  const { data: existing } = await supabaseAdmin
    .from("client_promo_claims")
    .select("id")
    .eq("client_id", referred.id)
    .eq("promo_slug", referralSlug)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: "Referencia ya registrada" }, { status: 409 })
  }

  await supabaseAdmin
    .from("client_promo_claims")
    .insert({ client_id: referred.id, promo_slug: referralSlug })

  await supabaseAdmin.from("loyalty_transactions").insert({
    client_id: referrer.id,
    points: 25,
    reason: "Referencia exitosa — Traé una amiga",
  })

  await supabaseAdmin.from("loyalty_transactions").insert({
    client_id: referred.id,
    points: 10,
    reason: "Bonus de bienvenida por referencia",
  })

  return NextResponse.json({ ok: true, referrer_bonus: 25, referred_bonus: 10 })
}
