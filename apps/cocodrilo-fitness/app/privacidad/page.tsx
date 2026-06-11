import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export const metadata = { title: "Política de Privacidad — Complejo Cocodrilo" }

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main className="bg-background py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-primary mb-8">Política de Privacidad</h1>
          <div className="prose prose-sm max-w-none text-foreground-light space-y-4">
            <p>En Complejo Cocodrilo nos tomamos muy en serio la privacidad de nuestros usuarios. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Información que recopilamos</h2>
            <p>Recopilamos la información que nos proporcionas voluntariamente al contactarnos a través de formularios o WhatsApp: nombre, número de teléfono y dirección de correo electrónico.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Uso de la información</h2>
            <p>Utilizamos tu información únicamente para responder a tus consultas, gestionar reservas y mejorar nuestros servicios. No compartimos tu información con terceros.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Protección de datos</h2>
            <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra acceso no autorizado, pérdida o alteración.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Tus derechos</h2>
            <p>Tenés derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento. Contactanos por WhatsApp para ejercer estos derechos.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Contacto</h2>
            <p>Si tenés preguntas sobre esta política, contactanos por WhatsApp.</p>
            <p className="text-xs text-foreground-light mt-8">Última actualización: mayo 2026</p>
          </div>
        </div>
      </main>
      <Footer
        businessName="Complejo Cocodrilo"
        tagline="Fitness y Bienestar en Asunción"
        address="Av. Santísima Trinidad, Asunción"
        phone="0986 106 062"
        hours="Lun-Sáb: 9:00 - 20:00"
        waPhone="595986106062"
      />
      <WhatsAppFloat />
    </>
  )
}
