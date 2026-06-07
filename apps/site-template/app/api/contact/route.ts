import { NextResponse } from "next/server"
import { addContact } from "@/lib/stores"
import { apiError } from "@/lib/api/errors"

export async function POST(_: Request) {
  let body
  try {
    body = await _.json()
  } catch {
    return NextResponse.json(
      apiError("BAD_REQUEST", "Invalid JSON"),
      { status: 400 }
    )
  }

  const { email, name, message, source } = body as {
    email?: string
    name?: string
    message?: string
    source?: string
  }

  if (!email || !name) {
    return NextResponse.json(
      apiError("MISSING_FIELDS", "Email y nombre son requeridos"),
      { status: 400 }
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      apiError("VALIDATION_ERROR", "Email inválido"),
      { status: 400 }
    )
  }

  await addContact({ email, name: name || null, message: message || null, source: source || "exit-popup" })

  return NextResponse.json({ ok: true })
}