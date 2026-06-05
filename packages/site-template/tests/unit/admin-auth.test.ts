import { describe, it, expect } from "vitest"
import { createAdminSessionCookie, clearAdminSessionCookie } from "@/lib/auth/admin-auth"

describe("lib/admin-auth.ts", () => {
  describe("createAdminSessionCookie", () => {
    it("returns cookie string with admin_session", () => {
      const cookie = createAdminSessionCookie("test-token-abc123")
      expect(cookie).toContain("admin_session=test-token-abc123")
      expect(cookie).toContain("HttpOnly")
      expect(cookie).toContain("Max-Age")
    })

    it("sets path to root", () => {
      const cookie = createAdminSessionCookie("token123")
      expect(cookie).toContain("Path=/")
    })

    it("sets SameSite=Lax", () => {
      const cookie = createAdminSessionCookie("token123")
      expect(cookie).toContain("SameSite=Lax")
    })
  })

  describe("clearAdminSessionCookie", () => {
    it("returns cookie that clears admin_session", () => {
      const cookie = clearAdminSessionCookie()
      expect(cookie).toContain("admin_session=")
      expect(cookie).toContain("Max-Age=0")
    })

    it("has correct path for root", () => {
      const cookie = clearAdminSessionCookie()
      expect(cookie).toContain("Path=/")
    })
  })
})