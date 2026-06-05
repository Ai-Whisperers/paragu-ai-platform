import { describe, it, expect } from "vitest"
import {
  generateBusinessSchema,
  generateProductSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/api/seo"

describe("lib/seo.ts", () => {
  describe("generateBusinessSchema", () => {
    it("returns a valid Schema.org JSON-LD object", () => {
      const schema = generateBusinessSchema() as Record<string, unknown>
      expect(schema["@context"]).toBe("https://schema.org")
      expect(schema["@type"]).toBe("LocalBusiness")
    })

    it("includes required fields: name, address, geo, url, telephone", () => {
      const schema = generateBusinessSchema() as Record<string, unknown>
      expect(schema.name).toBeTruthy()
      expect((schema.address as Record<string, unknown>)["@type"]).toBe("PostalAddress")
      expect((schema.geo as Record<string, unknown>)["@type"]).toBe("GeoCoordinates")
      expect(schema.url).toBeTruthy()
      expect(schema.telephone).toBeTruthy()
    })

    it("includes priceRange", () => {
      const schema = generateBusinessSchema() as Record<string, unknown>
      expect(schema.priceRange).toBe("$$")
    })

    it("includes openingHoursSpecification", () => {
      const schema = generateBusinessSchema() as Record<string, unknown>
      expect(Array.isArray(schema.openingHoursSpecification)).toBe(true)
      expect((schema.openingHoursSpecification as unknown[]).length).toBeGreaterThan(0)
    })

    it("includes sameAs with Instagram and Facebook URLs", () => {
      const schema = generateBusinessSchema() as Record<string, unknown>
      expect(Array.isArray(schema.sameAs)).toBe(true)
      expect((schema.sameAs as string[]).some((s: string) => s.includes("instagram"))).toBe(true)
    })
  })

  describe("generateProductSchema", () => {
    it("returns a valid Product schema", () => {
      const product = { name: "Asesoría Fiscal", description: "Tax advisory", price: 80000, image: "https://example.com/img.jpg" }
      const schema = generateProductSchema(product) as Record<string, unknown>
      expect(schema["@context"]).toBe("https://schema.org")
      expect(schema["@type"]).toBe("Product")
      expect(schema.name).toBe("Asesoría Fiscal")
    })

    it("includes brand from site name", () => {
      const product = { name: "Test", description: "Test", price: 10000 }
      const schema = generateProductSchema(product) as Record<string, unknown>
      expect(schema.brand).toBeTruthy()
      expect((schema.brand as Record<string, unknown>)["@type"]).toBe("Brand")
    })

    it("includes offers with price and currency", () => {
      const product = { name: "Test", description: "Test", price: 150000 }
      const schema = generateProductSchema(product) as Record<string, unknown>
      expect(schema.offers).toBeTruthy()
      expect((schema.offers as Record<string, unknown>)["@type"]).toBe("Offer")
      expect((schema.offers as Record<string, unknown>).priceCurrency).toBe("USD")
    })

    it("includes aggregateRating when rating present", () => {
      const product = { name: "Test", description: "Test", price: 10000, rating: 4.5, reviews_count: 20 }
      const schema = generateProductSchema(product) as Record<string, unknown>
      expect(schema.aggregateRating).toBeTruthy()
      expect((schema.aggregateRating as Record<string, unknown>).ratingValue).toBe(4.5)
      expect((schema.aggregateRating as Record<string, unknown>).reviewCount).toBe(20)
    })

    it("omits aggregateRating when no rating", () => {
      const product = { name: "Test", description: "Test", price: 10000 }
      const schema = generateProductSchema(product) as Record<string, unknown>
      expect(schema.aggregateRating).toBeUndefined()
    })
  })

  describe("generateArticleSchema", () => {
    it("returns a valid Article schema", () => {
      const article = { title: "How to Start", author: "Juan", date: "2026-01-01", image: "https://example.com/img.jpg" }
      const schema = generateArticleSchema(article) as Record<string, unknown>
      expect(schema["@context"]).toBe("https://schema.org")
      expect(schema["@type"]).toBe("Article")
      expect(schema.headline).toBe("How to Start")
      expect((schema.author as Record<string, unknown>).name).toBe("Juan")
      expect(schema.datePublished).toBe("2026-01-01")
    })

    it("includes publisher with logo", () => {
      const article = { title: "Test", author: "Author", date: "2026-01-01", image: "img.jpg" }
      const schema = generateArticleSchema(article) as Record<string, unknown>
      expect(schema.publisher).toBeTruthy()
      expect((schema.publisher as Record<string, unknown>).name).toBeTruthy()
      expect((schema.publisher as Record<string, unknown>).logo).toBeTruthy()
    })
  })

  describe("generateBreadcrumbSchema", () => {
    it("returns a valid BreadcrumbList schema", () => {
      const items = [
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
      ]
      const schema = generateBreadcrumbSchema(items) as Record<string, unknown>
      expect(schema["@context"]).toBe("https://schema.org")
      expect(schema["@type"]).toBe("BreadcrumbList")
      expect(schema.itemListElement).toHaveLength(2)
    })

    it("maps items with position starting at 1", () => {
      const items = [{ name: "A", url: "/a" }, { name: "B", url: "/b" }, { name: "C", url: "/c" }]
      const schema = generateBreadcrumbSchema(items) as Record<string, unknown>
      ;(schema.itemListElement as Array<{position?: number; name?: string; item?: string}>).forEach((item, i) => {
        expect(item.position).toBe(i + 1)
        expect(item.name).toBe(items[i].name)
        expect(item.item).toBe(items[i].url)
      })
    })
  })
})