import { describe, it, expect, vi, beforeEach } from "vitest"

const mockVerifySessionToken = vi.fn()

vi.mock("@/lib/auth/client-auth", () => ({
  verifySessionToken: mockVerifySessionToken,
}))

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({
    get: vi.fn((name: string) => {
      if (name === "tu-emprendimiento_client_session") {
        return { value: "valid_token" }
      }
      return undefined
    }),
  })),
}))

describe("GET /api/auth/me", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns 401 when no session cookie is present", async () => {
    mockVerifySessionToken.mockReturnValue(null)
    const { GET } = await import("@/app/api/auth/me/route")
    const request = new Request("http://localhost:3000/api/auth/me", {
      method: "GET",
    })
    const response = await GET(request)
    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.authenticated).toBe(false)
  })

  it("returns 200 with authenticated=true and phone when valid token", async () => {
    mockVerifySessionToken.mockReturnValue({ phone: "595981000000" })
    const { GET } = await import("@/app/api/auth/me/route")
    const request = new Request("http://localhost:3000/api/auth/me", {
      method: "GET",
      headers: { Cookie: "tu-emprendimiento_client_session=valid_token" },
    })
    const response = await GET(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.authenticated).toBe(true)
    expect(data.phone).toBe("595981000000")
  })

  it("returns 401 when token is invalid or expired", async () => {
    mockVerifySessionToken.mockReturnValue(null)
    const { GET } = await import("@/app/api/auth/me/route")
    const request = new Request("http://localhost:3000/api/auth/me", {
      method: "GET",
      headers: { Cookie: "tu-emprendimiento_client_session=expired_token" },
    })
    const response = await GET(request)
    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.authenticated).toBe(false)
  })

  it("returns 401 when a different cookie name is present (no client session)", async () => {
    mockVerifySessionToken.mockReturnValue(null)
    const { GET } = await import("@/app/api/auth/me/route")
    const request = new Request("http://localhost:3000/api/auth/me", {
      method: "GET",
      headers: { Cookie: "some_other_cookie=abc123" },
    })
    const response = await GET(request)
    expect(response.status).toBe(401)
  })
})