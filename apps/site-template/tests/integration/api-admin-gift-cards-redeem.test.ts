import { describe, it, expect, vi, beforeEach } from "vitest"
import type { NextRequest } from "next/server"

const mockSupabase: { isSupabaseConfigured: boolean; supabaseAdmin: unknown } = {
  isSupabaseConfigured: false,
  supabaseAdmin: null,
}

vi.mock("@/lib/supabase", () => mockSupabase)

vi.mock("@/lib/auth/admin-auth-guard", () => ({
  requireAdminAuth: vi.fn().mockResolvedValue({ phone: "+595991000000", authorized: true }),
}))

describe("POST /api/admin/gift-cards/[id]/redeem", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const makeSupabaseMock = (overrides: Record<string, unknown> = {}) => {
    const mock = {
      isSupabaseConfigured: true,
      supabaseAdmin: {
        from: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: null }),
            }),
          }),
        }),
        insert: vi.fn().mockResolvedValue({ error: null }),
      },
      ...overrides,
    }
    Object.assign(mockSupabase, mock)
  }

  it("returns 503 when Supabase is not configured", async () => {
    mockSupabase.isSupabaseConfigured = false
    mockSupabase.supabaseAdmin = null
    const { POST } = await import("@/app/api/admin/gift-cards/[id]/redeem/route")
    const body = { amount: 5000 }
    const request = new Request("http://localhost:3000/api/admin/gift-cards/test-id/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request as unknown as NextRequest, { params: Promise.resolve({ id: "test-id" }) })
    expect([500, 503]).toContain(response.status)
  })

  it("returns 400 when amount is missing", async () => {
    makeSupabaseMock()
    const { POST } = await import("@/app/api/admin/gift-cards/[id]/redeem/route")
    const body = {}
    const request = new Request("http://localhost:3000/api/admin/gift-cards/test-id/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request as unknown as NextRequest, { params: Promise.resolve({ id: "test-id" }) })
    expect(response.status).toBe(400)
  })

  it("returns 400 when amount is zero", async () => {
    makeSupabaseMock()
    const { POST } = await import("@/app/api/admin/gift-cards/[id]/redeem/route")
    const body = { amount: 0 }
    const request = new Request("http://localhost:3000/api/admin/gift-cards/test-id/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request as unknown as NextRequest, { params: Promise.resolve({ id: "test-id" }) })
    expect(response.status).toBe(400)
  })

  it("returns 404 when card is not found", async () => {
    makeSupabaseMock({
      supabaseAdmin: {
        from: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: { message: "not found" } }),
            }),
          }),
        }),
      },
    })
    const { POST } = await import("@/app/api/admin/gift-cards/[id]/redeem/route")
    const body = { amount: 5000 }
    const request = new Request("http://localhost:3000/api/admin/gift-cards/nonexistent-id/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request as unknown as NextRequest, { params: Promise.resolve({ id: "nonexistent-id" }) })
    expect(response.status).toBe(404)
  })

  it("returns 400 when card is not active", async () => {
    makeSupabaseMock({
      supabaseAdmin: {
        from: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: { id: "card-1", balance: 50000, status: "redeemed" }, error: null }),
            }),
          }),
        }),
      },
    })
    const { POST } = await import("@/app/api/admin/gift-cards/[id]/redeem/route")
    const body = { amount: 5000 }
    const request = new Request("http://localhost:3000/api/admin/gift-cards/card-1/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request as unknown as NextRequest, { params: Promise.resolve({ id: "card-1" }) })
    expect(response.status).toBe(400)
  })

  it("returns 400 when amount exceeds balance", async () => {
    makeSupabaseMock({
      supabaseAdmin: {
        from: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: { id: "card-1", balance: 5000, status: "active" }, error: null }),
            }),
          }),
        }),
      },
    })
    const { POST } = await import("@/app/api/admin/gift-cards/[id]/redeem/route")
    const body = { amount: 50000 }
    const request = new Request("http://localhost:3000/api/admin/gift-cards/card-1/redeem", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request as unknown as NextRequest, { params: Promise.resolve({ id: "card-1" }) })
    expect(response.status).toBe(400)
  })
})
