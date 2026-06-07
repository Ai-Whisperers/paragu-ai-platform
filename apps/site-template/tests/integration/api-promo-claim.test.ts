import { describe, it, expect, vi, beforeEach } from "vitest"

const mockMaybeSingle = vi.fn()
const mockSelect = vi.fn()
const mockEq = vi.fn()

const createInsertChain = () => ({
  select: vi.fn().mockReturnThis(),
  single: vi.fn().mockResolvedValue({ data: { id: "new-client" }, error: null }),
})

const mockChain = {
  select: mockSelect.mockReturnThis(),
  eq: mockEq.mockReturnThis(),
  maybeSingle: mockMaybeSingle,
  insert: vi.fn(() => createInsertChain()),
}

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: {
    from: vi.fn(() => mockChain),
  },
  isSupabaseConfigured: true,
}))

describe("POST /api/promo-claim", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSelect.mockReturnThis()
    mockEq.mockReturnThis()
    mockMaybeSingle.mockResolvedValue({ data: null, error: null })
    mockChain.insert.mockReturnValue(createInsertChain())
  })

  it("returns 400 when phone is missing", async () => {
    const { POST } = await import("@/app/api/promo/claim/route")
    const request = new Request("http://localhost/api/promo/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ promo_slug: "welcome" }),
    })
    const response = await POST(request)
    const json = await response.json()
    expect(response.status).toBe(400)
    expect(json.error).toContain("phone")
  })

  it("returns 400 when promo_slug is missing", async () => {
    const { POST } = await import("@/app/api/promo/claim/route")
    const request = new Request("http://localhost/api/promo/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: "+595981000001" }),
    })
    const response = await POST(request)
    const json = await response.json()
    expect(response.status).toBe(400)
    expect(json.error).toContain("promo_slug")
  })

  it("returns 200 when new client claims a promo", async () => {
    mockMaybeSingle
      .mockResolvedValueOnce({ data: null, error: null })
      .mockResolvedValueOnce({ data: null, error: null })

    const { POST } = await import("@/app/api/promo/claim/route")
    const request = new Request("http://localhost/api/promo/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: "+595981000001", promo_slug: "welcome" }),
    })
    const response = await POST(request)
    const json = await response.json()
    expect(response.status).toBe(200)
    expect(json.ok).toBe(true)
    expect(json.claimed).toBe(true)
  })

  it("returns 409 when promo already claimed", async () => {
    mockMaybeSingle
      .mockResolvedValueOnce({ data: { id: 1, phone: "+595981000001" }, error: null })
      .mockResolvedValueOnce({ data: { id: 99, client_id: 1, promo_slug: "welcome" }, error: null })

    const { POST } = await import("@/app/api/promo/claim/route")
    const request = new Request("http://localhost/api/promo/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: "+595981000001", promo_slug: "welcome" }),
    })
    const response = await POST(request)
    const json = await response.json()
    expect(response.status).toBe(409)
    expect(json.already_claimed).toBe(true)
  })

  it("returns 500 on insert error", async () => {
    mockMaybeSingle
      .mockResolvedValueOnce({ data: null, error: null })
      .mockResolvedValueOnce({ data: null, error: null })

    mockChain.insert.mockReturnValueOnce({
      select: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: { message: "Insert failed" } }),
    })

    const { POST } = await import("@/app/api/promo/claim/route")
    const request = new Request("http://localhost/api/promo/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: "+595981000001", promo_slug: "welcome" }),
    })
    const response = await POST(request)
    expect(response.status).toBe(500)
  })
})