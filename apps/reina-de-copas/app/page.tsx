import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import { getFeaturedProducts } from '@/lib/products'

export default function HomePage() {
  const featured = getFeaturedProducts()

  return (
    <>
      {/* ── Hero with Banner Image ────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'relative',
            height: 520,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src="/images/hero-banner.jpg"
            alt="Reina de Copas — Copas menstruales en Paraguay"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(219,112,147,0.88) 0%, rgba(199,92,127,0.75) 50%, rgba(255,255,255,0.3) 100%)',
              zIndex: 1,
            }}
          />
          <div
            className="container"
            style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              color: 'white',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 700,
                marginBottom: 16,
                textShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              Tu período, tu poder
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                marginBottom: 32,
                opacity: 0.95,
                maxWidth: 520,
                margin: '0 auto 32px',
              }}
            >
              Copas y discos menstruales ecológicos, económicos y seguros. Envíos a todo Paraguay.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/tienda">
                <button
                  style={{
                    background: 'white',
                    color: 'var(--primary)',
                    border: 'none',
                    borderRadius: 8,
                    padding: '14px 36px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transition: 'transform 0.2s',
                  }}
                >
                  Ver Tienda
                </button>
              </Link>
              <Link href="/quiz">
                <button
                  style={{
                    background: 'transparent',
                    color: 'white',
                    border: '2px solid white',
                    borderRadius: 8,
                    padding: '14px 36px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  ¿Qué talla soy?
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Stats ─────────────────────────────────────── */}
      <section style={{ padding: '48px 0', background: '#fdf2f4' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24,
              textAlign: 'center',
            }}
            className="stats-grid"
          >
            <div>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>
                +1.750
              </p>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>copas vendidas</p>
            </div>
            <div>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>
                2018
              </p>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>desde en Paraguay</p>
            </div>
            <div>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>
                12hs
              </p>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>de protección continua</p>
            </div>
            <div>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>
                10 años
              </p>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>de duración por copa</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ───────────────────────────────── */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <h2
            style={{
              textAlign: 'center',
              marginBottom: 12,
              color: 'var(--heading)',
              fontSize: '1.75rem',
            }}
          >
            Productos destacados
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--text-light)',
              marginBottom: 40,
              maxWidth: 480,
              margin: '0 auto 40px',
            }}
          >
            Elegí la opción perfecta para vos. Todos nuestros productos son de silicona médica hipoalergénica.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {featured.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/tienda">
              <button
                className="btn-primary"
                style={{ padding: '12px 32px', fontSize: '1rem' }}
              >
                Ver todos los productos →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us — with size comparison image ─────── */}
      <section style={{ padding: '64px 0', background: '#fdf2f4' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 48,
              alignItems: 'center',
            }}
            className="why-grid"
          >
            <div>
              <h2 style={{ marginBottom: 20, color: 'var(--heading)', fontSize: '1.75rem' }}>
                ¿Por qué elegir Reina de Copas?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  {
                    icon: '🌿',
                    title: 'Ecológica',
                    desc: 'Una copa reemplaza +3.000 toallas y tampones. Hasta 10 años de uso.',
                  },
                  {
                    icon: '💰',
                    title: 'Económica',
                    desc: 'Inversión única de Gs 100.000. Ahorrás millones en tu vida reproductiva.',
                  },
                  {
                    icon: '🛡️',
                    title: 'Segura',
                    desc: 'Silicona médica hipoalergénica. No altera tu pH vaginal. Hasta 12hs de protección.',
                  },
                  {
                    icon: '📦',
                    title: 'Envío discreto',
                    desc: 'Llega a tu puerta en packaging discreto. Asunción al día siguiente.',
                  },
                ].map((item) => (
                  <div key={item.title} style={{ display: 'flex', gap: 16 }}>
                    <span style={{ fontSize: '2rem', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', marginBottom: 4 }}>{item.title}</h3>
                      <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '16/9',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              }}
            >
              <Image
                src="/images/size-comparison.jpg"
                alt="Comparativa de tallas de copas menstruales"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────── */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <h2
            style={{
              textAlign: 'center',
              marginBottom: 48,
              color: 'var(--heading)',
              fontSize: '1.75rem',
            }}
          >
            3 pasos para tu libertad
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 32,
              textAlign: 'center',
            }}
            className="steps-grid"
          >
            {[
              {
                num: '1',
                title: 'Elegí tu talla',
                desc: 'Usá nuestro quiz o escribinos por WhatsApp y te ayudamos.',
                cta: '/quiz',
                ctaText: 'Hacer quiz →',
              },
              {
                num: '2',
                title: 'Recibilo en tu puerta',
                desc: 'Envío discreto a Asunción y todo Paraguay. Pagás cuando llega.',
                cta: '/tienda',
                ctaText: 'Ver productos →',
              },
              {
                num: '3',
                title: 'Disfrutá tu período',
                desc: 'Hasta 12 horas de protección sin preocupaciones. 10 años de uso.',
                cta: '/guia',
                ctaText: 'Leer guía →',
              },
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  padding: 32,
                  borderRadius: 16,
                  border: '1px solid var(--border)',
                  background: 'white',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    margin: '0 auto 16px',
                  }}
                >
                  {step.num}
                </div>
                <h3 style={{ marginBottom: 8, fontSize: '1.1rem' }}>{step.title}</h3>
                <p
                  style={{
                    color: 'var(--text-light)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  {step.desc}
                </p>
                <Link
                  href={step.cta}
                  style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}
                >
                  {step.ctaText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder Story Teaser ────────────────────────────── */}
      <section style={{ padding: '64px 0', background: '#fdf2f4' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 48,
              alignItems: 'center',
            }}
            className="why-grid"
          >
            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '16/9',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              }}
            >
              <Image
                src="/images/founder-empowerment.jpg"
                alt="Historia de empoderamiento — Reina de Copas"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'var(--primary)',
                  background: 'white',
                  padding: '4px 12px',
                  borderRadius: 20,
                  marginBottom: 16,
                }}
              >
                Nuestra historia
              </span>
              <h2 style={{ marginBottom: 16, color: 'var(--heading)', fontSize: '1.6rem' }}>
                Más que un producto, un movimiento
              </h2>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.7, marginBottom: 16 }}>
                Reina de Copas nació de la convicción de que todas las personas menstruantes merecen
                productos seguros, accesibles y que empoderen. Desde 2018 trabajamos para que en
                Paraguay nadie tenga que elegir entre su salud y su bolsillo.
              </p>
              <Link href="/nosotros">
                <button
                  style={{
                    background: 'transparent',
                    color: 'var(--primary)',
                    border: '2px solid var(--primary)',
                    borderRadius: 8,
                    padding: '10px 24px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  Conocenos →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Payment + Shipping ──────────────────────────────── */}
      <section style={{ padding: '48px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 32,
              textAlign: 'center',
            }}
            className="steps-grid"
          >
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🚚</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>Envíos en Asunción</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                Delivery al día siguiente
              </p>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>💳</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>Pagos flexibles</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                Transferencia, Tigo Money, Efectivo
              </p>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>📱</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>@reinadecopaspy</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                Seguinos en Instagram
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA ────────────────────────────────────── */}
      <section
        style={{
          padding: '64px 0',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: 16, fontSize: '1.75rem' }}>
            ¿Tenés dudas? Hablanos por WhatsApp
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.9)',
              marginBottom: 24,
              fontSize: '1.1rem',
              maxWidth: 480,
              margin: '0 auto 24px',
            }}
          >
            Te ayudamos a elegir la talla correcta y resolvemos todas tus preguntas
          </p>
          <a
            href="https://wa.me/595982774456?text=Hola!%20Quiero%20info%20sobre%20las%20copas%20menstruales"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              style={{
                background: 'white',
                color: '#128C7E',
                border: 'none',
                borderRadius: 8,
                padding: '14px 36px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              💬 Escribir por WhatsApp
            </button>
          </a>
        </div>
      </section>

      {/* ── Responsive styles ──────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .why-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
