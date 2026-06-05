import { SignJWT } from "jose"
import { Page } from "@playwright/test"

const ADMIN_SECRET = new TextEncoder().encode("site-template-admin-secret-change-me")
const CLIENT_SECRET = "SITE_SLUG-default-secret-change-me"

export async function setAdminSessionCookie(page: Page, phone = "595981000000") {
  const token = await new SignJWT({ phone })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(ADMIN_SECRET)

  await page.context().addCookies([{
    name: "admin_session",
    value: token,
    domain: "localhost",
    path: "/",
  }])
}

async function hmacSign(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false, ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload))
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function setClientSessionCookie(page: Page, lang = "es", phone = "595981000000") {
  const exp = Math.floor(Date.now() / 1000) + 86400
  const nonce = Math.random().toString(36).slice(2)
  const signature = await hmacSign(`${exp}.${nonce}.${phone}`, CLIENT_SECRET)
  const token = `${exp}.${nonce}.${phone}.${signature}`

  await page.context().addCookies([{
    name: `${lang}_client_session`,
    value: token,
    domain: "localhost",
    path: "/",
  }])
}
