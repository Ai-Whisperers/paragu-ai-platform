import { describe, it, expect } from "vitest"
import {
  formatGs,
  formatHours,
  getColorMap,
  waLink,
  waLinkForService,
  ColorName,
} from "@/lib/config/config"

describe("formatGs", () => {
  it("formats 150000 as Gs. 150.000", () => {
    expect(formatGs(150000)).toBe("Gs. 150.000")
  })

  it("formats 1000 as Gs. 1.000", () => {
    expect(formatGs(1000)).toBe("Gs. 1.000")
  })

  it("formats 0 as Gs. 0", () => {
    expect(formatGs(0)).toBe("Gs. 0")
  })

  it("returns em dash for null", () => {
    expect(formatGs(null)).toBe("—")
  })

  it("returns em dash for undefined", () => {
    expect(formatGs(undefined)).toBe("—")
  })

  it("formats large numbers with separators", () => {
    expect(formatGs(10000000)).toBe("Gs. 10.000.000")
  })
})

describe("formatHours", () => {
  it("formats object hours as human readable string", () => {
    const hours = {
      monday: "09:00-18:00",
      tuesday: "09:00-18:00",
      wednesday: "09:00-18:00",
    }
    const result = formatHours(hours)
    expect(result).toContain("Lun: 09:00-18:00")
    expect(result).toContain("Mar: 09:00-18:00")
    expect(result).toContain("Mié: 09:00-18:00")
  })

  it("returns string hours as-is", () => {
    expect(formatHours("Lun-Vie 09:00-18:00")).toBe("Lun-Vie 09:00-18:00")
  })

  it("handles abbreviated day names", () => {
    const hours = { mon: "08:00-17:00", fri: "08:00-14:00" }
    const result = formatHours(hours)
    expect(result).toContain("Lun: 08:00-17:00")
    expect(result).toContain("Vie: 08:00-14:00")
  })
})

describe("getColorMap", () => {
  it("returns rose colors for 'rose'", () => {
    const map = getColorMap("rose")
    expect(map.bg).toBe("bg-rose-500")
    expect(map.light).toBe("from-rose-50")
    expect(map.text).toBe("text-rose-500")
  })

  it("returns violet colors for 'violet'", () => {
    const map = getColorMap("violet")
    expect(map.bg).toBe("bg-violet-500")
    expect(map.light).toBe("from-violet-50")
  })

  it("returns amber colors for 'amber'", () => {
    const map = getColorMap("amber")
    expect(map.bg).toBe("bg-amber-500")
    expect(map.light).toBe("from-amber-50")
  })

  it("returns sky colors for 'sky'", () => {
    const map = getColorMap("sky")
    expect(map.bg).toBe("bg-sky-500")
    expect(map.light).toBe("from-sky-50")
  })

  it("defaults to rose for unknown color", () => {
    const map = getColorMap("unknown" as unknown as ColorName)
    expect(map).toEqual(getColorMap("rose"))
  })

  it("defaults to rose when called with no arg", () => {
    const map = getColorMap()
    expect(map.bg).toBe("bg-rose-500")
  })
})

describe("waLink", () => {
  it("builds wa.me URL with encoded message", () => {
    const link = waLink("Hola mundo")
    expect(link).toMatch(/^https:\/\/wa\.me\/\d+\?text=Hola%20mundo$/)
  })

  it("encodes special characters", () => {
    const link = waLink("¿Cómo estás? ¡Hola!")
    expect(link).toContain("%C2%BFC%C3%B3mo")
    expect(link).toContain("est%C3%A1s")
    expect(link).toContain("%C2%A1Hola")
  })
})

describe("waLinkForService", () => {
  it("appends service name to message", () => {
    const link = waLinkForService("Asesoría Fiscal", "Hola")
    expect(link).toContain("Hola")
    expect(link).toContain("interesado")
    expect(link).toContain("Asesor%C3%ADa")
  })
})