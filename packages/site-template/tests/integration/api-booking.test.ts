import { describe, it, expect, vi } from "vitest"
import { createBooking } from "@/lib/stores"

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: null,
  isSupabaseConfigured: false,
}))

describe("POST /api/booking (data-store layer)", () => {
  it("returns booking with generated id for valid input", async () => {
    const result = await createBooking({
      client_name: "Ana Test",
      phone: "595981000001",
      service: "Asesoría Fiscal",
      preferred_date: "2026-06-15",
      notes: "Primera consulta",
      source: "website",
    })
    expect(result.id).toBeTruthy()
    expect(result.client_name).toBe("Ana Test")
    expect(result.status).toBe("pending")
  })

  it("creates booking with minimal required fields", async () => {
    const result = await createBooking({
      client_name: "Solo Nombre",
      phone: "595981000002",
      service: "Curso",
    })
    expect(result.id).toBeTruthy()
    expect(result.status).toBe("pending")
  })

  it("generates unique ids for each booking", async () => {
    const r1 = await createBooking({ client_name: "A", phone: "1", service: "S" })
    const r2 = await createBooking({ client_name: "B", phone: "2", service: "S" })
    expect(r1.id).not.toBe(r2.id)
  })

  it("booking has correct structure and types", async () => {
    const result = await createBooking({
      client_name: "Struct Test",
      phone: "595981000099",
      service: "Test Service",
    })
    expect(typeof result.id).toBe("string")
    expect(typeof result.created_at).toBe("string")
    expect(typeof result.updated_at).toBe("string")
    expect(result.status).toBe("pending")
  })
})

describe("POST /api/booking (HTTP route validation)", () => {
  it("returns 400 when client_name is missing", async () => {
    const { POST } = await import("@/app/api/booking/route")
    const body = { phone: "595981000001", service: "Asesoría Fiscal" }
    const request = new Request("http://localhost:3000/api/booking", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it("returns 400 when phone is missing", async () => {
    const { POST } = await import("@/app/api/booking/route")
    const body = { client_name: "Ana", service: "Asesoría Fiscal" }
    const request = new Request("http://localhost:3000/api/booking", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.message).toContain("requeridos")
  })

  it("returns 400 when service is missing", async () => {
    const { POST } = await import("@/app/api/booking/route")
    const body = { client_name: "Ana", phone: "595981000001" }
    const request = new Request("http://localhost:3000/api/booking", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it("returns 200 for valid booking request", async () => {
    const { POST } = await import("@/app/api/booking/route")
    const body = {
      client_name: "Ana HTTP Test",
      phone: "595981000001",
      service: "Asesoría Fiscal",
    }
    const request = new Request("http://localhost:3000/api/booking", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.ok).toBe(true)
  })

  it("accepts optional preferred_date and notes", async () => {
    const { POST } = await import("@/app/api/booking/route")
    const body = {
      client_name: "Full Booking",
      phone: "595981000888",
      service: "Curso",
      preferred_date: "2026-07-01",
      notes: "Necesito el manual antes",
    }
    const request = new Request("http://localhost:3000/api/booking", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.ok).toBe(true)
    expect(data.id).toBeTruthy()
  })
})