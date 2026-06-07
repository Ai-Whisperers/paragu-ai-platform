export function PriceAnchor({ price, marketPrice }: { price: number; marketPrice?: number }) {
  if (!marketPrice || marketPrice <= price) return null
  const savings = marketPrice - price
  const percent = Math.round((savings / marketPrice) * 100)
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-muted-foreground line-through">Gs. {marketPrice.toLocaleString("es-PY")}</span>
      <span className="bg-success/20 text-success font-bold px-1.5 py-0.5 rounded">
        -{percent}%
      </span>
      <span className="text-success font-semibold">Ahorrás Gs. {savings.toLocaleString("es-PY")}</span>
    </div>
  )
}
