import Link from "next/link"

export function EmptyState({ title = "No hay resultados", description = "Probá con otra búsqueda o categoría.",
  actionText = "Ver todos los productos", actionHref = "/tienda" }: {
  title?: string; description?: string; actionText?: string; actionHref?: string
}) {
  return (
    <div className="py-16 text-center">
      <div className="text-4xl mb-4">🔍</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-6">{description}</p>
      <Link href={actionHref} className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-primary/90">
        {actionText}
      </Link>
    </div>
  )
}
