"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <AdminAuthGuard>{children}</AdminAuthGuard>
    </div>
  )
}

function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    fetch("/api/auth/check", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated === true) {
          setChecked(true)
        } else {
          router.replace("/admin/login")
        }
      })
      .catch(() => router.replace("/admin/login"))
  }, [router])

  if (!checked) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "hsl(240 6.7% 4.5%)",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "3px solid hsl(240 6% 25%)",
            borderTopColor: "hsl(330 80% 50%)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return <>{children}</>
}