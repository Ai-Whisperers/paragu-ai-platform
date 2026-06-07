import HeroChopp from '@/components/heroes/HeroChopp'
import ChoppServiceCard from '@/components/chopp/ChoppServiceCard'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export const metadata = {
  title: 'Choppcervecería | Trentina Cerveza Artesanal',
  description: 'Servicio de chopp y cerveza de barril para eventos y negocios. Instalación profesional en Santa Rita, Alto Paraná.',
  openGraph: {
    images: ['/images/og-chopp.jpg'],
  },
}

const services = [
  {
    title: 'Torneira Móvil',
    subtitle: 'Ideal para eventos al aire libre',
    description: 'Una o dos líneas de chopp para tu fiesta, cumpleaños o evento corporativo. Se despliega en minutos, se lucirá toda la noche.',
    price: 'Gs 450.000',
    priceUnit: 'por evento (hasta 6h)',
    features: ['1-2 grifos', 'Hasta 40 litros', 'Vasos incluidos', 'Transporte incluido'],
    image: '/images/icons/chopp-icon.svg',
    whatsappText: 'Hola! Quiero cotización para Torneira Móvil',
  },
  {
    title: 'Kegerator Fijo',
    subtitle: 'Para bares y restaurantes',
    description: 'Kegerator propio en tu local con tus 4 estilos favoritos de Trentina. Mantenemos todo: cilindro, línea, limpieza.',
    price: 'Gs 1.200.000',
    priceUnit: 'por mes (mínimo 3 meses)',
    features: ['4 líneas de chopp', '4 estilos a elección', 'Mantenimiento incluido', 'Reporte mensual de consumo'],
    image: '/images/chopp/kegerator.jpg',
    whatsappText: 'Hola! Quiero cotización para Kegerator Fijo',
  },
  {
    title: 'Barril de 20L',
    subtitle: 'Llévate el chopp a tu local',
    description: 'Barril de 20 litros de cualquiera de nuestros 5 estilos. Te dejamos el barril en consignación y lo recogemos cuando esté vacío.',
    price: 'Gs 250.000',
    priceUnit: 'por barril (20L)',
    features: ['5 estilos disponibles', 'Barril en consignación', 'Servicio de entrega', 'Intercambio por barril lleno'],
    image: '/images/chopp/barrel-20l.jpg',
    whatsappText: 'Hola! Quiero pedir un barril de 20L',
  },
  {
    title: 'Instalación de Barra',
    subtitle: 'Llave fija + mingitorio + enfriador',
    description: 'Instalamos una barra completa en tu bar o restaurant con grifos de chopp, refrigeración y todo el equipamiento necesario.',
    price: 'Gs 2.500.000',
    priceUnit: 'instalación + primer mes',
    features: ['2-4 grifos', 'Sistema de refrigeración', 'Muebles a medida', 'Capacitación incluído'],
    image: '/images/chopp/install-bar.jpg',
    whatsappText: 'Hola! Quiero instalación de barra',
  },
  {
    title: 'Evento Corporativo',
    subtitle: 'Volumen para empresas y eventos',
    description: 'Copas, bundt, back-of-bar — tenemos la solución para tu evento. Personal capacitado, instalación rápida, todo el chopp que necesites.',
    price: 'A consultar',
    priceUnit: 'según cantidad',
    features: ['Volúmenes desde 100L', 'Personal de servicio', 'Tumba/bundt disponibles', 'Costo por evento'],
    image: '/images/chopp/event-corporate.jpg',
    whatsappText: 'Hola! Quiero cotización para evento corporativo',
  },
]

const faqs = [
  {
    q: '¿Qué estilos de cerveza tienen en chopp?',
    a: 'Actualmente ofrecemos nuestros 5 estilos en barril: Pilsen, APA, IPA, Metatron IPL y Dunkel Cacao. Rotamos según disponibilidad.',
  },
  {
    q: '¿Cuánto dura un barril de 20L?',
    a: 'Un barril de 20L sirve aproximadamente 55 vasos de 350ml o 40 pintas de 500ml. Con buena refrigeración y líneas limpias, dura 2-3 semanas abierto.',
  },
  {
    q: '¿Qué mantenimiento necesito hacer?',
    a: 'Prácticamente ninguno. Nosotros nos encargamos de la limpieza de líneas, el mantenimiento del cilindro de CO₂ y cualquier reparación. Tú solo disfrutas el chopp.',
  },
  {
    q: '¿Cuál es la zona de entrega?',
    a: 'Entregamos en Santa Rita, Ciudad del Este, Encarnación y toda el Alto Paraná. Para otras zonas, consultanos.',
  },
]

export default function ChoppcerveceriaPage() {
  return (
    <main className="min-h-screen">
      <HeroChopp />

      {/* Intro */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-trentina-gold mb-4">
            Choppcervecería
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            La mejor cerveza de Santa Rita llegó al barril. Ya sea tu bar, tu restaurante o tu próxima fiesta —
            Trentina tiene la solución de chopp que necesitás.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-trentina-gold mb-2">Servicios</h2>
          <p className="text-gray-400 mb-8">Elegí el que mejor se adapte a tu negocio o evento.</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ChoppServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-trentina-dark/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-trentina-gold mb-8 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-trentina-gold/20 rounded-lg p-4">
                <summary className="cursor-pointer font-semibold text-trentina-gold list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-trentina-gold/60 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-black text-trentina-gold mb-4">
            ¿Listo para servir el mejor chopp de la región?
          </h2>
          <p className="text-gray-400 mb-8">
            Escribinos por WhatsApp y te armamos una cotización personalizada.
          </p>
          <WhatsAppButton
            message="Hola! Quiero información sobre servicios de Choppcervecería"
            variant="primary"
            size="lg"
          />
        </div>
      </section>
    </main>
  )
}
