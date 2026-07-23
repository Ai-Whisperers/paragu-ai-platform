"use client"
import { useState, useEffect } from "react"

const GUEST_KEY = "fun4me_guest_dismissed_at"

export function GuestModeBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(GUEST_KEY)
      if (!raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShow(true)
        return
      }
      const ts = parseInt(raw, 10)
      if (Date.now() - ts > 24 * 60 * 60 * 1000) setShow(true)
    } catch (err) {
      console.debug("[fun4me/guest-mode] read failed — storage unavailable; showing banner", err)
      setShow(true)
    }
  }, [])

  if (!show) return null

  return (
    <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 text-center text-xs text-muted-foreground">
      Estás navegando en modo invitado.
      <button onClick={() => {
        setShow(false)
        try { localStorage.setItem(GUEST_KEY, String(Date.now())) } catch (err) {
          console.debug("[fun4me/guest-mode] dismiss write failed — likely quota exceeded or private mode", err)
        }
      }}
        className="ml-2 text-primary hover:underline font-medium">Entendido</button>
    </div>
  )
}
