import { describe, it, expect, vi, beforeEach } from "vitest"

const mockMaybeSingle = vi.fn()
const mockInsert = vi.fn()
const mockUpdate = vi.fn()

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: mockMaybeSingle,
      insert: mockInsert,
      update: mockUpdate,
    })),
  },
  isSupabaseConfigured: true,
}))

describe("POST /api/referral", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockInsert.mockResolvedValue({ data: null, error: null })
    mockUpdate.mockResolvedValue({ data: null, error: null })
  })

  it("returns 400 when referrer_phone is missing", async () => {
    const { POST } = await import("@/app/api/referral/route")
    const body = { referred_phone: "595981000001" }
    const request = new Request("http://localhost:3000/api/referral", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toMatch(/referrer_phone/)
  })

  it("returns 400 when referred_phone is missing", async () => {
    const { POST } = await import("@/app/api/referral/route")
    const body = { referrer_phone: "595981000000" }
    const request = new Request("http://localhost:3000/api/referral", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toMatch(/referred_phone/)
  })

  it("returns 400 when referrer and referred are the same", async () => {
    const { POST } = await import("@/app/api/referral/route")
    const body = { referrer_phone: "595981000000", referred_phone: "595981000000" }
    const request = new Request("http://localhost:3000/api/referral", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toMatch(/vos mismo/)
  })

  it("returns 404 when referrer is not found in clients table", async () => {
    mockMaybeSingle.mockResolvedValue({ data: null, error: null })
    const { POST } = await import("@/app/api/referral/route")
    const body = { referrer_phone: "595981000000", referred_phone: "595981000001" }
    const request = new Request("http://localhost:3000/api/referral", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(404)
    const data = await response.json()
    expect(data.error).toMatch(/Referidor no encontrado/)
  })

  it("returns 404 when referred is not found in clients table", async () => {
    mockMaybeSingle
      .mockResolvedValueOnce({ data: { id: "client-1" }, error: null })
      .mockResolvedValueOnce({ data: null, error: null })
    const { POST } = await import("@/app/api/referral/route")
    const body = { referrer_phone: "595981000000", referred_phone: "595981000001" }
    const request = new Request("http://localhost:3000/api/referral", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(404)
    const data = await response.json()
    expect(data.error).toMatch(/referida/)
  })

  it("returns 409 when referral already exists", async () => {
    mockMaybeSingle
      .mockResolvedValueOnce({ data: { id: "client-1" }, error: null })
      .mockResolvedValueOnce({ data: { id: "client-2" }, error: null })
      .mockResolvedValueOnce({ data: { id: "existing-referral" }, error: null })
    const { POST } = await import("@/app/api/referral/route")
    const body = { referrer_phone: "595981000000", referred_phone: "595981000001" }
    const request = new Request("http://localhost:3000/api/referral", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(409)
    const data = await response.json()
    expect(data.error).toMatch(/ya registrada/)
  })

  it("returns 200 success with referrer_bonus:25 and referred_bonus:10", async () => {
    mockMaybeSingle
      .mockResolvedValueOnce({ data: { id: "client-1" }, error: null })
      .mockResolvedValueOnce({ data: { id: "client-2" }, error: null })
      .mockResolvedValueOnce({ data: null, error: null })
    mockInsert.mockResolvedValue({ data: null, error: null })
    const { POST } = await import("@/app/api/referral/route")
    const body = { referrer_phone: "595981000000", referred_phone: "595981000001" }
    const request = new Request("http://localhost:3000/api/referral", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toEqual({ ok: true, referrer_bonus: 25, referred_bonus: 10 })
  })
})