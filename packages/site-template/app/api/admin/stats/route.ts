import { NextResponse } from "next/server"
import { getBookings, getGiftCards } from "@/lib/stores"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { requireAdminAuth } from "@/lib/auth/admin-auth-guard"

interface BookingRecord {
  status?: string
  customer_phone?: string
}

interface TransactionRecord {
  amount?: number
}

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const [bookings, giftCards] = await Promise.all([
      getBookings(),
      getGiftCards(),
    ])

    let revenue = 0
    let activeUsers = 0

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data } = await supabaseAdmin
        .from("bookings")
        .select("status, customer_phone")
        .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      if (data) {
        const confirmed = (data as BookingRecord[]).filter((b) => b.status === "confirmed")
        activeUsers = new Set(confirmed.map((b) => b.customer_phone)).size
      }
      const { data: gcData } = await supabaseAdmin
        .from("gift_card_transactions")
        .select("amount, type")
        .eq("type", "issue")
        .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      if (gcData) {
        revenue = (gcData as TransactionRecord[]).reduce((s, t) => s + (t.amount || 0), 0)
      }
    } else {
      activeUsers = bookings.filter((b) => b.status === "confirmed").length
      revenue = giftCards.reduce((s, c) => s + (c.amount || 0), 0)
    }

    const stats = {
      revenue: revenue.toLocaleString("es-PY"),
      bookings: bookings.length,
      productsSold: giftCards.filter((c) => c.status === "active").length,
      activeUsers,
    }

    return NextResponse.json(stats)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}