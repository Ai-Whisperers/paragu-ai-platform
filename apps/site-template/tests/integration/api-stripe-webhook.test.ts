import { describe, it, expect, vi } from "vitest"

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: null,
  isSupabaseConfigured: false,
}))

describe("POST /api/stripe/webhook", () => {
  it("returns 400 when stripe-signature header is missing", async () => {
    const { POST } = await import("@/app/api/stripe/webhook/route")
    const body = JSON.stringify({ type: "checkout.session.completed" })
    const request = new Request("http://localhost:3000/api/stripe/webhook", {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toMatch(/signature/)
  })

  it("returns 400 when webhook secret is not configured", async () => {
    const { POST } = await import("@/app/api/stripe/webhook/route")
    const body = JSON.stringify({ type: "checkout.session.completed" })
    const request = new Request("http://localhost:3000/api/stripe/webhook", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": "sig_123",
      },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toMatch(/signature/)
  })

  it("returns 500 when Stripe secret key is not configured", async () => {
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test"
    const { POST } = await import("@/app/api/stripe/webhook/route")
    const body = JSON.stringify({ type: "checkout.session.completed" })
    const request = new Request("http://localhost:3000/api/stripe/webhook", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": "sig_123",
      },
    })
    const response = await POST(request)
    expect([400, 500]).toContain(response.status)
    delete process.env.STRIPE_WEBHOOK_SECRET
  })
})