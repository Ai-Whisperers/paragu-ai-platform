import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_BASE_URL || "https://magnolia-peluqueria.paragu-ai.com"))
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  })
  return response
}