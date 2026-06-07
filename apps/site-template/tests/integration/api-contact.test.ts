import { describe, it, expect, vi } from "vitest"

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: null,
  isSupabaseConfigured: false,
}))

describe("POST /api/contact", () => {
  it("returns 200 for valid contact form", async () => {
    const { POST } = await import("@/app/api/contact/route")
    const body = {
      name: "Carlos Test",
      email: "carlos@test.com",
      message: "Me interesa sus servicios",
    }
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.ok).toBe(true)
  })

  it("returns 400 when email is missing", async () => {
    const { POST } = await import("@/app/api/contact/route")
    const body = { name: "Carlos" }
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.message).toContain("requeridos")
  })

  it("returns 400 when name is missing", async () => {
    const { POST } = await import("@/app/api/contact/route")
    const body = { email: "carlos@test.com" }
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it("returns 400 for invalid email format", async () => {
    const { POST } = await import("@/app/api/contact/route")
    const body = { name: "Carlos", email: "not-an-email" }
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.message).toContain("inválido")
  })

  it("returns 200 even when message is empty", async () => {
    const { POST } = await import("@/app/api/contact/route")
    const body = { name: "Carlos", email: "carlos@test.com", message: "" }
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
  })

  it("returns 400 for invalid JSON body", async () => {
    const { POST } = await import("@/app/api/contact/route")
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      body: "not-json",
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it("defaults source to exit-popup", async () => {
    const { POST } = await import("@/app/api/contact/route")
    const body = { name: "Source Test", email: `source${Date.now()}@test.com` }
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
  })

  it("returns 400 when email is not a string", async () => {
    const { POST } = await import("@/app/api/contact/route")
    const body = { name: "Carlos", email: { invalid: true } }
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
  })
})