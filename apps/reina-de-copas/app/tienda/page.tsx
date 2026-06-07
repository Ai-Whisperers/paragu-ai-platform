'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { getAllProducts } from '@/lib/products'
import type { Product } from '@/lib/products'

export default function TiendaPage() {
  const products = getAllProducts()
  const categories = ['Todas', 'Copa Menstrual', 'Disco Menstrual', 'Adicionales'] as const
  type Category = (typeof categories)[number]
  const [activeCategory, setActiveCategory] = useState<Category>('Todas')

  const filtered =
    activeCategory === 'Todas'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <div className="container section" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <h1 style={{ marginBottom: 32 }}>Tienda</h1>

      {/* Category Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 32,
          flexWrap: 'wrap',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              background:
                activeCategory === cat ? 'var(--primary)' : 'transparent',
              color:
                activeCategory === cat ? 'var(--heading)' : 'var(--text-light)',
              border:
                activeCategory === cat
                  ? '2px solid var(--primary)'
                  : '2px solid #e0e0e0',
              borderRadius: 24,
              padding: '8px 20px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-light)', padding: 64 }}>
          No hay productos en esta categoría.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {filtered.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
