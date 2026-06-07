import { describe, it, expect, vi, beforeEach } from "vitest"

const mockMaybeSingle = vi.fn()
const mockSingle = vi.fn()
const mockUpdate = vi.fn()
const mockUpsert = vi.fn()

const createResolve = (data: unknown, error: unknown = null) => Promise.resolve({ data, error })

const mockChain = {
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  gt: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  upsert: vi.fn().mockReturnThis(),
  single: mockSingle,
  maybeSingle: mockMaybeSingle,
}

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: {
    from: vi.fn(() => mockChain),
  },
  isSupabaseConfigured: true,
}))

vi.mock("@/lib/auth/client-auth", () => ({
  createSessionToken: vi.fn(() => "mock_session_token"),
}))

describe("POST /api/auth/otp/verify", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSingle.mockResolvedValue({ data: null, error: null })
    mockMaybeSingle.mockResolvedValue({ data: null, error: null })
    mockUpdate.mockResolvedValue({ data: null, error: null })
    mockUpsert.mockResolvedValue({ data: null, error: null })
    mockChain.select.mockReturnThis()
    mockChain.eq.mockReturnThis()
    mockChain.gt.mockReturnThis()
    mockChain.order.mockReturnThis()
    mockChain.limit.mockReturnThis()
    mockChain.update.mockReturnThis()
    mockChain.upsert.mockReturnThis()
  })

  it("returns 400 when phone is missing", async () => {
    const { POST } = await import("@/app/api/auth/otp/verify/route")
    const body = { code: "123456" }
    const request = new Request("http://localhost:3000/api/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.message).toBe("Teléfono y código son requeridos")
  })

  it("returns 400 when code is missing", async () => {
    const { POST } = await import("@/app/api/auth/otp/verify/route")
    const body = { phone: "595981000000" }
    const request = new Request("http://localhost:3000/api/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.message).toBe("Teléfono y código son requeridos")
  })

  it("returns 401 when code is invalid or expired (empty records)", async () => {
    mockChain.limit.mockReturnValue(createResolve([], null))
    const { POST } = await import("@/app/api/auth/otp/verify/route")
    const body = { phone: "595981000000", code: "000000" }
    const request = new Request("http://localhost:3000/api/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.message).toBe("Código inválido o expirado")
  })

  it("returns 200 with session cookie when OTP is valid", async () => {
    mockChain.limit.mockResolvedValue({ data: [{ id: 1, phone: "595981000000", code: "123456", verified: false }], error: null })
    const { POST } = await import("@/app/api/auth/otp/verify/route")
    const body = { phone: "595981000000", code: "123456" }
    const request = new Request("http://localhost:3000/api/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.ok).toBe(true)
    expect(data.phone).toBe("595981000000")
    const cookieHeader = response.headers.get("set-cookie")
    expect(cookieHeader).toContain("tu-emprendimiento_client_session")
    expect(cookieHeader).toContain("HttpOnly")
  })

  it("strips non-digit characters from phone before lookup", async () => {
    mockChain.limit.mockResolvedValue({ data: [], error: null })
    const { POST } = await import("@/app/api/auth/otp/verify/route")
    const body = { phone: "+595 981 000 000", code: "123456" }
    const request = new Request("http://localhost:3000/api/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(401)
  })
})