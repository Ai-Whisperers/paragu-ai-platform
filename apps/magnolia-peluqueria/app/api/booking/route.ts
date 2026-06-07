import { NextResponse } from "next/server"
import { createBooking } from "@/lib/data-store"
import { businessData } from "@/lib/config"

export async function POST(request: Request) {
  const body = await request.json()
  const { client_name, phone, service, preferred_date, notes } = body

  if (!client_name || !phone || !service) {
    return NextResponse.json({ error: "Nombre, WhatsApp y servicio son requeridos" }, { status: 400 })
  }

  // Try data store first (Supabase → JSON file)
  try {
    const booking = await createBooking({
      client_name,
      phone,
      service,
      preferred_date: preferred_date || null,
      notes: notes || null,
      source: "booking-page",
    })

    if (booking) {
      return NextResponse.json({ ok: true, method: "database", id: booking.id })
    }
  } catch {
    // Fallback to WhatsApp
  }

  // WhatsApp fallback
  const waPhone = businessData().whatsapp
  const waMsg = encodeURIComponent(
    `¡Hola! Quiero reservarme un turno en Magnolia Peluquería.\n\n👤 Nombre: ${client_name}\n📞 WhatsApp: ${phone}\n✂️ Servicio: ${service}${preferred_date ? `\n📅 Fecha preferida: ${preferred_date}` : ""}${notes ? `\n📝 Notas: ${notes}` : ""}`
  )

  return NextResponse.json({
    ok: false,
    error: "base_de_datos_no_disponible",
    fallback_url: `https://wa.me/${waPhone}?text=${waMsg}`,
    message: "No se pudo guardar la reserva. Podés reservar directo por WhatsApp.",
  })
}
