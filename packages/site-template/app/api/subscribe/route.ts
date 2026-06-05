import { NextResponse } from "next/server"
import { addSubscriber } from "@/lib/stores"
import { apiError } from "@/lib/api/errors"

export async function POST(_: Request) {
  let body
  try {
    body = await _.json()
  } catch {
    return NextResponse.json(apiError("BAD_REQUEST", "Invalid JSON"), { status: 400 })
  }

  const { email, name, lang = "es" } = body

  if (!email || typeof email !== "string") {
    return NextResponse.json(apiError("MISSING_FIELDS", "Email requerido"), { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(apiError("VALIDATION_ERROR", "Email inválido"), { status: 400 })
  }

  await addSubscriber({ email, name: name || null, lang })

  return NextResponse.json({ success: true })
}