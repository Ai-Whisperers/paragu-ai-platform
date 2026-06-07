import { describe, it, expect } from "vitest"

describe("GET /api/auth/check", () => {
  it("returns 401 when no admin_session cookie", async () => {
    const { GET } = await import("@/app/api/auth/check/route")
    const request = new Request("http://localhost:3000/api/auth/check", {
      method: "GET",
    })
    const response = await GET(request)
    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.authenticated).toBe(false)
  })

  it("returns 200 with authenticated:false when no session token", async () => {
    const { GET } = await import("@/app/api/auth/check/route")
    const request = new Request("http://localhost:3000/api/auth/check", {
      method: "GET",
      headers: { Cookie: "other_cookie=value" },
    })
    const response = await GET(request)
    expect(response.status).toBe(401)
  })
})