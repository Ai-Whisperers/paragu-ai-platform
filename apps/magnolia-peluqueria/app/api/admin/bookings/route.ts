import { NextResponse } from "next/server"
import { getBookings, updateBookingStatus } from "@/lib/data-store"

export async function GET() {
  try {
    const bookings = await getBookings()
    return NextResponse.json(bookings)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const { id, status } = await request.json()
  if (!id || !status) return NextResponse.json({ error: "id y status requeridos" }, { status: 400 })

  const allowed = ["pending", "confirmed", "cancelled", "completed"]
  if (!allowed.includes(status)) return NextResponse.json({ error: "status inválido" }, { status: 400 })

  const ok = await updateBookingStatus(id, status)
  if (!ok) return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 })

  return NextResponse.json({ ok: true })
}
