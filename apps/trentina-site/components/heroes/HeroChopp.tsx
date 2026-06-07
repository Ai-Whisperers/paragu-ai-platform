import HeroLayout from '@/components/heroes/HeroLayout'

export default function HeroChopp() {
  return (
    <HeroLayout
      title="Choppcervecería"
      subtitle="Cerveza de barril para tu negocio o evento. La mejor de Santa Rita en cada vaso."
      image="/images/beer-taps-craft.jpg"
      cta={{
        label: 'Ver servicios',
        href: '#servicios',
        secondary: {
          label: 'Escribinos por WhatsApp',
          href: 'https://wa.me/595983224473?text=Hola!%20Quiero%20info%20sobre%20Choppcervecer%C3%ADa',
        },
      }}
    />
  )
}
