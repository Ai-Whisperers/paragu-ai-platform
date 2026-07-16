import { describe, expect, it } from "vitest"
import { buildBarberShopSchema, buildFaqSchema, buildServicesSchema, SITE_URL } from "../src/lib/site-schema"
import content from "../content/es.json"

describe("BarberShop structured data", () => {
  it("uses the live canonical domain and verified contact details", () => {
    const schema = buildBarberShopSchema(content)
    expect(schema["@type"]).toBe("BarberShop")
    expect(schema.url).toBe(SITE_URL)
    expect(schema.telephone).toBe(content.site.phone)
    expect(schema.address).toMatchObject({ addressLocality: content.site.city, addressCountry: "PY" })
  })

  it("omits ratings, social profiles, coordinates, and invented prices until verified", () => {
    const schema = buildBarberShopSchema(content) as Record<string, unknown>
    expect(schema.aggregateRating).toBeUndefined()
    expect(schema.sameAs).toBeUndefined()
    expect(schema.geo).toBeUndefined()
    expect(schema.priceRange).toBeUndefined()
  })

  it("service catalog only references verifiable titles and descriptions", () => {
    const schemas = buildServicesSchema(content)
    expect(schemas.length).toBe(content.services.items.length)
    for (const schema of schemas) {
      expect(schema["@type"]).toBe("Offer")
      expect(schema.name).toBeTruthy()
      expect(schema.priceCurrency).toBe("PYG")
      expect(schema.price).toBe("0.00")
    }
  })

  it("FAQ schema mirrors the visible FAQ list", () => {
    const schema = buildFaqSchema(content)
    expect(schema["@type"]).toBe("FAQPage")
    expect(schema.mainEntity).toHaveLength(content.faq.items.length)
  })
})
