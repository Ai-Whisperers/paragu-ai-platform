import { describe, it, expect } from "vitest"
import { createSessionToken, verifySessionToken } from "@/lib/auth/client-auth"
import { createHmac, createHash } from "crypto"

function hashPhone(phone: string): string {
  return createHash("sha256").update(phone).digest("hex").slice(0, 24)
}

describe("lib/client-auth.ts", () => {
  describe("createSessionToken", () => {
    it("creates a token with 4 parts separated by dots", () => {
      const token = createSessionToken("595981000000")
      const parts = token.split(".")
      expect(parts.length).toBe(4)
    })

    it("token contains the phone hash (phone is hashed not plaintext)", () => {
      const phone = "595981000000"
      const token = createSessionToken(phone)
      const phoneHash = hashPhone(phone)
      expect(token).toContain(phoneHash)
    })

    it("creates different tokens for different phones", () => {
      const t1 = createSessionToken("595981000001")
      const t2 = createSessionToken("595981000002")
      expect(t1).not.toBe(t2)
    })
  })

  describe("verifySessionToken", () => {
    it("returns null for null/undefined", () => {
      expect(verifySessionToken(null)).toBeNull()
      expect(verifySessionToken(undefined)).toBeNull()
    })

    it("returns null for empty string", () => {
      expect(verifySessionToken("")).toBeNull()
    })

    it("returns null for invalid format (not 4 parts)", () => {
      expect(verifySessionToken("abc")).toBeNull()
      expect(verifySessionToken("a.b")).toBeNull()
      expect(verifySessionToken("a.b.c")).toBeNull()
    })

    it("returns null for tampered signature", () => {
      const token = createSessionToken("595981000000")
      const [p1, p2, p3, p4] = token.split(".")
      const tampered = `${p1}.${p2}.${p3}.${p4}extra`
      expect(verifySessionToken(tampered)).toBeNull()
    })

    it("returns null for expired token (past date)", () => {
      const phone = "595981000000"
      const pastExp = Math.floor(Date.now() / 1000) - 3600
      const nonce = "a".repeat(24)
      const phoneHash = hashPhone(phone)
      const payload = `${pastExp}.${nonce}.${phoneHash}`
      const secret = "test-secret-must-be-at-least-24-chars-long-for-tests"
      const hmac = createHmac("sha256", secret)
      hmac.update(payload)
      const sig = hmac.digest("hex")
      const badToken = `${payload}.${sig}`
      expect(verifySessionToken(badToken)).toBeNull()
    })

    it("returns payload for valid token with phone hash", () => {
      const phone = "595981000000"
      const token = createSessionToken(phone)
      const result = verifySessionToken(token)
      expect(result).not.toBeNull()
      expect(result!.phone).toBe(hashPhone(phone))
      expect(result!.exp).toBeGreaterThan(Math.floor(Date.now() / 1000))
    })

    it("returns null when phone part is missing", () => {
      const token = createSessionToken("595981000000")
      const [p1, p2, , p4] = token.split(".")
      const noPhone = `${p1}.${p2}..${p4}`
      expect(verifySessionToken(noPhone)).toBeNull()
    })
  })
})