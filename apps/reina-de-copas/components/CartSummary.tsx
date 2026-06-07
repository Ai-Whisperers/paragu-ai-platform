'use client'

import Link from 'next/link'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { useCart } from '@/components/CartContext'

function formatPrice(price: number) {
  return `Gs ${price.toLocaleString('es-PY').replace(/,/g, '.')}`
}

interface CustomerInfo {
  name: string
  phone: string
  address: string
  notes: string
}

interface CartSummaryProps {
  customer: CustomerInfo
  onCustomerChange: (field: keyof CustomerInfo, value: string) => void
}

export default function CartSummary({
  customer,
  onCustomerChange,
}: CartSummaryProps) {
  const { items, updateQty, removeItem, total, count } = useCart()

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🛒</div>
        <h2 style={{ marginBottom: 12 }}>Tu carrito está vacío</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: 24 }}>
          Agregá productos desde nuestra tienda
        </p>
        <Link href="/tienda">
          <button className="btn-primary">Ver productos</button>
        </Link>
      </div>
    )
  }

  // Build WhatsApp message
  const lines: string[] = ['🛒 *Nuevo Pedido - Reina de Copas Paraguay*', '']
  items.forEach((item, i) => {
    lines.push(
      `${i + 1}. ${item.product.name}${item.size ? ` (${item.size})` : ''}`
    )
    lines.push(`   Cant: ${item.qty} x ${formatPrice(item.product.price)}`)
    lines.push(`   Subtotal: ${formatPrice(item.product.price * item.qty)}`)
    lines.push('')
  })
  lines.push(`*Total: ${formatPrice(total)}*`)
  lines.push('')
  lines.push('🧾 *Datos del Cliente*')
  lines.push(`Nombre: ${customer.name}`)
  lines.push(`Teléfono: ${customer.phone}`)
  lines.push(`Dirección: ${customer.address}`)
  if (customer.notes) {
    lines.push(`Observaciones: ${customer.notes}`)
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`

  return (
    <div>
      {/* Cart Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
        {items.map((item, idx) => {
          const key = `${item.product.sku}-${item.size || 'nosize'}`
          return (
            <div
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px 20px',
                background: 'var(--white)',
                borderRadius: 8,
                boxShadow: 'var(--shadow)',
              }}
            >
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1rem', marginBottom: 2 }}>{item.product.name}</h4>
                {item.size && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    Talle: {item.size}
                  </span>
                )}
                <p style={{ color: 'var(--accent)', fontWeight: 600 }}>
                  {formatPrice(item.product.price)}
                </p>
              </div>

              {/* Quantity controls */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  border: '2px solid #e0e0e0',
                  borderRadius: 8,
                  padding: '4px 8px',
                }}
              >
                <button
                  onClick={() => updateQty(item.product.sku, item.size, item.qty - 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#fce4ec')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  -
                </button>
                <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 600 }}>
                  {item.qty}
                </span>
                <button
                  onClick={() => updateQty(item.product.sku, item.size, item.qty + 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#fce4ec')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  +
                </button>
              </div>

              <p style={{ fontWeight: 700, minWidth: 100, textAlign: 'right' }}>
                {formatPrice(item.product.price * item.qty)}
              </p>

              <button
                onClick={() => removeItem(item.product.sku, item.size)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  color: '#e91e63',
                  padding: 8,
                  borderRadius: 8,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#ffebee')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
              >
                ✕
              </button>
            </div>
          )
        })}
      </div>

      {/* Total */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 0',
          borderTop: '2px solid #e0e0e0',
          marginBottom: 32,
        }}
      >
        <h3>Subtotal ({count} productos)</h3>
        <h3 style={{ color: 'var(--accent)' }}>{formatPrice(total)}</h3>
      </div>

      {/* Customer Form */}
      <div
        style={{
          padding: '24px',
          background: 'var(--white)',
          borderRadius: 8,
          boxShadow: 'var(--shadow)',
          marginBottom: 24,
        }}
      >
        <h3 style={{ marginBottom: 20 }}>Tus datos</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: '0.9rem' }}>
              Nombre
            </label>
            <input
              id="name"
              type="text"
              placeholder="Tu nombre"
              value={customer.name}
              onChange={(e) => onCustomerChange('name', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '2px solid #e0e0e0', borderRadius: 8, fontSize: '1rem' }}
            />
          </div>
          <div>
            <label htmlFor="phone" style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: '0.9rem' }}>
              Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="0991 123 456"
              value={customer.phone}
              onChange={(e) => onCustomerChange('phone', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '2px solid #e0e0e0', borderRadius: 8, fontSize: '1rem' }}
            />
          </div>
          <div>
            <label htmlFor="address" style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: '0.9rem' }}>
              Dirección
            </label>
            <input
              id="address"
              type="text"
              placeholder="Dirección de entrega"
              value={customer.address}
              onChange={(e) => onCustomerChange('address', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '2px solid #e0e0e0', borderRadius: 8, fontSize: '1rem' }}
            />
          </div>
          <div>
            <label htmlFor="notes" style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: '0.9rem' }}>
              Observaciones
            </label>
            <textarea
              id="notes"
              rows={3}
              placeholder="Ej: Punto de referencia para la entrega"
              value={customer.notes}
              onChange={(e) => onCustomerChange('notes', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '2px solid #e0e0e0', borderRadius: 8, fontSize: '1rem', fontFamily: 'inherit' }}
            />
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <button
          className="btn-accent"
          style={{ width: '100%', padding: '16px 28px', fontSize: '1.1rem' }}
        >
          💬 Enviar pedido por WhatsApp
        </button>
      </a>
    </div>
  )
}
