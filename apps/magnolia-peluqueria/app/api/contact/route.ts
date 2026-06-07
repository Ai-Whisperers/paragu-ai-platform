import { NextResponse } from "next/server"
import { addContact } from "@/lib/data-store"

export async function POST(request: Request) {
  const { email, name, message, source } = await request.json()

  if (!email || !name) {
    return NextResponse.json({ error: "Email y nombre son requeridos" }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 })
  }

  await addContact({ email, name: name || null, message: message || null, source: source || "exit-popup" })

  return NextResponse.json({ ok: true })
}
