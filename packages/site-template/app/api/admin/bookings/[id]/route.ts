import { NextResponse } from "next/server"
import { updateBookingStatus } from "@/lib/stores"
import { requireAdminAuth } from "@/lib/auth/admin-auth-guard"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminAuth(request)
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  const { status } = await request.json()

  if (!status) {
    return NextResponse.json({ error: "status requerido" }, { status: 400 })
  }

  const allowed = ["pending", "confirmed", "cancelled", "completed"]
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: "status inválido" }, { status: 400 })
  }

  try {
    const ok = await updateBookingStatus(id, status)
    if (!ok) {
      return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 })
    }
    return NextResponse.json({ booking: { id, status } })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
