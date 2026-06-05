import { describe, it, expect, vi, beforeEach } from "vitest"

const mockAddSubscriber = vi.fn()

vi.mock("@/lib/stores", () => ({
  addSubscriber: mockAddSubscriber,
}))

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: null,
  isSupabaseConfigured: false,
}))

describe("POST /api/subscribe", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAddSubscriber.mockResolvedValue(true)
  })

  it("returns 400 when email is missing", async () => {
    const { POST } = await import("@/app/api/subscribe/route")
    const body = { name: "Ana" }
    const request = new Request("http://localhost:3000/api/subscribe", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it("returns 400 when email is invalid format", async () => {
    const { POST } = await import("@/app/api/subscribe/route")
    const body = { email: "not-an-email" }
    const request = new Request("http://localhost:3000/api/subscribe", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it("returns 200 when subscribed successfully", async () => {
    mockAddSubscriber.mockResolvedValue(true)
    const { POST } = await import("@/app/api/subscribe/route")
    const body = { email: "ana@test.com", name: "Ana" }
    const request = new Request("http://localhost:3000/api/subscribe", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.success).toBe(true)
  })

  it("returns 200 even when name is not provided", async () => {
    mockAddSubscriber.mockResolvedValue(true)
    const { POST } = await import("@/app/api/subscribe/route")
    const body = { email: "ana@test.com" }
    const request = new Request("http://localhost:3000/api/subscribe", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
  })

  it("returns 400 for invalid JSON body", async () => {
    const { POST } = await import("@/app/api/subscribe/route")
    const request = new Request("http://localhost:3000/api/subscribe", {
      method: "POST",
      body: "not-valid-json",
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
  })
})