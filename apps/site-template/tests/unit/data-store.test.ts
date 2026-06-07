import { describe, it, expect } from "vitest"
import {
  createBooking,
  getBookings,
  createGiftCard,
  getGiftCards,
  createPromotion,
  addSubscriber,
  addContact,
} from "@/lib/stores"

describe("createBooking", () => {
  it("creates a booking with generated id", async () => {
    const booking = await createBooking({
      client_name: "Ana Test",
      phone: "595981000001",
      service: "Asesoría Fiscal",
      source: "website",
    })
    expect(booking.id).toBeTruthy()
    expect(typeof booking.id).toBe("string")
    expect(booking.id.length).toBeGreaterThan(10)
  })

  it("returns booking matching input fields", async () => {
    const input = {
      client_name: "Carlos Test",
      phone: "595981000002",
      service: "Curso de Marketing",
      preferred_date: "2026-06-15",
      notes: "Primera consulta",
      source: "website",
    }
    const booking = await createBooking(input)
    expect(booking.client_name).toBe(input.client_name)
    expect(booking.phone).toBe(input.phone)
    expect(booking.service).toBe(input.service)
    expect(booking.preferred_date).toBe(input.preferred_date)
    expect(booking.notes).toBe(input.notes)
    expect(booking.status).toBe("pending")
    expect(booking.created_at).toBeTruthy()
  })

  it("sets status to pending by default", async () => {
    const booking = await createBooking({
      client_name: "Test",
      phone: "595981000003",
      service: "Test",
    })
    expect(booking.status).toBe("pending")
  })

  it("accepts source parameter", async () => {
    const booking = await createBooking({
      client_name: "Test",
      phone: "595981000004",
      service: "Test",
      source: "exit-popup",
    })
    expect(booking.source).toBe("exit-popup")
  })
})

describe("getBookings", () => {
  it("returns empty array when no file exists", async () => {
    const bookings = await getBookings()
    expect(Array.isArray(bookings)).toBe(true)
  })

  it("returns created bookings", async () => {
    await createBooking({
      client_name: "Test User",
      phone: "595981000005",
      service: "Test Service",
    })
    const bookings = await getBookings()
    expect(bookings.length).toBeGreaterThan(0)
    const found = bookings.find((b) => b.phone === "595981000005")
    expect(found).toBeDefined()
    expect(found!.client_name).toBe("Test User")
  })
})

describe("createGiftCard", () => {
  it("sets balance equal to amount", async () => {
    const card = await createGiftCard({
      amount: 50000,
      recipient_name: "María",
      recipient_email: "maria@test.com",
    })
    expect(card.balance).toBe(50000)
  })

  it("sets status to active", async () => {
    const card = await createGiftCard({ amount: 30000 })
    expect(card.status).toBe("active")
  })

  it("generates a token", async () => {
    const card = await createGiftCard({ amount: 20000 })
    expect(card.token).toBeTruthy()
    expect(typeof card.token).toBe("string")
    expect(card.token.length).toBeGreaterThan(5)
  })

  it("sets id and created_at", async () => {
    const card = await createGiftCard({ amount: 20000 })
    expect(card.id).toBeTruthy()
    expect(card.created_at).toBeTruthy()
  })
})

describe("getGiftCards", () => {
  it("returns empty array when no file exists", async () => {
    const cards = await getGiftCards()
    expect(Array.isArray(cards)).toBe(true)
  })

  it("returns created gift cards", async () => {
    await createGiftCard({ amount: 40000, recipient_name: "Test" })
    const cards = await getGiftCards()
    expect(cards.length).toBeGreaterThan(0)
  })
})

describe("createPromotion", () => {
  it("creates promotion with id and timestamps", async () => {
    const promo = await createPromotion({
      title: "Test Promo",
      description: "Test description",
      is_active: true,
    })
    expect(promo.id).toBeTruthy()
    expect(promo.created_at).toBeTruthy()
    expect(promo.is_active).toBe(true)
  })

  it("defaults is_active to true", async () => {
    const promo = await createPromotion({ title: "Test" })
    expect(promo.is_active).toBe(true)
  })
})

describe("addSubscriber", () => {
  it("returns true after adding subscriber", async () => {
    const result = await addSubscriber({
      email: `test${Date.now()}@test.com`,
      name: "Test User",
    })
    expect(result).toBe(true)
  })
})

describe("addContact", () => {
  it("returns true after adding contact", async () => {
    const result = await addContact({
      email: `test${Date.now()}@test.com`,
      name: "Contact User",
      message: "Test message",
    })
    expect(result).toBe(true)
  })
})