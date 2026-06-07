import Link from 'next/link'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || '595982774456'

const tallas = [
  { talla: 'XS', capacidad: '20ml', para: 'Adolescentes, mujeres vírgenes, flujo ligero' },
  { talla: 'S', capacidad: '24ml', para: 'Mujeres menores de 25 años, flujo ligero a moderado' },
  { talla: 'L', capacidad: '29ml', para: 'Mujeres de 25-35 años, flujo moderado a abundante' },
  { talla: 'XL', capacidad: '34ml', para: 'Mujeres mayores de 35, flujo abundante, haber tenido partos' },
]

const pasos = [
  { num: '1️⃣', titulo: 'Lávate las manos', desc: 'Usa agua y jabón neutro para lavarte bien las manos antes de manipular la copa.' },
  { num: '2️⃣', titulo: 'Dobla la copa', desc: 'Elige el método que más te guste: método C, Push Down o 7 Fold. Presiona los lados para doblarla.' },
  { num: '3️⃣', titulo: 'Insertar', desc: 'Encuentra una posición cómoda (sentada, en cuclillas o de pie con una pierna levantada). Separa los labios e inserta la copa en ángulo hacia abajo, hacia tu espalda.' },
  { num: '4️⃣', titulo: 'Verificar sellado', desc: 'Suelta la copa y gírala suavemente para que se abra completamente. Deberías sentir que forma un sello. Tira suavemente del tallo para confirmar.' },
  { num: '5️⃣', titulo: 'Retirar', desc: 'Lávate las manos, relájate, agarra la base de la copa (no el tallo), presiona para liberar el sello y tira suavemente hacia abajo.' },
  { num: '6️⃣', titulo: 'Limpiar', desc: 'Vacía el contenido en el inodoro, enjuaga con agua fría, lava con agua tibia y jabón neutro, enjuaga bien y vuelve a insertar.' },
]

const faqItems = [
  {
    q: '¿Qué es una copa menstrual?',
    a: 'La copa menstrual es un producto de higiene femenina reutilizable que se introduce en la vagina para recolectar el flujo menstrual. Está hecha de silicona médica hipoalergénica y puede durar hasta 10 años.',
  },
  {
    q: '¿Es segura la copa menstrual?',
    a: 'Sí, la copa menstrual es completamente segura cuando se usa correctamente. Está hecha de materiales médicos aprobados, no altera el pH vaginal y no causa síndrome de shock tóxico si se usa correctamente.',
  },
  {
    q: '¿Cuánto dura una copa menstrual?',
    a: 'Una copa menstrual de buena calidad puede durar entre 5 y 10 años con el cuidado adecuado. Esto la convierte en una opción económica y ecológica.',
  },
  {
    q: '¿Cómo elijo la talla correcta?',
    a: 'La talla depende de tu edad, si has tenido partos vaginales, la intensidad de tu flujo y tu anatomía. XS y S para mujeres jóvenes/adolescentes, L para adultas con flujo moderado, XL para flujo abundante.',
  },
  {
    q: '¿La copa menstrual duele?',
    a: 'No, cuando se coloca correctamente no debe causar dolor. Puede haber una sensación de presión los primeros días mientras te adaptas, pero no debe doler.',
  },
  {
    q: '¿Puedo hacer ejercicio con la copa menstrual?',
    a: 'Sí, puedes hacer cualquier actividad física incluyendo natación, running, yoga y gyms. La copa se adapta perfectamente a tu cuerpo y no se mueve con el movimiento.',
  },
]

export default function GuiaPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--banner)', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--heading)', marginBottom: 12 }}>
            Guía Completa de la Copa Menstrual
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', maxWidth: 700, margin: '0 auto' }}>
            Todo lo que necesitas saber para elegir, usar, limpiar y cuidar tu copa menstrual.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 48, maxWidth: 860, margin: '0 auto' }}>
        {/* Section 1: Tallas */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 8, color: 'var(--heading)' }}>
            Cómo elegir tu talla
          </h2>
          <p style={{ color: 'var(--text-light)', marginBottom: 20 }}>
            La elección de la talla correcta es fundamental para la comodidad y efectividad de la copa menstrual.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
              <thead>
                <tr style={{ background: 'var(--primary)' }}>
                  <th style={{ padding: 12, textAlign: 'left', border: '1px solid #ddd' }}>Talla</th>
                  <th style={{ padding: 12, textAlign: 'left', border: '1px solid #ddd' }}>Capacidad</th>
                  <th style={{ padding: 12, textAlign: 'left', border: '1px solid #ddd' }}>Para quién</th>
                </tr>
              </thead>
              <tbody>
                {tallas.map((t, i) => (
                  <tr key={t.talla} style={{ background: i % 2 === 0 ? '#fafafa' : '#fff' }}>
                    <td style={{ padding: 12, border: '1px solid #ddd', fontWeight: 700 }}>{t.talla}</td>
                    <td style={{ padding: 12, border: '1px solid #ddd' }}>{t.capacidad}</td>
                    <td style={{ padding: 12, border: '1px solid #ddd' }}>{t.para}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Cómo usar la copa */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 20, color: 'var(--heading)' }}>
            Cómo usar la copa
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {pasos.map((paso) => (
              <div
                key={paso.titulo}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  padding: 16,
                  background: '#f8f8f8',
                  borderRadius: 8,
                }}
              >
                <span style={{ fontSize: '1.7rem', flexShrink: 0 }}>{paso.num}</span>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 4 }}>{paso.titulo}</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: 1.5 }}>{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Esterilización */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 16, color: 'var(--heading)' }}>
            Cómo esterilizarla
          </h2>
          <ul style={{ paddingLeft: 24, lineHeight: 1.8 }}>
            <li>Hierve agua en un recipiente de silicona (no uses olla metálica).</li>
            <li>
              <strong>Coloca la copa en agua hirviendo por <span style={{ background: '#fff3cd', padding: '2px 6px', borderRadius: 4 }}>5 minutos</span>.</strong>
            </li>
            <li>Retira con cuidado usando pinzas.</li>
            <li>Déjala secar en un lugar limpio.</li>
            <li>Esteriliza al inicio y al final de cada período.</li>
          </ul>
        </section>

        {/* Section 4: Guardarla */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 12, color: 'var(--heading)' }}>
            Cómo guardarla
          </h2>
          <p style={{ color: 'var(--text-light)', lineHeight: 1.7 }}>
            Guarda tu copa menstrual en la bolsa de algodón transpirable que viene incluida. Asegúrate de que esté completamente seca antes de guardarla para evitar la proliferación de bacterias. No la guardes en recipientes herméticos ni en bolsas de plástico. Mantenla en un lugar fresco y seco, lejos de la luz solar directa.
          </p>
        </section>

        {/* Section 5: FAQ */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 20, color: 'var(--heading)' }}>
            Preguntas frecuentes
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {faqItems.map((item, i) => (
              <details
                key={i}
                style={{
                  borderBottom: '1px solid #e0e0e0',
                  padding: '14px 0',
                  cursor: 'pointer',
                }}
              >
                <summary
                  style={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    listStyle: 'none',
                  }}
                >
                  {item.q}
                  <span style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>+</span>
                </summary>
                <p style={{ paddingTop: 10, color: 'var(--text-light)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', marginTop: 24 }}>
          <p style={{ marginBottom: 16, color: 'var(--text-light)' }}>
            ¿Todavía tenés dudas? Consultanos por WhatsApp
          </p>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ display: 'inline-block' }}
          >
            Conversá con nosotras
          </a>
        </section>
      </div>
    </>
  )
}
