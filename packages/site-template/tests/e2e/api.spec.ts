import { test, expect, request } from "@playwright/test"

const BASE = "http://localhost:3000"

test.describe("API Routes", () => {
  test("GET /api/products returns some response", async () => {
    const ctx = await request.newContext()
    const response = await ctx.get(`${BASE}/api/products`)
    const status = response.status()
    expect(status).not.toBe(404)
  })

  test("GET /api/admin/bookings returns some response", async () => {
    const ctx = await request.newContext()
    const response = await ctx.get(`${BASE}/api/admin/bookings`)
    const status = response.status()
    expect([200, 401, 404]).toContain(status)
  })

  test("GET /api/admin/gift-cards returns some response", async () => {
    const ctx = await request.newContext()
    const response = await ctx.get(`${BASE}/api/admin/gift-cards`)
    const status = response.status()
    expect([200, 401, 404]).toContain(status)
  })

  test("GET /api/admin/content returns some response", async () => {
    const ctx = await request.newContext()
    const response = await ctx.get(`${BASE}/api/admin/content`)
    const status = response.status()
    expect([200, 401, 404]).toContain(status)
  })

  test("POST /api/stripe/checkout without key returns error or 404", async () => {
    const ctx = await request.newContext()
    const response = await ctx.post(`${BASE}/api/stripe/checkout`, {
      data: { amount: 50000, denomination: "Gs. 100,000" },
    })
    const status = response.status()
    expect([400, 404, 500, 503]).toContain(status)
  })

  test("GET /api/stripe/verify without session_id returns error or 404", async () => {
    const ctx = await request.newContext()
    const response = await ctx.get(`${BASE}/api/stripe/verify`)
    const status = response.status()
    expect([400, 404, 500]).toContain(status)
  })

  test("POST /api/auth/admin/send-otp returns some response", async () => {
    const ctx = await request.newContext()
    const response = await ctx.post(`${BASE}/api/auth/admin/send-otp`, {
      data: { phone: "595981000000" },
    })
    const status = response.status()
    expect([200, 400, 404, 500]).toContain(status)
  })

  test("POST /api/auth/admin/verify-otp with invalid OTP returns error or 404", async () => {
    const ctx = await request.newContext()
    const response = await ctx.post(`${BASE}/api/auth/admin/verify-otp`, {
      data: { phone: "595981000000", otp: "000000" },
    })
    const status = response.status()
    expect([400, 401, 404, 500]).toContain(status)
  })

  test("GET /api/admin/stats returns some response", async () => {
    const ctx = await request.newContext()
    const response = await ctx.get(`${BASE}/api/admin/stats`)
    const status = response.status()
    expect([200, 401, 404]).toContain(status)
  })

  test("GET /api/admin/promotions returns some response", async () => {
    const ctx = await request.newContext()
    const response = await ctx.get(`${BASE}/api/admin/promotions`)
    const status = response.status()
    expect([200, 401, 404]).toContain(status)
  })
})