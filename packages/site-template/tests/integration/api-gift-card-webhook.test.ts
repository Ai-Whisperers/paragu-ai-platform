import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from "vitest"

const mockConstructEvent = vi.fn(function(body: string) {
  const parsed = JSON.parse(body)
  return { type: parsed.type, data: { object: parsed.data?.object || {} } }
})

const mockMaybeSingle = vi.fn()
const mockInsert = vi.fn()
const mockUpsert = vi.fn()

const createSupabaseMock = () => ({
  from: vi.fn(() => ({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),
    maybeSingle: mockMaybeSingle,
  })),
})

vi.mock("stripe", () => ({
  default: vi.fn(function() {
    return {
      webhooks: {
        constructEvent: mockConstructEvent,
      },
    }
  }),
}))

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: createSupabaseMock(),
  isSupabaseConfigured: true,
}))

describe("POST /api/gift-card/webhook", () => {
  beforeAll(() => {
      process.env.STRIPE_WEBHOOK_SECRET = "test_webhook_secret"
      process.env.STRIPE_SECRET_KEY = "sk_test_mock"
    })

  afterAll(() => {
    delete process.env.STRIPE_WEBHOOK_SECRET
    delete process.env.STRIPE_SECRET_KEY
  })

  beforeEach(() => {
    // Note: NOT calling vi.clearAllMocks() here because it would clear mockImplementation
    mockMaybeSingle.mockReset()
    mockInsert.mockReset()
    mockUpsert.mockReset()
    mockMaybeSingle.mockResolvedValue({ data: null, error: null })
    mockInsert.mockResolvedValue({ data: null, error: null })
    mockUpsert.mockResolvedValue({ data: null, error: null })
  })

  it("returns 400 when stripe-signature header is missing", async () => {
    const body = { type: "checkout.session.completed", data: { object: {} } }
    const request = new Request("http://localhost:3000/api/gift-card/webhook", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const { POST } = await import("@/app/api/gift-card/webhook/route")
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe("missing_signature")
  })

  it("returns 200 with received:true for non-checkout events", async () => {
    const body = { type: "payment_intent.succeeded", data: { object: {} } }
    const request = new Request("http://localhost:3000/api/gift-card/webhook", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": "sig_123",
      },
    })
    const { POST } = await import("@/app/api/gift-card/webhook/route")
    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.received).toBe(true)
  })

  it("returns 200 and creates card on checkout.session.completed", async () => {
    mockMaybeSingle.mockResolvedValue({ data: null, error: null })
    mockInsert.mockResolvedValue({ data: null, error: null })
    mockUpsert.mockResolvedValue({ data: null, error: null })

    const body = {
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_abc123",
          payment_status: "paid",
          metadata: {
            amount_gs: "50000",
            code: "MAGNOLIA-TEST-ABCD",
            recipientName: "Ana",
            gifter_name: "Carlos",
            buyer_phone: "595981000001",
            recipient_phone: "595981000002",
            message: "Para mi querida Ana",
          },
        },
      },
    }
    const request = new Request("http://localhost:3000/api/gift-card/webhook", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": "sig_abc123",
      },
    })
    const { POST } = await import("@/app/api/gift-card/webhook/route")
    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.received).toBe(true)
  })

  it("returns 200 with duplicate:true when card already exists", async () => {
    mockMaybeSingle.mockResolvedValue({ data: [{ id: "existing-card" }], error: null })

    const body = {
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_existing",
          payment_status: "paid",
          metadata: {
            amount_gs: "50000",
            code: "MAGNOLIA-EXIST-1234",
          },
        },
      },
    }
    const request = new Request("http://localhost:3000/api/gift-card/webhook", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": "sig_abc123",
      },
    })
    const { POST } = await import("@/app/api/gift-card/webhook/route")
    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.duplicate).toBe(true)
  })

  it("returns 400 when amount_gs is missing in metadata", async () => {
    const body = {
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_nomount",
          payment_status: "paid",
          metadata: {
            code: "MAGNOLIA-TEST-1234",
          },
        },
      },
    }
    const request = new Request("http://localhost:3000/api/gift-card/webhook", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": "sig_abc123",
      },
    })
    const { POST } = await import("@/app/api/gift-card/webhook/route")
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe("missing_amount")
  })

  it("returns 400 when code is missing in metadata", async () => {
    const body = {
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_nocode",
          payment_status: "paid",
          metadata: {
            amount_gs: "50000",
          },
        },
      },
    }
    const request = new Request("http://localhost:3000/api/gift-card/webhook", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": "sig_abc123",
      },
    })
    const { POST } = await import("@/app/api/gift-card/webhook/route")
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe("missing_code")
  })
})
