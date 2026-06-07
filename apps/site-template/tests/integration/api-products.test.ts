import { describe, it, expect, vi, beforeEach } from "vitest"
import { NextRequest } from "next/server"

const mockFrom = vi.fn()
const mockSelect = vi.fn()
const mockEq = vi.fn()
const mockGt = vi.fn()
const mockOrder = vi.fn()
const mockInsert = vi.fn()

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    from: mockFrom,
    select: mockSelect,
    eq: mockEq,
    gt: mockGt,
    order: mockOrder,
    insert: mockInsert,
  })),
}))

describe("GET /api/products", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFrom.mockReturnValue({
      select: mockSelect.mockReturnThis(),
      eq: mockEq.mockReturnThis(),
      gt: mockGt.mockReturnThis(),
      order: mockOrder.mockReturnValue({ data: [], error: null }),
    })
  })

  it("returns 200 with array of products", async () => {
    const { GET } = await import("@/app/api/products/route")
    const req = new NextRequest("http://localhost:3000/api/products", {
      method: "GET",
    })
    const response = await GET(req)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(Array.isArray(data)).toBe(true)
  })

  it("returns 200 with filtered products when category param is provided", async () => {
    const { GET } = await import("@/app/api/products/route")
    const request = new NextRequest("http://localhost:3000/api/products?category=Tools", {
      method: "GET",
    })
    const response = await GET(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(Array.isArray(data)).toBe(true)
  })

  it("returns 500 when database query fails", async () => {
    mockOrder.mockReturnValue({ data: null, error: { message: "DB error" } })
    const { GET } = await import("@/app/api/products/route")
    const request = new NextRequest("http://localhost:3000/api/products", {
      method: "GET",
    })
    const response = await GET(request)
    expect(response.status).toBe(500)
  })
})