import { NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(request: Request) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 503 })
  }

  const body = await request.json()
  const { phone, promo_slug } = body

  if (!phone || !promo_slug) {
    return NextResponse.json({ error: "phone y promo_slug son requeridos" }, { status: 400 })
  }

  let { data: client } = await supabaseAdmin
    .from("clients")
    .select("id")
    .eq("phone", phone)
    .maybeSingle()

  if (!client) {
    const { data: newClient, error: createErr } = await supabaseAdmin
      .from("clients")
      .insert({ phone })
      .select("id")
      .single()
    if (createErr || !newClient) {
      return NextResponse.json({ error: "Error al crear cliente" }, { status: 500 })
    }
    client = newClient
  }

  const { data: existing } = await supabaseAdmin
    .from("client_promo_claims")
    .select("id")
    .eq("client_id", client.id)
    .eq("promo_slug", promo_slug)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: "Ya reclamaste esta promoción", already_claimed: true }, { status: 409 })
  }

  const { error } = await supabaseAdmin
    .from("client_promo_claims")
    .insert({ client_id: client.id, promo_slug })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, claimed: true })
}
