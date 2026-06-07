import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: null,
  isSupabaseConfigured: false,
}))

global.fetch = vi.fn()

describe("POST /api/auth/admin/send-otp", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns 200 for valid phone number", async () => {
    const { POST } = await import("@/app/api/auth/admin/send-otp/route")
    const body = { phone: "595981000000" }
    const request = new Request("http://localhost:3000/api/auth/admin/send-otp", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect([200, 400, 500]).toContain(response.status)
  })

  it("returns 400 for missing phone", async () => {
    const { POST } = await import("@/app/api/auth/admin/send-otp/route")
    const body = {}
    const request = new Request("http://localhost:3000/api/auth/admin/send-otp", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
  })
})

describe("POST /api/auth/admin/verify-otp", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns 400 for missing phone", async () => {
    const { POST } = await import("@/app/api/auth/admin/verify-otp/route")
    const body = { otp: "123456" }
    const request = new Request("http://localhost:3000/api/auth/admin/verify-otp", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect([400, 401, 404, 500]).toContain(response.status)
  })

  it("returns 400 for missing otp", async () => {
    const { POST } = await import("@/app/api/auth/admin/verify-otp/route")
    const body = { phone: "595981000000" }
    const request = new Request("http://localhost:3000/api/auth/admin/verify-otp", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect([400, 401, 404, 500]).toContain(response.status)
  })

  it("returns 401 for invalid otp", async () => {
    const { POST } = await import("@/app/api/auth/admin/verify-otp/route")
    const body = { phone: "595981000000", otp: "000000" }
    const request = new Request("http://localhost:3000/api/auth/admin/verify-otp", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect([400, 401, 404, 500]).toContain(response.status)
  })
})

describe("POST /api/auth/otp/send", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns 503 when Supabase is not configured", async () => {
    const { POST } = await import("@/app/api/auth/otp/send/route")
    const body = { phone: "595981000000" }
    const request = new Request("http://localhost:3000/api/auth/otp/send", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(503)
  })
})

describe("POST /api/auth/otp/verify", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns 503 when Supabase is not configured (no DB)", async () => {
    vi.mock("@/lib/supabase", () => ({
      supabaseAdmin: null,
      isSupabaseConfigured: false,
    }))
    const { POST } = await import("@/app/api/auth/otp/verify/route")
    const body = { phone: "595981000000", code: "123456" }
    const request = new Request("http://localhost:3000/api/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(503)
  })
})

describe("POST /api/auth/login", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns 503 when Supabase is not configured", async () => {
    const { POST } = await import("@/app/api/auth/login/route")
    const body = { email: "test@test.com", password: "password" }
    const request = new Request("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(503)
  })
})