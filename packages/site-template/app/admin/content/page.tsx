/**
 * ANNOTATION: AdminContent
 *
 * What it is: A JSON content editor for site content (hero, stats,
 * testimonials, services). Loads and saves via /api/admin/content.
 *
 * Why your business needs it: Allows admins to edit core site content without
 * touching JSON files directly. Provides a visual structure for content
 * sections that would otherwise require code changes.
 *
 * What AI populates from your data: Content is stored in Supabase (site_content
 * table) and falls back to the JSON files in content/. This editor manages
 * the Supabase-backed content.
 *
 * Your input: Supabase must have the site_content table. AI generates the
 * initial content structure during onboarding; this panel lets you tweak it.
 */

"use client"

import { useState, useEffect } from "react"

type SiteContent = Record<string, unknown>

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/content")
      .then(r => r.json())
      .then(data => setContent(data.sections || data.content || null))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    if (!content) return
    setSaving(true)
    try {
      await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId: "default", content })
      })
      alert("Contenido guardado")
    } catch {
      alert("Error al guardar")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Cargando...</p>
  if (!content) return <p>Error al cargar contenido</p>

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Panel de Contenido</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      <ContentSection title="Hero" content={content} setContent={setContent} />
      <ContentSection title="Stats" content={content} setContent={setContent} />
      <ContentSection title="Testimonials" content={content} setContent={setContent} />
      <ContentSection title="Services" content={content} setContent={setContent} />
    </div>
  )
}

function ContentSection({ title, content, setContent }: { title: string; content: SiteContent; setContent: React.Dispatch<React.SetStateAction<SiteContent | null>> }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center text-left"
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-2xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <textarea
            value={JSON.stringify((content || {})[title.toLowerCase()], null, 2)}
            onChange={(e) => {
              try {
                setContent((prev) => ({
                  ...(prev || {}),
                  [title.toLowerCase()]: JSON.parse(e.target.value)
                }))
              } catch {}
            }}
            className="w-full h-64 p-4 font-mono text-sm border rounded"
          />
        </div>
      )}
    </div>
  )
}