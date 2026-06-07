'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getProductById } from '@/lib/products'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { useCart } from '@/components/CartContext'
import { getProductWhatsAppUrl } from '@/lib/whatsapp'

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-PY', {
    style: 'currency',
    currency: 'PYG',
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ProductoDetailPage() {
  const params = useParams()
  const skuOrId = params.id as string
  const product = getProductById(skuOrId)
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState<string>(
    product && product.sizes.length > 0 ? product.sizes[0] : ''
  )
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: 80 }}>
        <h2>Producto no encontrado</h2>
        <p style={{ color: 'var(--muted)', margin: '16px 0 24px' }}>
          El producto que buscas no existe o ha sido eliminado.
        </p>
        <Link href="/tienda">
          <button className="btn btn-primary">Volver a la tienda</button>
        </Link>
      </div>
    )
  }

  const whatsappUrl = getProductWhatsAppUrl(product, selectedSize, quantity)
  const images = product.images?.length ? product.images : []
  const mainImage = images[selectedImage] || null

  const handleAddToCart = () => {
    addItem(
      {
        sku: product.sku,
        name: product.name,
        price: product.price,
        images: product.images,
      },
      selectedSize,
      quantity
    )
  }

  return (
    <div className="container section">
      {/* Breadcrumb */}
      <nav
        style={{
          fontSize: '0.9rem',
          color: 'var(--muted)',
          marginBottom: 32,
          display: 'flex',
          gap: 8,
          alignItems: 'center',
        }}
      >
        <Link href="/tienda" style={{ color: 'var(--primary)' }}>
          Tienda
        </Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      {/* Two column layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
        }}
        className="product-detail-grid"
      >
        {/* Left: Images */}
        <div>
          {/* Main Image */}
          <div
            style={{
              aspectRatio: '1',
              background: '#fce4ec',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
              marginBottom: 16,
            }}
          >
            {mainImage ? (
              <Image
                src={mainImage}
                alt={`${product.name} - imagen ${selectedImage + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            ) : (
              <span style={{ fontSize: '6rem' }}>🩸</span>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: 8 }}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 8,
                    border: idx === selectedImage ? '3px solid var(--primary)' : '2px solid var(--border)',
                    background: '#fce4ec',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'border-color 0.2s',
                  }}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - miniatura ${idx + 1}`}
                    fill
                    sizes="72px"
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: 'var(--primary)',
              background: '#fce4ec',
              padding: '4px 12px',
              borderRadius: 20,
              marginBottom: 12,
            }}
          >
            {product.category}
          </span>

          <h1 style={{ marginBottom: 12, fontSize: '1.75rem' }}>
            {product.name}
          </h1>

          <p
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--accent)',
              marginBottom: 20,
            }}
          >
            {formatPrice(product.price)}
          </p>

          <p
            style={{
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: 24,
            }}
          >
            {product.description}
          </p>

          {/* Features */}
          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: 20,
              marginBottom: 24,
            }}
          >
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12 }}>
              Características
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
              }}
            >
              {product.features.map((feature, idx) => {
                const colonIndex = feature.indexOf(':')
                const label = colonIndex >= 0 ? feature.slice(0, colonIndex).trim() : ''
                const value = colonIndex >= 0 ? feature.slice(colonIndex + 1).trim() : feature
                return (
                  <div
                    key={idx}
                    style={{
                      padding: '8px 12px',
                      background: 'var(--background)',
                      borderRadius: 8,
                      fontSize: '0.9rem',
                    }}
                  >
                    {label && (
                      <span
                        style={{
                          fontWeight: 600,
                          display: 'block',
                          fontSize: '0.8rem',
                          color: 'var(--muted)',
                        }}
                      >
                        {label}
                      </span>
                    )}
                    <span>{value}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Materials */}
          {product.materials && (
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 4, color: 'var(--heading)' }}>
                Materiales
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{product.materials}</p>
            </div>
          )}

          {/* Benefits */}
          {product.benefits && (
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 4, color: 'var(--heading)' }}>
                Beneficios
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{product.benefits}</p>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3
                style={{
                  fontSize: '0.95rem',
                  marginBottom: 8,
                  color: 'var(--heading)',
                }}
              >
                Seleccionar talle
              </h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: 8,
                      border:
                        selectedSize === size
                          ? '2px solid var(--primary)'
                          : '2px solid var(--border)',
                      background:
                        selectedSize === size ? '#fce4ec' : 'transparent',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      transition: 'all 0.2s',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div style={{ marginBottom: 24 }}>
            <h3
              style={{
                fontSize: '0.95rem',
                marginBottom: 8,
                color: 'var(--heading)',
              }}
            >
              Cantidad
            </h3>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                border: '2px solid var(--border)',
                borderRadius: 8,
                padding: '6px 12px',
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.3rem',
                  cursor: 'pointer',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = '#fce4ec')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = 'none')
                }
              >
                −
              </button>
              <span
                style={{
                  minWidth: 32,
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.3rem',
                  cursor: 'pointer',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = '#fce4ec')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = 'none')
                }
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="btn btn-outline"
                onClick={handleAddToCart}
                style={{ flex: 1 }}
              >
                🛒 Agregar al carrito
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: 1, textDecoration: 'none' }}
              >
                <button className="btn btn-accent" style={{ width: '100%' }}>
                  💬 Comprar por WhatsApp
                </button>
              </a>
            </div>
            <Link
              href="/tienda"
              style={{ color: 'var(--muted)', fontSize: '0.9rem' }}
            >
              ← Volver a la tienda
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  )
}
