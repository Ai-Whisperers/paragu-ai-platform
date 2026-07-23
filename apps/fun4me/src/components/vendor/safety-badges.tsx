interface SafetyProduct {
  body_safe?: boolean
  waterproof?: boolean
  rechargeable?: boolean
  stock?: string
}

export function SafetyBadges({ product }: { product: SafetyProduct }) {
  const badges: { text: string; color: string; title: string }[] = []
  if (product.body_safe) badges.push({ text: "Body Safe", color: "bg-success", title: "Material seguro para el cuerpo" })
  if (product.waterproof) badges.push({ text: "Impermeable", color: "bg-blue-500", title: "Resistente al agua" })
  if (product.rechargeable) badges.push({ text: "Recargable", color: "bg-accent", title: "Batería recargable USB" })
  if (product.stock === "low_stock") badges.push({ text: "Últimas unidades", color: "bg-warning", title: "Stock bajo" })
  if (product.stock === "out_of_stock") badges.push({ text: "Agotado", color: "bg-destructive", title: "Sin stock actualmente" })

  if (badges.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {badges.map((b, i) => (
        <span key={i} className={`${b.color} text-white text-[10px] font-medium px-2 py-0.5 rounded-full`} title={b.title}>
          {b.text}
        </span>
      ))}
    </div>
  )
}
