import { describe, it, expect, vi } from "vitest"
import { getPromotions, createPromotion } from "@/lib/stores"

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: null,
  isSupabaseConfigured: false,
}))

describe("GET /api/admin/promotions (via getPromotions)", () => {
  it("returns array of promotions", async () => {
    const promotions = await getPromotions()
    expect(Array.isArray(promotions)).toBe(true)
  })
})

describe("POST /api/admin/promotions (via createPromotion)", () => {
  it("creates promotion with all fields", async () => {
    const promo = await createPromotion({
      title: "Descuento 20%",
      subtitle: "Solo este mes",
      badge: "Oferta",
      description: "20% off en servicios de asesoría",
      is_active: true,
    })
    expect(promo.id).toBeTruthy()
    expect(promo.title).toBe("Descuento 20%")
    expect(promo.is_active).toBe(true)
  })

  it("creates promotion with minimal fields", async () => {
    const promo = await createPromotion({ title: "Minimal Promo" })
    expect(promo.id).toBeTruthy()
    expect(promo.title).toBe("Minimal Promo")
    expect(promo.is_active).toBe(true)
  })

  it("defaults is_active to true", async () => {
    const promo = await createPromotion({ title: "Test" })
    expect(promo.is_active).toBe(true)
  })

  it("sets created_at and updated_at", async () => {
    const promo = await createPromotion({ title: "TimeTest" })
    expect(promo.created_at).toBeTruthy()
    expect(promo.updated_at).toBeTruthy()
  })
})