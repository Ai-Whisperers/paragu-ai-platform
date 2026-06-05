import { describe, it, expect } from "vitest"

describe("POST /api/auth/admin/send-otp", () => {
  it("returns 400 when phone is missing", async () => {
    const { POST } = await import("@/app/api/auth/admin/send-otp/route")
    const request = new Request("http://localhost:3000/api/auth/admin/send-otp", {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain("required")
  })

  it("returns 400 when phone is not a string", async () => {
    const { POST } = await import("@/app/api/auth/admin/send-otp/route")
    const request = new Request("http://localhost:3000/api/auth/admin/send-otp", {
      method: "POST",
      body: JSON.stringify({ phone: 12345 }),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it("returns 405 for GET method", async () => {
    const { GET } = await import("@/app/api/auth/admin/send-otp/route")
    const request = new Request("http://localhost:3000/api/auth/admin/send-otp", {
      method: "GET",
    })
    const response = await GET(request)
    expect(response.status).toBe(405)
  })

  it("returns 200 for valid phone (sends OTP via WhatsApp dev log)", async () => {
    const { POST } = await import("@/app/api/auth/admin/send-otp/route")
    const request = new Request("http://localhost:3000/api/auth/admin/send-otp", {
      method: "POST",
      body: JSON.stringify({ phone: "595981000000" }),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.success).toBe(true)
  })
})