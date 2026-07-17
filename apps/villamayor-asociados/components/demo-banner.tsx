'use client'

import { useEffect, useState } from "react"
import { X, Info } from "lucide-react"

const STORAGE_KEY = "demo_banner_dismissed_v1"

export default function DemoBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY)
      if (!dismissed) setShow(true)
    } catch {
      setShow(true)
    }
  }, [])

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true")
    } catch {
      /* ignore storage errors */
    }
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative z-[60] flex items-center justify-center gap-2.5 border-b border-[#E8C97A] bg-[#FFF7E6] px-4 py-2.5 text-center text-[13px] leading-[1.4] text-[#5A4500]"
    >
      <Info size={15} className="shrink-0 text-[#8B6A00]" />
      <span className="font-medium">
        <strong className="font-bold">Sitio de demostración.</strong>{" "}
        Esta es una página de ejemplo de un estudio jurídico, creada para mostrar
        nuestro trabajo a posibles clientes. Los datos, nombres y servicios son
        ilustrativos.
      </span>
      <button
        onClick={dismiss}
        aria-label="Cerrar aviso"
        className="absolute right-3 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded border-0 bg-transparent p-1 text-[#5A4500]"
      >
        <X size={16} />
      </button>
    </div>
  )
}