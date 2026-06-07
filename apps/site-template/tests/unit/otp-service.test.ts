import { describe, it, expect, vi, beforeEach } from "vitest"
import { generateOTP, verifyOTP, sendOTP } from "@/lib/auth/otp-service"

describe("generateOTP", () => {
  it("returns a 6-digit string", () => {
    const otp = generateOTP()
    expect(otp).toHaveLength(6)
    expect(/^\d{6}$/.test(otp)).toBe(true)
  })

  it("returns different OTPs on subsequent calls", () => {
    const otps = new Set(Array.from({ length: 10 }, () => generateOTP()))
    expect(otps.size).toBeGreaterThan(1)
  })

  it("all digits are between 0-9", () => {
    const otp = generateOTP()
    expect(/^\d+$/.test(otp)).toBe(true)
  })
})

describe("verifyOTP", () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it("returns false for unknown phone", async () => {
    await expect(verifyOTP("595981999999", "000000")).resolves.toBe(false)
  })

  it("returns false for wrong otp", async () => {
    await sendOTP("595981000100")
    await expect(verifyOTP("595981000100", "000000")).resolves.toBe(false)
  })
})
