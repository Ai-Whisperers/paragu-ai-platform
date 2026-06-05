import { describe, it, expect, vi, beforeEach } from "vitest"

const mockSupabase: {
  isSupabaseConfigured: boolean
  supabaseAdmin: unknown
} = {
  isSupabaseConfigured: false,
  supabaseAdmin: null,
}

vi.mock("@/lib/supabase", () => mockSupabase)

describe("GET /api/client/[phone]", () => {
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
              maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
            }),
          }),
        }),
      },
      ...overrides,
    }
    Object.assign(mockSupabase, mock)
  }

  it("returns 503 when Supabase is not configured", async () => {
    mockSupabase.isSupabaseConfigured = false
    mockSupabase.supabaseAdmin = null
    const { GET } = await import("@/app/api/client/[phone]/route")
    const request = new Request("http://localhost:3000/api/client/595981000000")
    const response = await GET(request, { params: Promise.resolve({ phone: "595981000000" }) })
    expect(response.status).toBe(503)
    const data = await response.json()
    expect(data.error).toBe("db_not_configured")
  })

  it("returns 404 when client is not found", async () => {
    makeSupabaseMock({
      supabaseAdmin: {
        from: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
            }),
          }),
        }),
      },
    })
    const { GET } = await import("@/app/api/client/[phone]/route")
    const request = new Request("http://localhost:3000/api/client/595981000000")
    const response = await GET(request, { params: Promise.resolve({ phone: "595981000000" }) })
    expect(response.status).toBe(404)
    const data = await response.json()
    expect(data.error).toBe("not_found")
  })

  it("returns client data with points and tier", async () => {
    const clientData = { id: "cl-1", phone: "595981000000", name: "Ana", tier: "bronce", visits: 5 }
    mockSupabase.isSupabaseConfigured = true
    mockSupabase.supabaseAdmin = {
      from: vi.fn().mockImplementation((table: string) => {
        if (table === "clients") {
          return {
            select: () => ({
              eq: () => ({
                maybeSingle: vi.fn().mockResolvedValue({ data: clientData, error: null }),
              }),
            }),
          }
        }
        const baseBuilder = {
          select: () => baseBuilder,
          or: () => baseBuilder,
          eq: () => baseBuilder,
          order: () => baseBuilder,
          limit: vi.fn().mockResolvedValue({ data: [], error: null }),
        }
        return baseBuilder
      }),
    }
    const { GET } = await import("@/app/api/client/[phone]/route")
    const request = new Request("http://localhost:3000/api/client/595981000000")
    const response = await GET(request, { params: Promise.resolve({ phone: "595981000000" }) })
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.phone).toBe("595981000000")
    expect(data.name).toBe("Ana")
    expect(data.tier).toBe("bronce")
  })
})