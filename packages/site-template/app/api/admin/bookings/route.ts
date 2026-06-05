import { NextResponse } from "next/server"
import { getBookings, updateBookingStatus, deleteBooking } from "@/lib/stores"
import { requireAdminAuth } from "@/lib/auth/admin-auth-guard"
import { apiError } from "@/lib/api/errors"

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const bookings = await getBookings()
    return NextResponse.json({ bookings })
  } catch (err) {
    return NextResponse.json(apiError("INTERNAL_ERROR", String(err)), { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const auth = await requireAdminAuth(request)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json(apiError("MISSING_FIELDS", "id requerido"), { status: 400 })

  const { status } = await request.json()
  if (!status) return NextResponse.json(apiError("MISSING_FIELDS", "status requerido"), { status: 400 })

  const allowed = ["pending", "confirmed", "cancelled", "completed"]
  if (!allowed.includes(status)) return NextResponse.json(apiError("VALIDATION_ERROR", "status inválido"), { status: 400 })

  const ok = await updateBookingStatus(id, status)
  if (!ok) return NextResponse.json(apiError("NOT_FOUND", "Reserva no encontrada"), { status: 404 })

  return NextResponse.json({ booking: { id, status } })
}

export async function DELETE(request: Request) {
  const auth = await requireAdminAuth(request)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json(apiError("MISSING_FIELDS", "id requerido"), { status: 400 })

  const ok = await deleteBooking(id)
  if (!ok) return NextResponse.json(apiError("NOT_FOUND", "Reserva no encontrada"), { status: 404 })

  return NextResponse.json({ ok: true })
}