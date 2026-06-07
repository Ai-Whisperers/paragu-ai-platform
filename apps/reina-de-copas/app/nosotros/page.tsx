import Link from 'next/link'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || '595982774456'

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--banner)', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--heading)', marginBottom: 12 }}>
            Sobre Reina de Copas
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', maxWidth: 600, margin: '0 auto' }}>
            Tu aliada ecológica para una menstruación consciente y saludable.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 48, maxWidth: 860, margin: '0 auto' }}>
        {/* Founder section */}
        <section style={{ marginBottom: 48, textAlign: 'center' }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'var(--primary)',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#fff',
            }}
          >
            A
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--heading)' }}>
            Anna Rodas de van der Pol
          </h2>
          <p style={{ color: 'var(--text-light)', marginTop: 4 }}>
            Fundadora &bull; Agosto 2018
          </p>
          <div
            style={{
              display: 'inline-block',
              marginTop: 12,
              padding: '8px 20px',
              background: '#e8f5e9',
              borderRadius: 20,
              fontWeight: 600,
              color: '#2e7d32',
            }}
          >
            Más de 1.750 copas vendidas 🇵🇾
          </div>
        </section>

        {/* Story */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 16, color: 'var(--heading)' }}>
            Nuestra historia
          </h2>
          <p style={{ color: 'var(--text-light)', lineHeight: 1.8, fontSize: '0.98rem' }}>
            Reina de Copas nació en agosto de 2018 de la mano de Anna Rodas de van der Pol, con la misión 
            de ofrecer alternativas ecológicas y saludables para la menstruación. Desde entonces, hemos 
            ayudado a más de 1.750 mujeres en Paraguay a descubrir los beneficios de la copa menstrual: 
            una opción reutilizable, libre de químicos y respetuosa con el cuerpo y el medio ambiente.
          </p>
          <p style={{ color: 'var(--text-light)', lineHeight: 1.8, fontSize: '0.98rem', marginTop: 12 }}>
            Creemos que cada mujer merece tener acceso a productos menstruales seguros, cómodos y 
            sostenibles. Por eso trabajamos día a día para brindar información clara, atención 
            personalizada y productos de la más alta calidad.
          </p>
        </section>

        {/* Values */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 20, textAlign: 'center', color: 'var(--heading)' }}>
            Nuestros valores
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { titulo: '🌿 Ecológica', desc: 'Productos reutilizables que reducen los residuos y cuidan el planeta.' },
              { titulo: '💰 Económica', desc: 'Una copa dura hasta 10 años. Ahorrás dinero y dejás de comprar toallas y tampones mes a mes.' },
              { titulo: '🛡️ Segura', desc: 'Silicona médica hipoalergénica. Libre de químicos, libre de preocupaciones.' },
            ].map((v) => (
              <div
                key={v.titulo}
                style={{
                  padding: 24,
                  background: '#f8f8f8',
                  borderRadius: 8,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8 }}>{v.titulo}</div>
                <p style={{ color: 'var(--text-light)', lineHeight: 1.6, fontSize: '0.95rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 20, textAlign: 'center', color: 'var(--heading)' }}>
            Reina de Copas en números
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {[
              { numero: '8', label: 'Años de experiencia' },
              { numero: '+1.750', label: 'Clientas satisfechas' },
              { numero: '🇵🇾', label: 'Envíos a todo Paraguay' },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  padding: 24,
                  background: 'var(--banner)',
                  borderRadius: 8,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--heading)', marginBottom: 4 }}>
                  {s.numero}
                </div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', padding: 32, background: '#fce4ec', borderRadius: 12 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8, color: 'var(--heading)' }}>
            ¿Tenés preguntas?
          </h2>
          <p style={{ color: 'var(--text-light)', marginBottom: 20 }}>
            Estamos acá para ayudarte. Escribinos y te respondemos a la brevedad.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent"
            style={{ display: 'inline-block' }}
          >
            Conversá con nosotras
          </a>
        </section>
      </div>
    </>
  )
}
