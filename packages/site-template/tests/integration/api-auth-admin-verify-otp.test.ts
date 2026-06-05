import { describe, it, expect, vi, beforeEach } from "vitest"

const mockVerifyOTP = vi.fn()
const mockSignToken = vi.fn()

vi.mock("@/lib/auth/otp-service", () => ({
  verifyOTP: mockVerifyOTP,
}))

vi.mock("@/lib/auth/admin-auth", () => ({
  signToken: mockSignToken,
}))

describe("POST /api/auth/admin/verify-otp", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSignToken.mockResolvedValue("mock_admin_jwt_token")
  })

  it("returns 400 when phone is missing", async () => {
    mockVerifyOTP.mockReturnValue(false)
    const { POST } = await import("@/app/api/auth/admin/verify-otp/route")
    const body = { otp: "123456" }
    const request = new Request("http://localhost:3000/api/auth/admin/verify-otp", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe("Phone and OTP required")
  })

  it("returns 400 when OTP is missing", async () => {
    mockVerifyOTP.mockReturnValue(false)
    const { POST } = await import("@/app/api/auth/admin/verify-otp/route")
    const body = { phone: "595981000000" }
    const request = new Request("http://localhost:3000/api/auth/admin/verify-otp", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe("Phone and OTP required")
  })

  it("returns 400 when OTP is invalid", async () => {
    mockVerifyOTP.mockReturnValue(false)
    const { POST } = await import("@/app/api/auth/admin/verify-otp/route")
    const body = { phone: "595981000000", otp: "000000" }
    const request = new Request("http://localhost:3000/api/auth/admin/verify-otp", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe("Invalid or expired OTP")
  })

  it("returns 200 and sets admin_session cookie when OTP is valid", async () => {
    mockVerifyOTP.mockReturnValue(true)
    const { POST } = await import("@/app/api/auth/admin/verify-otp/route")
    const body = { phone: "595981000000", otp: "123456" }
    const request = new Request("http://localhost:3000/api/auth/admin/verify-otp", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.success).toBe(true)
    const cookieHeader = response.headers.get("set-cookie")
    expect(cookieHeader).toContain("admin_session")
    expect(cookieHeader).toContain("mock_admin_jwt_token")
    expect(cookieHeader).toContain("HttpOnly")
    expect(cookieHeader).toContain("Path=/")
  })

  it("prepends + to phone if not already prefixed", async () => {
    mockVerifyOTP.mockReturnValue(true)
    const { POST } = await import("@/app/api/auth/admin/verify-otp/route")
    const body = { phone: "595981000000", otp: "123456" }
    const request = new Request("http://localhost:3000/api/auth/admin/verify-otp", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(mockVerifyOTP).toHaveBeenCalledWith("+595981000000", "123456")
    expect(response.status).toBe(200)
  })

  it("does not double-prefix phone already starting with +", async () => {
    mockVerifyOTP.mockReturnValue(true)
    const { POST } = await import("@/app/api/auth/admin/verify-otp/route")
    const body = { phone: "+595981000000", otp: "123456" }
    const request = new Request("http://localhost:3000/api/auth/admin/verify-otp", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(mockVerifyOTP).toHaveBeenCalledWith("+595981000000", "123456")
    expect(response.status).toBe(200)
  })

  it("returns 500 when verifyOTP throws an error", async () => {
    mockVerifyOTP.mockImplementation(() => {
      throw new Error("OTP service error")
    })
    const { POST } = await import("@/app/api/auth/admin/verify-otp/route")
    const body = { phone: "595981000000", otp: "123456" }
    const request = new Request("http://localhost:3000/api/auth/admin/verify-otp", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(500)
    const data = await response.json()
    expect(data.error).toBe("Verification failed")
  })
})