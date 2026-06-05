/** ANNOTATION: AdminDashboard — WHAT IT DOES: Admin panel with bookings, content, promotions, gift cards management. DATA SOURCE: API routes under /api/admin/* (bookings, content, promotions, gift-cards). PROPS: None — dashboard is self-contained. NOTABLE: Requires admin auth — protected route. */

/**
 * ANNOTATION: AdminDashboard
 *
 * What it is: The main admin panel dashboard — shows revenue stats, recent
 * bookings, and top products at a glance. Client-fetches data from admin APIs.
 *
 * Why your business needs it: The dashboard gives you a real-time pulse of
 * your business — revenue, bookings, and product performance — without
 * opening separate tools or spreadsheets.
 *
 * What AI populates from your data:
 *   - Stats (revenue, bookings, active users) from /api/admin/stats
 *   - Recent bookings list from /api/admin/bookings
 *   - Top products (not yet implemented — returns empty array)
 */

"use client"

import { useState, useEffect } from "react"

type Booking = {
  id: string
  name?: string
  clientName?: string
  service?: string
  services?: string[]
  date: string
  status: string
}

type Stats = {
  revenue: string
  bookings: string
  productsSold: string
  activeUsers: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ revenue: "0", bookings: "0", productsSold: "0", activeUsers: "0" })
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const [statsRes, bookingsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/bookings"),
      ])
      const [statsData, bookingsData] = await Promise.all([statsRes.json(), bookingsRes.json()])

      setStats({
        revenue: statsData.revenue ?? "0",
        bookings: statsData.bookings ?? "0",
        productsSold: statsData.productsSold ?? "0",
        activeUsers: statsData.activeUsers ?? "0",
      })

      setBookings(
        (bookingsData.bookings ?? []).slice(0, 5).map((b: Record<string, unknown>) => ({
          id: String(b.id ?? ""),
          name: (b.name as string | undefined) ?? (b.clientName as string | undefined) ?? undefined,
          clientName: (b.clientName as string | undefined) ?? (b.name as string | undefined) ?? undefined,
          service: (b.service as string | undefined) ?? ((b.services as string[])?.[0] ?? undefined),
          services: (b.services as string[]) ?? [],
          date: (b.created_at as string) ?? new Date().toISOString(),
          status: (b.status as string) ?? "pending",
        }))
      )

      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Revenue" value={`Gs. ${stats.revenue}`} change="+0%" trend="up" />
        <StatCard title="Bookings" value={stats.bookings} change="+0%" trend="up" />
        <StatCard title="Products Sold" value={stats.productsSold} change="+0%" trend="up" />
        <StatCard title="Active Users" value={stats.activeUsers} change="+0%" trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentBookings bookings={bookings} />
        <TopProducts products={[]} />
      </div>
    </div>
  )
}

function StatCard({ title, value, change, trend }: {
  title: string; value: string | number; change: string; trend: 'up' | 'down'
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      <p className={`text-sm mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {change} vs last month
      </p>
    </div>
  )
}

function RecentBookings({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
      <div className="space-y-4">
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">{booking.name || booking.clientName || 'Unknown'}</p>
                <p className="text-sm text-gray-500">{booking.service || booking.services?.join(', ') || 'Service'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">{new Date(booking.date).toLocaleDateString()}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function TopProducts({ products }: { products: Array<{ name: string; price?: number; category?: string }> }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Top Products</h3>
      <div className="space-y-4">
        {products.length === 0 ? (
          <p className="text-gray-500">No products yet</p>
        ) : (
          products.map((product, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">{product.price ? `Gs. ${product.price.toLocaleString()}` : 'No price'}</p>
              </div>
              <p className="font-semibold text-gray-900">{product.category || 'General'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
