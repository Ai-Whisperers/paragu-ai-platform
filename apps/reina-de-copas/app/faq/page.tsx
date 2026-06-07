'use client'

import { useState } from 'react'

const faqItems = [
  { id: 1, q: '¿Qué es una copa menstrual?', a: 'La copa menstrual es un producto de higiene femenina reutilizable que se introduce en la vagina para recolectar el flujo menstrual durante el período. Está hecha de silicona médica hipoalergénica y puede durar hasta 10 años con el cuidado adecuado.' },
  { id: 2, q: '¿Es segura la copa menstrual?', a: 'Sí, la copa menstrual es completamente segura cuando se usa correctamente. Está hecha de materiales médicos aprobados, no altera el pH vaginal y no causa síndrome de shock tóxico si se usa correctamente.' },
  { id: 3, q: '¿Cuánto dura una copa menstrual?', a: 'Una copa menstrual de buena calidad puede durar entre 5 y 10 años con el cuidado adecuado. Esto la convierte en una opción económico y ecológica comparada con productos desechables.' },
  { id: 4, q: '¿Cómo elijo la talla correcta?', a: 'La talla depende de varios factores: tu edad, si has tenido partos vaginales, la intensidad de tu flujo y tu anatomía. En general: XS y S para mujeres jóvenes/adolescentes, L para mujeres adultas con flujo moderado, XL para mujeres con flujo abundante o que han tenido partos.' },
  { id: 5, q: '¿La copa menstrual duele?', a: 'No, cuando se coloca correctamente la copa no debe causar dolor. Puede haber una sensación de presión los primeros días mientras te adaptas, pero no debe doler. Si duele, probablemente la talla no es correcta o no está bien posicionada.' },
  { id: 6, q: '¿Puedo hacer ejercicio con la copa menstrual?', a: 'Sí, puedes hacer cualquier actividad física con la copa menstrual incluyendo natación, running, yoga y gyms. La copa se adapta perfectamente a tu cuerpo y no se mueve con el movimiento.' },
  { id: 7, q: '¿Puedo ir al baño con la copa puesta?', a: 'Sí, puedes orinar y defecar normalmente con la copa puesta. La copa está en la vagina, no bloquea la uretra ni el intestino. Solo asegúrate de no jalar el tallo accidentalmente.' },
  { id: 8, q: '¿Con qué frecuencia debo vaciar la copa?', a: 'Se recomienda vaciar la copa cada 8 a 12 horas dependiendo de la intensidad de tu flujo. Algunas mujeres con flujo abundante pueden necesitar vaciarla cada 4-6 horas. Nunca dejes la copa más de 12 horas sin vaciar.' },
  { id: 9, q: '¿Cómo limpio mi copa menstrual?', a: 'Para limpieza diaria: vacía la copa, enjuaga con agua fría, lava con agua tibia y jabón neutro suave, enjuaga bien y vuelve a insertar. Para esterilización: hierve agua, sumerge la copa 5 minutos, seca en lugar limpio.' },
  { id: 10, q: '¿Puedo usar la copa si soy virgen?', a: 'Sí, puedes usar la copa aunque seas virgen. Existe la talla XS especialmente para adolescentes. Sin embargo, es importante saber que el himen puede estirarse o romperse con el uso de la copa, lo cual es normal y no causa problemas de salud.' },
  { id: 11, q: '¿La copa menstrual se puede usar de noche?', a: 'Sí, la copa menstrual es perfecta para usar de noche. Puede durar hasta 12 horas, así que puedes dormir tranquila sin preocuparte por fugas. Solo asegúrate de vaciarla antes de dormir y al despertar.' },
  { id: 12, q: '¿Qué pasa si no puedo retirarla?', a: 'No te preocupes, la copa no se puede perder dentro de tu cuerpo. Relájate, ponte en una posición cómoda y trata de pujar como si hicieras del baño. Esto bajará la copa. Luego agarra el tallo y gira suavemente hasta llegar a la base para retirar.' },
  { id: 13, q: '¿La copa menstrual causa infecciones?', a: 'No, si se usa correctamente la copa no causa infecciones. El material de silicona médica es hipoalergénico y no altera las bacterias beneficiosas de la vagina. Para prevenir infecciones: lávate las manos antes de manipularla, cámbiala cada 8-12 horas y esterilízala al inicio y fin de cada período.' },
  { id: 14, q: '¿Puedo usar la copa con un dispositivo intrauterino (DIU)?', a: 'Sí, puedes usar la copa menstrual si tienes un DIU. Sin embargo, al retirar la copa existe un riesgo muy bajo de mover el hilo del DIU. Para minimizar el riesgo: asegura que el tallo esté recortado, no tires de la copa solo por el tallo sino por la base.' },
  { id: 15, q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos transferencia bancaria, Tigo Money y efectivo. Para pagos con transferencia o Tigo Money, recibirás los datos para realizar el pago una vez confirmado tu pedido.' },
  { id: 16, q: '¿Cuáles son los costos de envío?', a: 'El costo de envío varía según tu ubicación en Asunción. Realizamos deliveries a través de Bolt o Uber Envíos. Para otras ciudades, enviamos por encomienda y el costo depende del destino.' },
  { id: 17, q: '¿Cuánto tiempo tarda el delivery?', a: 'En Asunción, una vez confirmado tu pedido, lo recibirás al día siguiente. Para encomienda a otras ciudades, el pedido llega a la sucursal en 24 horas y a tu puerta en 24-48 horas adicionales.' },
  { id: 18, q: '¿Puedo cambiar mi copa por otra talla?', a: 'Sí, puedes cambiar tu copa por otra talla dentro de las primeras 48 horas después de recibir tu pedido, siempre que el producto esté en las mismas condiciones y tengas la factura. Si la nueva talla tiene un costo mayor, deberás abonar la diferencia.' },
  { id: 19, q: '¿Qué pasa si mi copa llega defectuosa?', a: 'En caso de recibir una copa defectuosa, contáctanos inmediatamente por WhatsApp. Retiraremos el producto defectuoso y te enviaremos uno nuevo sin costo adicional. Puedes escribirnos a +595 982 774 456.' },
  { id: 20, q: '¿Hacen envíos a todo Paraguay?', a: 'Sí, hacemos envíos a todo Paraguay a través de servicios de encomienda. El costo y tiempo de entrega varían según la ciudad. Contáctanos por WhatsApp para confirmar el costo de envío a tu ubicación.' },
  { id: 21, q: '¿Qué es un disco menstrual?', a: 'El disco menstrual es similar a la copa pero tiene forma de disco en lugar de copa. Se coloca en el fondo de la vagina, detrás del hueso púbico. A diferencia de la copa, el disco no tiene varilla y se puede usar hasta 12 horas. Es una buena alternativa para quienes encuentran incómoda la varilla de la copa.' },
  { id: 22, q: '¿Cuál es la diferencia entre la copa y el disco menstrual?', a: 'La principal diferencia es la forma: la copa tiene forma de copa con varilla, mientras que el disco tiene forma de anillo aplanado sin varilla. El disco se coloca más atrás en la vagina y puede ser más cómodo para algunas mujeres. La capacidad del disco suele ser mayor y puede usarse durante relaciones sexuales.' },
  { id: 23, q: '¿Cómo esterilizo mi copa?', a: 'Para esterilizar tu copa: hierve agua en un recipiente de silicona (no uses olla metálica), sumerge la copa durante 5 minutos, retira con cuidado usando pinzas, y deja secar en un lugar limpio. Esteriliza al inicio y al final de cada período.' },
  { id: 24, q: '¿Cómo elimino las manchas de mi copa?', a: 'Para manchas leves: remoja en agua tibia con jabón neutro. Para manchas persistentes: mezcla agua con peróxido de hidrógeno (agua oxigenada) y remoja por varias horas. También puedes usar jugo de limón. Nunca uses jabones perfumados ni productos químicos agresivos.' },
]

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <>
      <section style={{ background: 'var(--banner)', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--heading)', marginBottom: 12 }}>
            Preguntas Frecuentes
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', maxWidth: 600, margin: '0 auto' }}>
            Resolvé todas tus dudas sobre la copa menstrual.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 48, maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {faqItems.map((item) => {
            const isOpen = openId === item.id
            return (
              <div
                key={item.id}
                style={{
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                <button
                  onClick={() => toggle(item.id)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '16px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--heading)',
                    lineHeight: 1.4,
                    fontFamily: 'inherit',
                  }}
                >
                  <span>{item.q}</span>
                  <span
                    style={{
                      fontSize: '1.4rem',
                      color: 'var(--accent)',
                      flexShrink: 0,
                      marginLeft: 12,
                      transition: 'transform 0.2s ease',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? '800px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                  }}
                >
                  <p
                    style={{
                      padding: '0 0 16px 0',
                      color: 'var(--text-light)',
                      lineHeight: 1.7,
                      fontSize: '0.95rem',
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
