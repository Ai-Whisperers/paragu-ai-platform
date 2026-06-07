import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export const metadata = { title: "Politica de Privacidad" }

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Politica de Privacidad</h1>
          <div className="text-foreground-light space-y-4 text-sm leading-relaxed">
            <p>En 3 MIND nos tomamos muy en serio la privacidad de nuestros usuarios. Esta politica describe como recopilamos, usamos y protegemos tu informacion personal.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Informacion que recopilamos</h2>
            <p>Recopilamos la informacion que nos proporcionas voluntariamente a traves de formularios de contacto o WhatsApp: nombre, numero de telefono y correo electronico.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Uso de la informacion</h2>
            <p>Utilizamos tu informacion para responder a tus consultas, enviar presupuestos y mejorar nuestros servicios. No compartimos tu informacion con terceros.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Proteccion de datos</h2>
            <p>Implementamos medidas de seguridad para proteger tu informacion contra acceso no autorizado.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Tus derechos</h2>
            <p>Podes acceder, rectificar o eliminar tus datos en cualquier momento contactandonos.</p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
