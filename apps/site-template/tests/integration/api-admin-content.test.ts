import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("@/lib/auth/admin-auth-guard", () => ({
  requireAdminAuth: vi.fn().mockResolvedValue({ phone: "+595991000000", authorized: true }),
}))

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: null,
  isSupabaseConfigured: false,
}))

vi.mock("@/lib/stores", () => ({
  getSiteContent: vi.fn().mockResolvedValue({ hero: { title: "Test Hero" }, about: { text: "About us" } }),
  setSiteContent: vi.fn().mockResolvedValue(true),
}))

global.fetch = vi.fn()

describe("GET /api/admin/content", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns 200 with sections and siteId default", async () => {
    const { getSiteContent } = await import("@/lib/stores")
    const { GET } = await import("@/app/api/admin/content/route")
    const request = new Request("http://localhost:3000/api/admin/content", {
      method: "GET",
    })
    const response = await GET(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty("content")
    expect(data).toHaveProperty("siteId")
    expect(data.siteId).toBe("default")
    expect(getSiteContent).toHaveBeenCalledWith("default")
  })

  it("returns 200 with custom siteId from query param", async () => {
    const { getSiteContent } = await import("@/lib/stores")
    const { GET } = await import("@/app/api/admin/content/route")
    const request = new Request("http://localhost:3000/api/admin/content?site=mysite", {
      method: "GET",
    })
    const response = await GET(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.siteId).toBe("mysite")
    expect(getSiteContent).toHaveBeenCalledWith("mysite")
  })

  it("returns 500 when getSiteContent throws", async () => {
    const { getSiteContent } = await import("@/lib/stores")
    ;(getSiteContent as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("db error"))
    const { GET } = await import("@/app/api/admin/content/route")
    const request = new Request("http://localhost:3000/api/admin/content", {
      method: "GET",
    })
    const response = await GET(request)
    expect(response.status).toBe(500)
  })
})

describe("PUT /api/admin/content", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns 200 on successful save", async () => {
    const { setSiteContent } = await import("@/lib/stores")
    const { PUT } = await import("@/app/api/admin/content/route")
    const body = { siteId: "default", content: { hero: { title: "Updated Hero" } } }
    const request = new Request("http://localhost:3000/api/admin/content", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await PUT(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty("section")
    expect(data.section.key).toBe("default")
    expect(data.section.content).toEqual(body.content)
    expect(setSiteContent).toHaveBeenCalledWith("default", body.content)
  })

  it("returns 200 with custom siteId", async () => {
    const { setSiteContent } = await import("@/lib/stores")
    const { PUT } = await import("@/app/api/admin/content/route")
    const body = { siteId: "custom-site", content: { foo: "bar" } }
    const request = new Request("http://localhost:3000/api/admin/content", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await PUT(request)
    expect(response.status).toBe(200)
    expect(setSiteContent).toHaveBeenCalledWith("custom-site", body.content)
  })

  it("returns 400 when content is missing", async () => {
    const { PUT } = await import("@/app/api/admin/content/route")
    const body = { siteId: "default" }
    const request = new Request("http://localhost:3000/api/admin/content", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await PUT(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toMatch(/content/i)
  })

  it("returns 500 when setSiteContent returns false", async () => {
    const { setSiteContent } = await import("@/lib/stores")
    ;(setSiteContent as ReturnType<typeof vi.fn>).mockResolvedValueOnce(false)
    const { PUT } = await import("@/app/api/admin/content/route")
    const body = { siteId: "default", content: { hero: {} } }
    const request = new Request("http://localhost:3000/api/admin/content", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await PUT(request)
    expect(response.status).toBe(500)
  })
})

describe("PUT /api/admin/content/[key]", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns 200 with valid key and content", async () => {
    const { setSiteContent } = await import("@/lib/stores")
    const { PUT } = await import("@/app/api/admin/content/[key]/route")
    const body = { content: { title: "Updated Hero Section" } }
    const request = new Request("http://localhost:3000/api/admin/content/hero", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await PUT(request, { params: Promise.resolve({ key: "hero" }) })
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty("section")
    expect(data.section.key).toBe("hero")
    expect(data.section.content).toEqual(body.content)
    expect(setSiteContent).toHaveBeenCalledWith("default", expect.objectContaining({ hero: body.content }))
  })

  it("returns 400 when content is missing", async () => {
    const { PUT } = await import("@/app/api/admin/content/[key]/route")
    const body = {}
    const request = new Request("http://localhost:3000/api/admin/content/hero", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await PUT(request, { params: Promise.resolve({ key: "hero" }) })
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toMatch(/content/i)
  })

  it("returns 500 when setSiteContent returns false", async () => {
    const { setSiteContent } = await import("@/lib/stores")
    ;(setSiteContent as ReturnType<typeof vi.fn>).mockResolvedValueOnce(false)
    const { PUT } = await import("@/app/api/admin/content/[key]/route")
    const body = { content: { title: "Test" } }
    const request = new Request("http://localhost:3000/api/admin/content/hero", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await PUT(request, { params: Promise.resolve({ key: "hero" }) })
    expect(response.status).toBe(500)
  })

  it("uses correct key from params", async () => {
    const { setSiteContent } = await import("@/lib/stores")
    const { PUT } = await import("@/app/api/admin/content/[key]/route")
    const body = { content: { title: "About Section" } }
    const request = new Request("http://localhost:3000/api/admin/content/about", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
    const response = await PUT(request, { params: Promise.resolve({ key: "about" }) })
    expect(response.status).toBe(200)
    expect(setSiteContent).toHaveBeenCalledWith("default", expect.objectContaining({ about: body.content }))
  })
})
