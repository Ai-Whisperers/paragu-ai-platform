import esSiteRaw from "@/content/es/site.json"
import enSiteRaw from "@/content/en/site.json"
import esUiRaw from "@/content/es/ui.json"
import enUiRaw from "@/content/en/ui.json"

type AnyRecord = Record<string, unknown>

const esSite: AnyRecord = esSiteRaw as AnyRecord
const enSite: AnyRecord = enSiteRaw as AnyRecord
const esUi: AnyRecord = esUiRaw as AnyRecord
const enUi: AnyRecord = enUiRaw as AnyRecord

export function getSiteName() {
  return (esSite.site as AnyRecord | undefined)?.name || (enSite.site as AnyRecord | undefined)?.name || "nuestro local"
}

export function business() {
  const getBusiness = (record: AnyRecord) => record.business as AnyRecord | undefined
  const esBusiness = getBusiness(esSite)
  const enBusiness = getBusiness(enSite)
  return {
    what: (esBusiness?.whatsapp as string | undefined) || (enBusiness?.whatsapp as string | undefined) || "595981000000",
    message: (esBusiness?.whatsappMessage as string | undefined) || (enBusiness?.whatsappMessage as string | undefined) || "Hola! Quiero más información",
    address: (esBusiness?.address as string | undefined) || (enBusiness?.address as string | undefined) || "",
    phone: (esBusiness?.phone as string | undefined) || (enBusiness?.phone as string | undefined) || "",
    instagram: (esBusiness?.instagram as string | undefined) || (enBusiness?.instagram as string | undefined) || "",
    instagramHandle: (esBusiness?.instagramHandle as string | undefined) || (enBusiness?.instagramHandle as string | undefined) || "",
    ruc: (esBusiness?.ruc as string | undefined) || (enBusiness?.ruc as string | undefined) || "",
    email: (esBusiness?.email as string | undefined) || (enBusiness?.email as string | undefined) || "",
    currency: (esBusiness?.currency as string | undefined) || (enBusiness?.currency as string | undefined) || "PYG",
  }
}

export function formatHours(hours: AnyRecord | undefined) {
  if (!hours || typeof hours !== "object") return "Lun-Sáb: 9:00 - 20:00"
  const map: Record<string, string> = {
    mon: "Lun", tue: "Mar", wed: "Mié", thu: "Jue", fri: "Vie", sat: "Sáb", sun: "Dom",
    monday: "Lun", tuesday: "Mar", wednesday: "Mié", thursday: "Jue", friday: "Vie", saturday: "Sáb", sunday: "Dom",
  }
  return Object.entries(hours as AnyRecord)
    .map(([day, time]) => `${map[day] ?? day}: ${time}`)
    .join(" · ")
}

export function waLink(msg: string) {
  const { what } = business()
  return `https://wa.me/${what}?text=${encodeURIComponent(msg)}`
}

export function ui<T>(lang: string, path: string, fallback?: T): T {
  const src: AnyRecord = lang === "en" ? enUi : esUi
  const keys = path.split(".")
  let cur: unknown = src
  for (const k of keys) {
    if (cur && typeof cur === "object" && k in (cur as AnyRecord)) cur = (cur as AnyRecord)[k]
    else return fallback as T
  }
  return cur as T
}

export function text(lang: string, key: string, fallback = "") {
  const parts = key.split(".")
  const src: AnyRecord = lang === "en" ? enUi : esUi
  let cur: unknown = src
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as AnyRecord)) cur = (cur as AnyRecord)[p]
    else return fallback
  }
  return String(cur)
}
