import { NextResponse } from "next/server"
import { sendOTP } from "@/lib/auth/otp-service"

export async function POST(request: Request) {
  try {
    const { phone } = await request.json()

    if (!phone || typeof phone !== "string") {
      return NextResponse.json({ error: "Phone number required" }, { status: 400 })
    }

    const normalizedPhone = phone.startsWith("+") ? phone : `+${phone}`

    await sendOTP(normalizedPhone)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[send-otp]", err)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}

export async function GET(_: Request) {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}