import { NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ phone: string }> }
) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 503 })
  }

  const { phone } = await params
  const { data: client, error } = await supabaseAdmin
    .from("clients")
    .select("id, phone, name, email, tier, visits, created_at")
    .eq("phone", phone)
    .maybeSingle()

  if (error || !client) {
    return NextResponse.json({ error: "not_found" }, { status: 404 })
  }

  const [visits, giftCards, loyalty] = await Promise.all([
    supabaseAdmin
      .from("client_visits")
      .select("id, services, total_gs, paid_via, created_at")
      .eq("client_id", client.id)
      .order("created_at", { ascending: false })
      .limit(20),
    supabaseAdmin
      .from("gift_cards")
      .select("code, amount_gs, balance_gs, status, expires_at, created_at")
      .or(`buyer_phone.eq.${phone},recipient_phone.eq.${phone}`)
      .order("created_at", { ascending: false })
      .limit(10),
    supabaseAdmin
      .from("loyalty_transactions")
      .select("points, reason, created_at")
      .eq("client_id", client.id)
      .order("created_at", { ascending: false })
      .limit(20),
  ])

  const totalPoints = (loyalty.data || []).reduce((sum, t) => sum + (t.points || 0), 0)

  return NextResponse.json({
    ...client,
    total_points: totalPoints,
    recent_visits: visits.data || [],
    gift_cards: giftCards.data || [],
    loyalty_history: loyalty.data || [],
  })
}
