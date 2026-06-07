import { NextResponse } from "next/server"
import { addSubscriber } from "@/lib/data-store"

export async function POST(request: Request) {
  const body = await request.json()
  const { email, name, lang = "es" } = body

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email requerido" }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 })
  }

  await addSubscriber({ email, name: name || null, lang })

  return NextResponse.json({ success: true })
}
