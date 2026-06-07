import { describe, it, expect, vi } from "vitest"

const { mockRequireAdminAuth } = vi.hoisted(() => ({
  mockRequireAdminAuth: vi.fn().mockResolvedValue({ phone: "+595991000000", authorized: true }),
}))

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: null,
  isSupabaseConfigured: false,
}))

vi.mock("@/lib/auth/admin-auth-guard", () => ({
  requireAdminAuth: mockRequireAdminAuth,
}))

describe("GET /api/admin/bookings", () => {
  it("returns bookings array", async () => {
    const { GET } = await import("@/app/api/admin/bookings/route")
    const url = new URL("http://localhost:3000/api/admin/bookings")
    const request = new Request(url.toString())
    const response = await GET(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(Array.isArray(data.bookings)).toBe(true)
  })
})

describe("PATCH /api/admin/bookings", () => {
  it("returns 400 when id is missing", async () => {
    const { PATCH } = await import("@/app/api/admin/bookings/route")
    const body = { status: "confirmed" }
    const url = new URL("http://localhost:3000/api/admin/bookings")
    const request = new Request(url.toString(), {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await PATCH(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.message).toMatch(/id/)
  })

  it("returns 400 when status is missing", async () => {
    const { PATCH } = await import("@/app/api/admin/bookings/route")
    const url = new URL("http://localhost:3000/api/admin/bookings?id=test-id")
    const request = new Request(url.toString(), {
      method: "PATCH",
      body: JSON.stringify({}),
      headers: { "Content-Type": "application/json" },
    })
    const response = await PATCH(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.message).toMatch(/status/)
  })

  it("returns 400 for invalid status value", async () => {
    const { PATCH } = await import("@/app/api/admin/bookings/route")
    const url = new URL("http://localhost:3000/api/admin/bookings?id=test-id")
    const request = new Request(url.toString(), {
      method: "PATCH",
      body: JSON.stringify({ status: "invalid_status" }),
      headers: { "Content-Type": "application/json" },
    })
    const response = await PATCH(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.message).toMatch(/inválido/)
  })
})

describe("DELETE /api/admin/bookings", () => {
  it("returns 400 when id is missing", async () => {
    const { DELETE } = await import("@/app/api/admin/bookings/route")
    const url = new URL("http://localhost:3000/api/admin/bookings")
    const request = new Request(url.toString(), {
      method: "DELETE",
    })
    const response = await DELETE(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.message).toMatch(/id/)
  })
})
