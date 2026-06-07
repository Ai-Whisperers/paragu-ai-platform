'use client'

import Image from 'next/image'
import Link from 'next/link'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || '595982774456'

// Sample blog posts (expand later with real content)
const posts = [
  {
    slug: 'como-elegir-tu-primera-copa',
    title: '¿Cómo elegir tu primera copa menstrual?',
    excerpt:
      'Guía completa para principiantes: qué talla, qué material, qué marca. Todo lo que necesitás saber antes de comprar tu primera copa.',
    category: 'Guía',
    readTime: '5 min',
    image: '/images/productos/copa-signature-s-1.jpg',
  },
  {
    slug: 'mitos-y-verdades',
    title: 'Mitos y verdades sobre la copa menstrual',
    excerpt:
      '¿Es verdad que no se puede usar en el trabajo? ¿Y si soy处女? ¿Duele? Desmontamos los 8 mitos más comunes.',
    category: 'Educación',
    readTime: '4 min',
    image: '/images/productos/reina-the-cup-1.png',
  },
  {
    slug: 'Copa vs disco',
    title: 'Copa vs Disco Menstrual: cuál es para vos',
    excerpt:
      'No son lo mismo. Te explicamos las diferencias clave para que elijas el dispositivo correcto según tu cuerpo y tu estilo de vida.',
    category: 'Comparativa',
    readTime: '3 min',
    image: '/images/productos/combo-disco-1.jpg',
  },
]

// Testimonials from real clientas
const testimonios = [
  {
    nombre: 'María F.',
    ciudad: 'Asunción',
    texto:
      'Llegué a la copa después de años con toallitas y fue lo mejor que me pasó. Al principio da un poco de miedo pero después es súper práctico.',
    producto: 'Copa Signature S',
    rating: 5,
  },
  {
    nombre: 'Laura G.',
    ciudad: 'Encarnación',
    texto:
      'Tengo 42 años y nunca había usado una copa. El quiz me ayudó a elegir la talla correcta (L) y ahora no vuelvo a los tampones.',
    producto: 'Copa Signature L',
    rating: 5,
  },
  {
    nombre: 'Ana P.',
    ciudad: 'Ciudad del Este',
    texto:
      'El vaso esterilizador me cambió la vida. Lo uso en el trabajo y es súper práctico. El equipo de Reina de Copas me asistió por WhatsApp en todo momento.',
    producto: 'Copa Signature XL + Vaso',
    rating: 5,
  },
]

export default function ComunidadPage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--banner)',
          padding: '80px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.85rem',
              color: 'var(--primary)',
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Comunidad Reina de Copas
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              color: 'var(--heading)',
              lineHeight: 1.2,
              marginBottom: 20,
            }}
          >
            Acompañándote desde tu primera copa
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-light)',
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            No somos solo una tienda. Somos una comunidad de mujeres Paraguayas que
            comparten, aprenden y se apoyan en el camino de una gestión menstrual
            consciente.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/quiz" className="btn-primary">
              Hacé el quiz de talla →
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP}?text=Hola%2C%20quiero%20saber%20más%20sobre%20la%20comunidad%20Reina%20de%20Copas`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Unirme al WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Testimonios ─────────────────────────────────── */}
      <section style={{ padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--heading)', marginBottom: 8 }}>
              Lo que dicen nuestras clientas
            </h2>
            <p style={{ color: 'var(--text-light)' }}>
              Más de 1.750 mujeres ya usan Reina de Copas. Estas son algunas de sus historias.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {testimonios.map((t, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--banner)',
                  borderRadius: 16,
                  padding: '28px 24px',
                  position: 'relative',
                }}
              >
                {/* Stars */}
                <div style={{ marginBottom: 16 }}>
                  {[...Array(5)].map((_, si) => (
                    <span
                      key={si}
                      style={{ color: '#F5A623', fontSize: '1.1rem' }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p
                  style={{
                    color: 'var(--text)',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                    marginBottom: 20,
                  }}
                >
                  "{t.texto}"
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--heading)', fontSize: '0.9rem' }}>
                      {t.nombre}
                    </p>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{t.ciudad}</p>
                  </div>
                  <span
                    style={{
                      background: '#fff',
                      borderRadius: 20,
                      padding: '4px 12px',
                      fontSize: '0.8rem',
                      color: 'var(--primary)',
                      fontWeight: 600,
                    }}
                  >
                    {t.producto}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <p style={{ color: 'var(--text-light)', marginBottom: 16 }}>
              ¿Ya sos clienta? Compartí tu experiencia y ayudá a otras.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP}?text=Hola%2C%20quiero%20compartir%20mi%20experiencia%20con%20Reina%20de%20Copas`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Enviar mi testimonio
            </a>
          </div>
        </div>
      </section>

      {/* ── Blog ─────────────────────────────────────────── */}
      <section style={{ padding: '80px 20px', background: 'var(--banner)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--heading)' }}>
                Guía y Educación
              </h2>
              <p style={{ color: 'var(--text-light)', marginTop: 6 }}>
                Todo lo que necesitás saber sobre gestión menstrual.
              </p>
            </div>
            <Link
              href="/guia"
              style={{ color: 'var(--primary)', fontWeight: 600, whiteSpace: 'nowrap' }}
            >
              Ver guía completa →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  overflow: 'hidden',
                  display: 'block',
                  textDecoration: 'none',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ height: 180, position: 'relative', background: '#f5f5f5' }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        background: 'var(--banner)',
                        color: 'var(--primary)',
                        borderRadius: 20,
                        padding: '3px 10px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      {post.category}
                    </span>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>
                      {post.readTime} de lectura
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--heading)',
                      lineHeight: 1.4,
                      marginBottom: 8,
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-light)',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/guia" className="btn-secondary">
              Ver todas las guías →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section style={{ padding: '60px 20px', background: 'var(--primary)', color: '#fff' }}>
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 32,
            textAlign: 'center',
          }}
        >
          {[
            { num: '1.750+', label: 'Copas vendidas' },
            { num: '8', label: 'Años operando' },
            { num: '5', label: 'Tallas disponibles' },
            { num: '100%', label: 'Satisfacción garantizada' },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 800,
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.num}
              </p>
              <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Final ─────────────────────────────────────── */}
      <section style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--heading)', marginBottom: 16 }}>
            ¿Tenés dudas? Te acompañamos.
          </h2>
          <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 32 }}>
            Escribinos por WhatsApp y te ayudamos a elegir tu copa, resolver dudas
            sobre uso, o simplemente arrancá con el quiz que te recomienda la talla ideal.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/${WHATSAPP}?text=Hola%2C%20quiero%20hacer%20el%20quiz%20de%20talla`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Hacer el quiz →
            </a>
            <Link href="/tienda" className="btn-secondary">
              Ver tienda
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}