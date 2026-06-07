import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("@/lib/auth/admin-auth-guard", () => ({
  requireAdminAuth: vi.fn().mockResolvedValue({ phone: "+595991000000", authorized: true }),
}))

const mockGetBookings = vi.fn()
const mockGetGiftCards = vi.fn()

vi.mock("@/lib/stores", () => ({
  getBookings: mockGetBookings,
  getGiftCards: mockGetGiftCards,
}))

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    gte: vi.fn().mockResolvedValue({ data: null, error: null }),
  },
  isSupabaseConfigured: true,
}))

describe("GET /api/admin/stats", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetBookings.mockResolvedValue([])
    mockGetGiftCards.mockResolvedValue([])
  })

  it("returns 200 with stats object", async () => {
    const { GET } = await import("@/app/api/admin/stats/route")
    const url = new URL("http://localhost:3000/api/admin/stats")
    const request = new Request(url.toString())
    const response = await GET(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty("revenue")
    expect(data).toHaveProperty("bookings")
    expect(data).toHaveProperty("productsSold")
    expect(data).toHaveProperty("activeUsers")
  })

  it("revenue is a string with locale formatting", async () => {
    const { GET } = await import("@/app/api/admin/stats/route")
    const url = new URL("http://localhost:3000/api/admin/stats")
    const request = new Request(url.toString())
    const response = await GET(request)
    const data = await response.json()
    expect(typeof data.revenue).toBe("string")
  })

  it("bookings and productsSold are numbers", async () => {
    const { GET } = await import("@/app/api/admin/stats/route")
    const url = new URL("http://localhost:3000/api/admin/stats")
    const request = new Request(url.toString())
    const response = await GET(request)
    const data = await response.json()
    expect(typeof data.bookings).toBe("number")
    expect(typeof data.productsSold).toBe("number")
  })

  it("returns 500 on exception", async () => {
    mockGetBookings.mockRejectedValue(new Error("forced error"))
    const { GET } = await import("@/app/api/admin/stats/route")
    const url = new URL("http://localhost:3000/api/admin/stats")
    const request = new Request(url.toString())
    const response = await GET(request)
    expect(response.status).toBe(500)
  })
})