"use client"
import { useState, useEffect } from "react"

export function ExitIntentPopup() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("fun4me_exit_seen")) return
    const handler = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true)
        localStorage.setItem("fun4me_exit_seen", "true")
      }
    }
    document.addEventListener("mouseleave", handler)
    return () => document.removeEventListener("mouseleave", handler)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[99999] bg-black/60 flex items-center justify-center p-4" onClick={() => setShow(false)}>
      <div className="relative bg-surface rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-border" onClick={e => e.stopPropagation()}>
        <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-lg">✕</button>
        <div className="text-4xl mb-4">💜</div>
        <h2 className="text-2xl font-bold text-foreground mb-2">¿No encontraste lo que buscabas?</h2>
        <p className="text-muted-foreground mb-6">Consultanos por WhatsApp y te ayudamos a encontrar el producto perfecto para vos.</p>
        <a href="https://wa.me/595976569739?text=¡Hola!%20Salí%20del%20sitio%20pero%20quiero%20consultar%20por%20productos"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#20BD5A] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
          </svg>
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  )
}
