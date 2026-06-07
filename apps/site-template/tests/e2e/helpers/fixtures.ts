export const SAMPLE_BOOKINGS = [
  { id: "1", clientName: "Maria Perez", service: "Corte", date: "2026-06-01T10:00:00", status: "confirmed", phone: "595981000001" },
  { id: "2", clientName: "Juan Lopez", service: "Coloración", date: "2026-06-01T11:00:00", status: "pending", phone: "595981000002" },
]

export const SAMPLE_GIFT_CARDS = [
  { id: "1", code: "GC-001", token: "abc-123", denomination: 100000, balance: 100000, recipient_name: "Ana", status: "active", created_at: "2026-05-01T00:00:00", valid_until: "2027-05-01T00:00:00" },
  { id: "2", code: "GC-002", token: "def-456", denomination: 50000, balance: 0, recipient_name: "Carlos", status: "redeemed", created_at: "2026-04-01T00:00:00", valid_until: "2027-04-01T00:00:00" },
]

export const SAMPLE_STATS = {
  revenue: 5000000, bookings: 42, productsSold: 18, activeUsers: 156
}

export const SAMPLE_PROMOTIONS = [
  { id: "1", title: "20% off primera visita", subtitle: "En tu primer corte", badge: "Nuevo", color: "secondary", is_active: true, expires_at: "2026-07-01", sort_order: 1, created_at: "2026-05-01" },
]

export const SAMPLE_CONTENT = {
  sections: {
    hero: { title: "Bienvenidos", subtitle: "Tu mejor version" },
    stats: { clients: 1500, years: 10 },
  }
}
