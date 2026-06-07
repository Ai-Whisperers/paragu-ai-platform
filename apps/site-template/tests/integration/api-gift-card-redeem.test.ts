import { describe, it, expect, vi, beforeEach } from "vitest"
import { supabaseAdmin } from "@/lib/supabase"

const mockSingle = vi.fn()
const mockMaybeSingle = vi.fn()
const mockInsert = vi.fn()

function makeChain() {
  const chain: Record<string, unknown> = {}
  chain.select = vi.fn().mockReturnValue(chain)
  chain.eq = vi.fn().mockReturnValue(chain)
  chain.gte = vi.fn().mockReturnValue(chain)
  chain.single = mockSingle
  chain.maybeSingle = mockMaybeSingle
  chain.insert = mockInsert
  return chain
}

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: {
    from: vi.fn(() => makeChain()),
  },
  isSupabaseConfigured: true,
}))

describe("POST /api/gift-card/redeem", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSingle.mockResolvedValue({ data: null, error: null })
    mockMaybeSingle.mockResolvedValue({ data: null, error: null })
    mockInsert.mockResolvedValue({ data: null, error: null })
  })

  function withUpdateResult(data: unknown, error: unknown) {
    const thirdEq: Record<string, unknown> = {}
    const secondEq: Record<string, unknown> = {}
    const firstEq: Record<string, unknown> = {}
    thirdEq.eq = vi.fn().mockResolvedValue({ data, error, count: data != null ? 1 : 0 })
    secondEq.eq = vi.fn().mockReturnValue(thirdEq)
    firstEq.eq = vi.fn().mockReturnValue(secondEq)
    const updateFn = vi.fn().mockReturnValue(firstEq)

    const admin = supabaseAdmin!
    ;(admin.from as ReturnType<typeof vi.fn>).mockImplementation(() => {
      const chain = makeChain()
      chain.update = updateFn
      return chain
    })
  }

  it("returns 400 when code is missing", async () => {
    const body = { amount_gs: 10000, redeemed_by: "staff-1" }
    const request = new Request("http://localhost:3000/api/gift-card/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { POST } = await import("@/app/api/gift-card/redeem/route")
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it("returns 400 when amount_gs is missing", async () => {
    const body = { code: "GC-ABCD-1234", redeemed_by: "staff-1" }
    const request = new Request("http://localhost:3000/api/gift-card/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { POST } = await import("@/app/api/gift-card/redeem/route")
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it("returns 400 when redeemed_by is missing", async () => {
    const body = { code: "GC-ABCD-1234", amount_gs: 10000 }
    const request = new Request("http://localhost:3000/api/gift-card/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { POST } = await import("@/app/api/gift-card/redeem/route")
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it("returns 400 when amount_gs is zero or negative", async () => {
    const body = { code: "GC-ABCD-1234", amount_gs: 0, redeemed_by: "staff-1" }
    const request = new Request("http://localhost:3000/api/gift-card/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { POST } = await import("@/app/api/gift-card/redeem/route")
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it("returns 404 when card not found", async () => {
    mockSingle.mockResolvedValue({ data: null, error: { message: "not found" } })
    const body = { code: "NONEXISTENT", amount_gs: 10000, redeemed_by: "staff-1" }
    const request = new Request("http://localhost:3000/api/gift-card/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { POST } = await import("@/app/api/gift-card/redeem/route")
    const response = await POST(request)
    expect(response.status).toBe(404)
  })

  it("returns 400 when card status is not active", async () => {
    mockSingle.mockResolvedValue({
      data: { id: "card-1", code: "GC-ABCD-1234", balance_gs: 50000, status: "redeemed" },
      error: null,
    })
    const body = { code: "GC-ABCD-1234", amount_gs: 10000, redeemed_by: "staff-1" }
    const request = new Request("http://localhost:3000/api/gift-card/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { POST } = await import("@/app/api/gift-card/redeem/route")
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it("returns 400 when amount exceeds balance", async () => {
    mockSingle.mockResolvedValue({
      data: { id: "card-1", code: "GC-ABCD-1234", balance_gs: 5000, status: "active" },
      error: null,
    })
    const body = { code: "GC-ABCD-1234", amount_gs: 10000, redeemed_by: "staff-1" }
    const request = new Request("http://localhost:3000/api/gift-card/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { POST } = await import("@/app/api/gift-card/redeem/route")
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it("returns 200 with partial redemption when amount < balance", async () => {
    mockSingle.mockResolvedValueOnce({
      data: { id: "card-1", code: "GC-ABCD-1234", balance_gs: 50000, status: "active", recipient_phone: null },
      error: null,
    })
    mockMaybeSingle.mockResolvedValue({ data: null, error: null })
    withUpdateResult(1, null)

    const body = { code: "GC-ABCD-1234", amount_gs: 10000, redeemed_by: "staff-1", service: "Corte" }
    const request = new Request("http://localhost:3000/api/gift-card/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { POST } = await import("@/app/api/gift-card/redeem/route")
    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.code).toBe("GC-ABCD-1234")
    expect(data.redeemed).toBe(10000)
    expect(data.balance_gs).toBe(40000)
    expect(data.status).toBe("partial")
  })

  it("returns 200 with full redemption when amount == balance", async () => {
    mockSingle.mockResolvedValueOnce({
      data: { id: "card-1", code: "GC-ABCD-1234", balance_gs: 10000, status: "active", recipient_phone: null },
      error: null,
    })
    mockMaybeSingle.mockResolvedValue({ data: null, error: null })
    withUpdateResult(1, null)

    const body = { code: "GC-ABCD-1234", amount_gs: 10000, redeemed_by: "staff-1" }
    const request = new Request("http://localhost:3000/api/gift-card/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { POST } = await import("@/app/api/gift-card/redeem/route")
    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.balance_gs).toBe(0)
    expect(data.status).toBe("redeemed")
  })

  it("returns 409 when update returns no rows (optimistic lock failure)", async () => {
    mockSingle.mockResolvedValueOnce({
      data: { id: "card-1", code: "GC-ABCD-1234", balance_gs: 50000, status: "active", recipient_phone: null },
      error: null,
    })
    mockMaybeSingle.mockResolvedValue({ data: null, error: null })
    withUpdateResult(null, null)

    const body = { code: "GC-ABCD-1234", amount_gs: 10000, redeemed_by: "staff-1" }
    const request = new Request("http://localhost:3000/api/gift-card/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { POST } = await import("@/app/api/gift-card/redeem/route")
    const response = await POST(request)
    expect(response.status).toBe(409)
  })
})