import { describe, it, expect } from "vitest"

describe("POST /api/auth/logout", () => {
  it("clears both session cookies and redirects to login", async () => {
    const { POST } = await import("@/app/api/auth/logout/route")
    const url = new URL("http://localhost:3000/api/auth/logout")
    const request = new Request(url.toString(), { method: "POST" })
    const response = await POST(request)
    expect([301, 302, 307, 308]).toContain(response.status)
    const setCookies = response.headers.getSetCookie()
    expect(setCookies.some((c) => c.includes("admin_session=") && c.includes("Max-Age=0"))).toBe(true)
    expect(setCookies.some((c) => c.includes("tu-emprendimiento_client_session=") && c.includes("Max-Age=0"))).toBe(true)
  })
})