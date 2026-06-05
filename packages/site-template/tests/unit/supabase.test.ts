import { describe, it, expect } from "vitest"
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase"

describe("lib/supabase.ts", () => {
  it("isSupabaseConfigured is a boolean", () => {
    expect(typeof isSupabaseConfigured).toBe("boolean")
  })

  it("supabaseAdmin is null when not configured (env vars are empty in test env)", () => {
    if (!isSupabaseConfigured) {
      expect(supabaseAdmin).toBeNull()
    } else {
      expect(supabaseAdmin).not.toBeNull()
    }
  })
})