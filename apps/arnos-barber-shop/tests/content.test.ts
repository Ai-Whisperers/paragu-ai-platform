import { describe, expect, it } from "vitest"
import content from "../content/es.json"

const serialized = JSON.stringify(content)

describe("barbershop preview content contract", () => {
  it("never publishes invented business claims or template residue", () => {
    expect(serialized).not.toMatch(/Estudio Medieval|162 reseñas|118 reseñas|5\.0★|4\.9★|American Crew|Layrite|Baxter/i)
  })

  it("labels unverified commercial facts honestly", () => {
    expect(content.site.verificationStatus).toBe("preview")
    expect(content.services.items.every((service) => service.price === "Consultar")).toBe(true)
    expect(content.testimonials.items).toHaveLength(0)
    expect(content.team.items).toHaveLength(0)
    expect(content.gallery.items).toHaveLength(0)
  })

  it("provides complete conversion and discovery sections", () => {
    expect(content.navigation.items.map((item) => item.href)).toEqual([
      "#servicios",
      "#experiencia",
      "#trabajos",
      "#equipo",
      "#horarios",
      "#faq",
    ])
    expect(content.services.items.length).toBeGreaterThanOrEqual(6)
    expect(content.experience.items.length).toBeGreaterThanOrEqual(4)
    expect(content.faq.items.length).toBeGreaterThanOrEqual(6)
    expect(content.schedule.weekly).toHaveLength(7)
    expect(content.schedule.payments.length).toBeGreaterThanOrEqual(2)
    expect(content.schedule.policy.length).toBeGreaterThanOrEqual(3)
    expect(content.trust.items.length).toBeGreaterThanOrEqual(3)
    expect(content.metrics.items.length).toBeGreaterThanOrEqual(3)
    expect(content.contact.whatsappMessage).toMatch(/turno/i)
  })

  it("hero badge and primary CTA remain aligned", () => {
    expect(content.hero.badge).toBeTruthy()
    expect(content.hero.headline).toContain("corte con intención")
    expect(content.hero.ctaPrimaryHref).toContain("wa.me/595983996086")
  })
})
