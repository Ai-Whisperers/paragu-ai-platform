/**
 * ANNOTATION: ContentEditor
 *
 * What it is: JSON textarea editor for the admin panel that lets you directly edit any content section (hero, services, testimonials, etc.) as raw JSON.
 *
 * Why your business needs it: Lets you make quick content changes without deploying code — edit hero text, update service descriptions, add FAQ entries all from the admin panel.
 *
 * What AI populates from your data: Pre-fills the editor with current content from content JSON files.
 *
 * Your input: Any content changes via the admin panel.
 *
 * Plan availability: Profesional (admin feature)
 */

/**
 * @component ContentEditor
 * @description JSON textarea editor for admins to directly edit site content sections (hero, services, testimonials, promotions, FAQs, team, stats, gallery). Pre-fills from existing content JSON.
 * @featureFlags admin
 * @requires /api/admin/content/[sectionKey] endpoint, admin auth
 * @implementation JSON.parse for validation, PUT /api/admin/content/[key] for save, router.refresh() after save
 */

"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"

type Toast = { id: string; message: string; type: "success" | "error" } | null

export default function ContentEditor({
  sectionKey,
  initialContent,
}: {
  sectionKey: string
  initialContent: unknown
}) {
  const router = useRouter()
  const [value, setValue] = useState(() =>
    JSON.stringify(initialContent, null, 2)
  )
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<Toast>(null)

  const showToast = useCallback((message: string, type: "success" | "error") => {
    const id = Date.now().toString()
    setToast({ id, message, type })
    setTimeout(() => setToast(null), 4000)
  }, [])

  const handleSave = async () => {
    setLoading(true)
    try {
      const parsed = JSON.parse(value)
      const res = await fetch(`/api/admin/content/${sectionKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId: "default", content: parsed }),
      })
      if (!res.ok) throw new Error(await res.text())
      showToast("Cambios guardados", "success")
      router.refresh()
    } catch (err) {
      showToast("Error al guardar: " + String(err), "error")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setValue(JSON.stringify(initialContent, null, 2))
  }

  const SECTION_LABELS: Record<string, string> = {
    hero: "Hero slides",
    services: "Servicios",
    testimonials: "Testimonios",
    promotions: "Promociones",
    faqs: "FAQs",
    team: "Equipo",
    stats: "Estadísticas",
    gallery: "Galería",
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold capitalize">
          {SECTION_LABELS[sectionKey] || sectionKey}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="px-4 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-[500px] p-4 font-mono text-sm border border-gray-300 rounded-lg bg-white"
        spellCheck={false}
      />

      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded shadow-lg text-white ${
            toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  )
}