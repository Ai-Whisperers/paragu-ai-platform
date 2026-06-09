import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const email = form.get("email") as string
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }
    // Log subscriber (simple file-logging — no DB needed)
    console.log(`[NEWSLETTER] ${email} at ${new Date().toISOString()}`)
    // In production: send to email list or DB
    return NextResponse.redirect(new URL("/?subscribed=true", req.url))
  } catch {
    return NextResponse.json({ error: "Error" }, { status: 500 })
  }
}
