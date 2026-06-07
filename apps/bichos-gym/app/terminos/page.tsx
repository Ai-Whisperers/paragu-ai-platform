import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export const metadata = { title: "Términos y Condiciones — Bicho's Gym" }

export default function TerminosPage() {
  return (
    <>
      <Header />
      <main className="bg-background py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-primary mb-8">Términos y Condiciones</h1>
          <div className="prose prose-sm max-w-none text-foreground-light space-y-4">
            <p>Al utilizar los servicios de Bicho's Gym, aceptás los siguientes términos y condiciones.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Servicios</h2>
            <p>Nos reservamos el derecho de modificar nuestros servicios, precios y horarios sin previo aviso. Todos los precios están expresados en guaraníes (Gs.) e incluyen IVA.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Reservas y cancelaciones</h2>
            <p>Las reservas se confirman vía WhatsApp. Cancelaciones con menos de 2 horas de anticipación pueden estar sujetas a cargos.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Responsabilidad</h2>
            <p>Bicho's Gym no se responsabiliza por objetos personales perdidos en nuestras instalaciones. Los clientes son responsables de su propia seguridad durante la utilización de nuestros servicios.</p>
            <h2 className="font-heading text-xl font-bold text-foreground">Modificaciones</h2>
            <p>Nos reservamos el derecho de actualizar estos términos en cualquier momento. Los cambios serán publicados en esta página.</p>
            <p className="text-xs text-foreground-light mt-8">Última actualización: mayo 2026</p>
          </div>
        </div>
      </main>
      <Footer
        businessName="Bicho's Gym"
        tagline="Transformá tu Cuerpo en Capiatá"
        address="Capiatá"
        phone="0981 106 062"
        hours="Lun-Sáb: 7:00 - 21:00, Dom: 9:00 - 13:00"
        waPhone="595986106062"
      />
      <WhatsAppFloat />
    </>
  )
}
