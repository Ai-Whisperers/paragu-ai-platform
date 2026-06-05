import { randomInt, timingSafeEqual } from "crypto"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

export function generateOTP(): string {
  return randomInt(100000, 999999).toString()
}

export async function sendOTP(phone: string): Promise<void> {
  const normalizedPhone = phone.replace("+", "")

  const code = generateOTP()
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString()

  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin.from("otp_codes").insert({
      phone: normalizedPhone,
      code,
      expires_at: expiresAt,
    })
    if (error) {
      console.error("[sendOTP] DB insert failed:", error)
      throw new Error("No se pudo guardar el código. Intenta de nuevo.")
    }
  } else {
    console.debug(`[DEV] OTP for ${phone}: ${code}`)
  }

  await sendWhatsAppMessage(phone, code)
}

export async function verifyOTP(phone: string, otp: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return false
  }

  const normalizedPhone = phone.replace("+", "")

  const { data } = await supabaseAdmin
    .from("otp_codes")
    .select("*")
    .eq("phone", normalizedPhone)
    .eq("verified", false)
    .gt("expires_at", new Date().toISOString())
    .limit(10)

  if (!data || data.length === 0) return false

  const matched = data.find((record) => {
    const a = Buffer.from(otp, "utf8")
    const b = Buffer.from(record.code, "utf8")
    if (a.length !== b.length) return false
    try {
      return (timingSafeEqual as (a: Buffer, b: Buffer) => boolean)(a, b)
    } catch {
      return false
    }
  })

  if (!matched) return false

  await supabaseAdmin
    .from("otp_codes")
    .update({ verified: true })
    .eq("id", matched.id)

  return true
}

async function sendWhatsAppMessage(phone: string, code: string): Promise<void> {
  const whatsappPhoneId = process.env.WHATSAPP_PHONE_ID
  const whatsappToken = process.env.WHATSAPP_BUSINESS_TOKEN

  if (!whatsappPhoneId || !whatsappToken || whatsappPhoneId === "placeholder") {
    const msg = "WhatsApp OTP not configured. Set WHATSAPP_PHONE_ID and WHATSAPP_BUSINESS_TOKEN env vars."
    if (process.env.NODE_ENV === "production") {
      throw new Error(msg)
    }
    console.debug(`[DEV] ${msg} OTP for ${phone}: ${code}`)
    return
  }

  const url = `https://graph.facebook.com/v18.0/${whatsappPhoneId}/messages`
  const payload = {
    messaging_product: "whatsapp",
    to: phone.replace("+", ""),
    type: "template",
    template: {
      name: "verify_code",
      language: { code: "es_PY" },
      components: [
        {
          type: "body",
          parameters: [{ type: "text", text: code }],
        },
        {
          type: "footer",
          parameters: [{ type: "text", text: "Código válido por 5 minutos." }],
        },
      ],
    },
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${whatsappToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`WhatsApp API error: ${err}`)
  }
}