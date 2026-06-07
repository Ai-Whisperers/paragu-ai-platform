/**
 * ANNOTATION: AdminContentKey
 *
 * What it is: Dynamic editor page for a specific content section.
 * Fetches the current content for the given section key and renders
 * the ContentEditor component for JSON editing.
 *
 * Why your business needs it: Enables granular editing of individual site
 * content sections without loading or affecting other sections.
 *
 * What AI populates from your data: Content is fetched from Supabase
 * (site_content table) via /api/admin/content/[key].
 *
 * Your input: Navigate to /admin/content/[section-key] and edit the JSON.
 * Click "Guardar" to persist changes to Supabase.
 */

import Link from "next/link"
import { getSiteContent } from "@/lib/stores"
import ContentEditor from "@/components/admin/content-editor"

const VALID_KEYS = [
  "hero",
  "stats",
  "testimonials",
  "services",
  "promotions",
  "faqs",
  "team",
  "gallery",
]

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero Slides",
  services: "Servicios",
  testimonials: "Testimonios",
  promotions: "Promociones",
  faqs: "FAQs",
  team: "Equipo",
  stats: "Estadísticas",
  gallery: "Galería",
}

export async function generateStaticParams() {
  return VALID_KEYS.map((key) => ({ key }))
}

export default async function ContentKeyPage({
  params,
}: {
  params: Promise<{ key: string }>
}) {
  const { key } = await params

  if (!VALID_KEYS.includes(key)) {
    return (
      <div className="p-6">
        <p className="text-red-600">Sección inválida: {key}</p>
      </div>
    )
  }

  let initialContent: unknown = null
  try {
    const all = await getSiteContent("default")
    initialContent = all[key] ?? null
  } catch {
    initialContent = null
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/content"
          className="text-rose-600 hover:text-rose-700 text-sm"
        >
          ← Volver
        </Link>
        <h1 className="text-2xl font-bold">
          {SECTION_LABELS[key] || key}
        </h1>
      </div>
      <ContentEditor sectionKey={key} initialContent={initialContent} />
    </div>
  )
}