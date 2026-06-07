"use client"
import { useState } from "react"

interface ToastItem {
  id: string
  message: string
  type: "success" | "info" | "error"
}

let toastId = 0
let addToastGlobal: ((msg: string, type?: "success" | "info" | "error") => void) | null = null

export function toast(message: string, type: "success" | "info" | "error" = "info") {
  if (addToastGlobal) addToastGlobal(message, type)
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  addToastGlobal = (message: string, type: "success" | "info" | "error" = "info") => {
    const id = `toast-${++toastId}`
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }

  return (
    <>
      {children}
      <div className="fixed bottom-24 right-4 z-[9999] flex flex-col gap-2">
        {toasts.map(t => (
          <div key={t.id}
            className={`animate-slide-up rounded-xl px-5 py-3 text-sm font-medium shadow-lg text-white ${
              t.type === "success" ? "bg-success" : t.type === "error" ? "bg-destructive" : "bg-primary"
            }`}>
            {t.message}
          </div>
        ))}
      </div>
    </>
  )
}
