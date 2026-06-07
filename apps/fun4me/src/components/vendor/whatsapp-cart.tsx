export function WhatsAppCart({ products }: { products: any[] }) {
  if (products.length === 0) return null

  const total = products.reduce((sum, p) => sum + p.price, 0)
  const msg = products.map((p, i) => `${i + 1}. ${p.name} — Gs. ${p.price.toLocaleString("es-PY")}`).join("\n")
  const waUrl = `https://wa.me/595976569739?text=${encodeURIComponent(
    `¡Hola! Quiero pedir estos productos:\n\n${msg}\n\nTotal: Gs. ${total.toLocaleString("es-PY")}`
  )}`

  return (
    <div className="fixed bottom-24 right-6 z-[9998] animate-slide-up">
      <a href={waUrl} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-xl shadow-lg hover:bg-primary/90 transition-colors text-sm font-semibold">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        Pedir ({products.length}) — Gs. {total.toLocaleString("es-PY")}
      </a>
    </div>
  )
}
