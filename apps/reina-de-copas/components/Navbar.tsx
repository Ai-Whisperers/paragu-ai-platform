'use client'

import Link from 'next/link'
import { INSTAGRAM } from '@/lib/constants'

export default function Navbar() {
  return (
    <nav
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        <Link href="/" style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--primary)' }}>
          Reina de Copas
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link
            href="/guia"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--text)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
          >
            Guía
          </Link>
          <Link
            href="/quiz"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--text)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
          >
            Quiz
          </Link>
          <Link
            href="/comunidad"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--text)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
          >
            Comunidad
          </Link>
          <Link
            href="/tienda"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--text)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
          >
            Tienda
          </Link>
          <Link
            href="/nosotros"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--text)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
          >
            Nosotros
          </Link>
          <Link
            href="/pages/faq"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--text)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
          >
            FAQ
          </Link>
          <Link
            href="/carrito"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--text)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
          >
            🛒
          </Link>
          <a
            href={`https://instagram.com/${INSTAGRAM}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--text)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
          >
            📱
          </a>
        </div>
      </div>
    </nav>
  )
}
