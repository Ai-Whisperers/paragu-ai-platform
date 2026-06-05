import { describe, it, expect, vi } from "vitest"

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: null,
  isSupabaseConfigured: false,
}))

describe("GET /api/gift-card/[token]", () => {
  it("returns 503 when DB not configured", async () => {
    const { GET } = await import("@/app/api/gift-card/[token]/route")
    const request = new Request("http://localhost:3000/api/gift-card/some-token", {
      method: "GET",
    })
    const response = await GET(request, { params: Promise.resolve({ token: "some-token" }) } as { params: Promise<{ token: string }> })
    expect(response.status).toBe(503)
  })
})