import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: null,
  isSupabaseConfigured: false,
}))

global.fetch = vi.fn()

describe("POST /api/stripe/checkout", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns 400 for amount below 10000", async () => {
    const { POST } = await import("@/app/api/stripe/checkout/route")
    const body = { amount: 5000, denomination: "Gs. 50,000" }
    const request = new Request("http://localhost:3000/api/stripe/checkout", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toMatch(/10,?000/)
  })

  it("returns 400 for missing denomination", async () => {
    const { POST } = await import("@/app/api/stripe/checkout/route")
    const body = { amount: 50000 }
    const request = new Request("http://localhost:3000/api/stripe/checkout", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toMatch(/Denominación/)
  })

  it("returns 500 when Stripe is not configured (no secret key)", async () => {
    const { POST } = await import("@/app/api/stripe/checkout/route")
    const body = { amount: 50000, denomination: "Gs. 50,000" }
    const request = new Request("http://localhost:3000/api/stripe/checkout", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect([500, 503]).toContain(response.status)
  })

  it("returns 400 for invalid JSON body", async () => {
    const { POST } = await import("@/app/api/stripe/checkout/route")
    const request = new Request("http://localhost:3000/api/stripe/checkout", {
      method: "POST",
      body: "not-json",
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
  })
})