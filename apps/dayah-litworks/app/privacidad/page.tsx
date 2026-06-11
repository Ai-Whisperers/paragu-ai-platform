import { PageLayout } from "@/components/page-layout"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const content = raw as unknown as Content
const phone = content.whatsapp.phone

export default function PrivacidadPage() {
  return (
    <PageLayout phone={phone}>
      <section className="flex min-h-[30vh] items-center justify-center bg-surface px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">Política de Privacidad</h1>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-muted-foreground leading-relaxed">
          <p className="mb-4">En Dayah LitWorks nos tomamos tu privacidad en serio. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.</p>
          <h2 className="mb-3 mt-8 text-xl font-semibold text-foreground">Información que recopilamos</h2>
          <p className="mb-4">Recopilamos la información que nos proporcionas voluntariamente: nombre, número de teléfono, dirección de correo electrónico, y detalles sobre tu proyecto de diseño.</p>
          <h2 className="mb-3 mt-8 text-xl font-semibold text-foreground">Uso de la información</h2>
          <p className="mb-4">Usamos tu información para procesar tus pedidos, coordinar proyectos de diseño, y comunicarnos sobre tus trabajos encargados.</p>
          <h2 className="mb-3 mt-8 text-xl font-semibold text-foreground">Contacto</h2>
          <p>Si tenés preguntas sobre esta política, escribime por WhatsApp al +595 986 868 241 o a dayahlitworks@gmail.com.</p>
        </div>
      </section>
    </PageLayout>
  )
}