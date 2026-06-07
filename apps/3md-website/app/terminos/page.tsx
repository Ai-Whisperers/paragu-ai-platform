import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export const metadata = { title: "Terminos y Condiciones" }

export default function TerminosPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Terminos y Condiciones</h1>
          <div className="text-foreground-light space-y-4 text-sm leading-relaxed">
            <p>Al utilizar los servicios de 3 MIND, aceptas los siguientes terminos y condiciones.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Servicios</h2>
            <p>Los precios y alcances se definen por proyecto. Cada servicio incluye revisiones acordadas previamente.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Propiedad intelectual</h2>
            <p>Los derechos de los materiales producidos se transfieren al cliente una vez completado el pago.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Cancelaciones</h2>
            <p>Las cancelaciones con menos de 48 horas de anticipacion pueden estar sujetas a cargos.</p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
