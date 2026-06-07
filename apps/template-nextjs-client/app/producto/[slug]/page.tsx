"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import content from "@/content/es.json"

const _c = content as any

function formatPrice(amount: number) { return `Gs. ${Math.round(amount).toLocaleString("es-PY")}` }
const WA_PHONE = "595974202025"

export default function ProductDetail() {
  const { slug } = useParams()
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const product = _c.products.find((p: any) => p.slug === slug)

  if (!product) return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
      <Link href="/tienda" className="text-primary hover:underline">Volver a la tienda</Link>
    </div>
  )

  const waMsg = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(`¡Hola! Quiero: ${product.name} — ${formatPrice(product.price)}`)}`

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/tienda" className="text-primary no-underline text-sm mb-6 hover:underline inline-block">← Volver a la tienda</Link>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="bg-gradient-to-br from-surface-light to-surface rounded-2xl h-[400px] flex items-center justify-center">
          <span className="text-7xl opacity-10">✦</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-3xl font-bold text-primary mb-6">{formatPrice(product.price)}</p>
          <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
          <a href={waMsg} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-semibold no-underline text-lg hover:bg-[#20BD5A] w-full">
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
