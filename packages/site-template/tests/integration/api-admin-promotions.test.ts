import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("@/lib/auth/admin-auth-guard", () => ({
  requireAdminAuth: vi.fn().mockResolvedValue({ phone: "+595991000000", authorized: true }),
}))

const mockGetPromotions = vi.fn()
const mockCreatePromotion = vi.fn()
const mockUpdatePromotion = vi.fn()
const mockDeletePromotion = vi.fn()

vi.mock("@/lib/stores", () => ({
  getPromotions: mockGetPromotions,
  createPromotion: mockCreatePromotion,
  updatePromotion: mockUpdatePromotion,
  deletePromotion: mockDeletePromotion,
}))

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
  },
  isSupabaseConfigured: true,
}))

describe("GET /api/admin/promotions", () => {
  beforeEach(() => vi.clearAllMocks())

  it("returns 200 with promotions array", async () => {
    mockGetPromotions.mockResolvedValue([{ id: "1", title: "Summer Sale" }])
    const { GET } = await import("@/app/api/admin/promotions/route")
    const url = new URL("http://localhost:3000/api/admin/promotions")
    const request = new Request(url.toString())
    const response = await GET(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty("promotions")
    expect(Array.isArray(data.promotions)).toBe(true)
  })

  it("returns 500 on error", async () => {
    mockGetPromotions.mockRejectedValue(new Error("DB error"))
    const { GET } = await import("@/app/api/admin/promotions/route")
    const url = new URL("http://localhost:3000/api/admin/promotions")
    const request = new Request(url.toString())
    const response = await GET(request)
    expect(response.status).toBe(500)
  })
})

describe("POST /api/admin/promotions", () => {
  beforeEach(() => vi.clearAllMocks())

  it("returns 400 when title is missing", async () => {
    const body = { description: "Test promo" }
    const request = new Request("http://localhost:3000/api/admin/promotions", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { POST } = await import("@/app/api/admin/promotions/route")
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it("returns 201 when promotion is created", async () => {
    mockCreatePromotion.mockResolvedValue({ id: "new-prom", title: "New Year Promo" })
    const body = { title: "New Year Promo", badge: "NEW", color: "secondary" }
    const request = new Request("http://localhost:3000/api/admin/promotions", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { POST } = await import("@/app/api/admin/promotions/route")
    const response = await POST(request)
    expect(response.status).toBe(201)
    const data = await response.json()
    expect(data.title).toBe("New Year Promo")
  })
})

describe("PATCH /api/admin/promotions", () => {
  beforeEach(() => vi.clearAllMocks())

  it("returns 400 when id is missing", async () => {
    const body = { title: "Updated Title" }
    const request = new Request("http://localhost:3000/api/admin/promotions", {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { PATCH } = await import("@/app/api/admin/promotions/route")
    const response = await PATCH(request)
    expect(response.status).toBe(400)
  })

  it("returns 200 when update succeeds", async () => {
    mockUpdatePromotion.mockResolvedValue({ id: "1", title: "Updated" })
    const body = { id: "1", title: "Updated Title" }
    const request = new Request("http://localhost:3000/api/admin/promotions", {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { PATCH } = await import("@/app/api/admin/promotions/route")
    const response = await PATCH(request)
    expect(response.status).toBe(200)
  })

  it("returns 404 when promotion not found", async () => {
    mockUpdatePromotion.mockResolvedValue(null)
    const body = { id: "nonexistent", title: "Updated" }
    const request = new Request("http://localhost:3000/api/admin/promotions", {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { PATCH } = await import("@/app/api/admin/promotions/route")
    const response = await PATCH(request)
    expect(response.status).toBe(404)
  })
})

describe("DELETE /api/admin/promotions", () => {
  beforeEach(() => vi.clearAllMocks())

  it("returns 400 when id param is missing", async () => {
    const request = new Request("http://localhost:3000/api/admin/promotions", {
      method: "DELETE",
    })
    const { DELETE } = await import("@/app/api/admin/promotions/route")
    const response = await DELETE(request)
    expect(response.status).toBe(400)
  })

  it("returns 200 when delete succeeds", async () => {
    mockDeletePromotion.mockResolvedValue(true)
    const request = new Request("http://localhost:3000/api/admin/promotions?id=1", {
      method: "DELETE",
    })
    const { DELETE } = await import("@/app/api/admin/promotions/route")
    const response = await DELETE(request)
    expect(response.status).toBe(200)
  })

  it("returns 404 when promotion not found", async () => {
    mockDeletePromotion.mockResolvedValue(false)
    const request = new Request("http://localhost:3000/api/admin/promotions?id=nonexistent", {
      method: "DELETE",
    })
    const { DELETE } = await import("@/app/api/admin/promotions/route")
    const response = await DELETE(request)
    expect(response.status).toBe(404)
  })
})