"use client"
import Link from "next/link"
import { useRecentlyViewed } from "@/lib/recently-viewed"
import content from "@/content/es.json"

export function RecentlyViewed() {
  const { items } = useRecentlyViewed()
  if (items.length === 0) return null

  return (
    <section className="bg-surface py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h3 className="text-lg font-bold text-foreground mb-4">Visto Recientemente</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {items.map((p: any) => (
            <Link key={p.id} href={`/producto/${p.slug}`} className="shrink-0 w-28 group">
              <div className="aspect-square rounded-lg border border-border bg-surface-light flex items-center justify-center mb-2">
                <span className="text-2xl opacity-20">✦</span>
              </div>
              <p className="text-xs font-medium text-foreground line-clamp-2 group-hover:text-primary">{p.name}</p>
              <p className="text-xs font-bold text-primary">Gs. {p.price?.toLocaleString?.("es-PY")}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
