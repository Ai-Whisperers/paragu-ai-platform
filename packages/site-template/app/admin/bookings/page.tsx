/**
 * ANNOTATION: AdminBookings
 *
 * What it is: A booking management table — lists all appointments, lets admins
 * change status (pending/confirmed/completed/cancelled) and delete bookings.
 * Fetches from /api/admin/bookings.
 *
 * Why your business needs it: Centralizes appointment management so you don't
 * miss bookings or double-book. Real-time status updates keep your schedule
 * accurate and clients informed via WhatsApp.
 *
 * What AI populates from your data: All booking data comes from clients filling
 * out the booking form on the site. This page is the admin interface for
 * managing that data.
 *
 * Your input: Supabase must have the bookings table set up (see migrations).
 * Clients submit bookings via /api/booking or the WhatsApp fallback.
 */

"use client"

import { useState, useEffect } from "react"

type Booking = {
  id: string
  clientName?: string
  name?: string
  service?: string
  services?: string[]
  date: string
  status: string
  phone?: string
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings", { cache: "no-store" })
      const data = await res.json()
      setBookings(data.bookings || [])
    } catch (_err) {
      console.error("Error fetching bookings:", _err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
// eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchBookings()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/bookings?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      })
      fetchBookings()
    } catch {
      alert("Error al actualizar estado")
    }
  }

  const deleteBooking = async (id: string) => {
    if (!confirm("¿Cancelar esta reserva?")) return
    try {
      await fetch(`/api/admin/bookings?id=${id}`, { method: "DELETE" })
      fetchBookings()
    } catch {
      alert("Error al cancelar reserva")
    }
  }

  if (loading) return <p>Cargando...</p>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Reservas</h1>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Servicio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No hay reservas</td></tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">{booking.clientName || booking.name || "Unknown"}</div>
                    <div className="text-sm text-gray-500">{booking.phone || "-"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{booking.service || booking.services?.join(", ") || "-"}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(booking.date).toLocaleString("es-PY")}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={booking.status}
                      onChange={(e) => updateStatus(booking.id, e.target.value)}
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        booking.status === "confirmed" ? "bg-green-100 text-green-800" :
                        booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        booking.status === "completed" ? "bg-blue-100 text-blue-800" :
                        "bg-red-100 text-red-800"
                      }`}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="confirmed">Confirmado</option>
                      <option value="completed">Completado</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}