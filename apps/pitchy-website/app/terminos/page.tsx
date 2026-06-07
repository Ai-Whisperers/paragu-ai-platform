"use client"
import content from "@/content/es.json"
const c = content as Record<string, any>

export default function Terminos() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1A1A2E] mb-4">Términos y Condiciones</h1>
      <p className="text-[#6B7280] mb-8">Al solicitar nuestros productos y servicios, aceptás los siguientes términos y condiciones.</p>

      <div className="space-y-6 text-[#4A5568] text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-2">Productos y servicios</h2>
          <p>Pitchy Blindex provee vidrio templado, laminado, DVH, muro cortina, vidrio Low-E, mamparas Blindex, espejos y servicios de reparación. Las especificaciones técnicas de cada producto se detallan en nuestras cotizaciones.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-2">Cotizaciones y presupuestos</h2>
          <p>Los presupuestos tienen una validez de 15 días hábiles. Los precios pueden variar según la disponibilidad de stock y las condiciones del mercado. Todo presupuesto debe ser confirmado por escrito (WhatsApp o email) para proceder con la producción.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-2">Pagos</h2>
          <p>Las condiciones de pago se acuerdan en cada cotización. Para empresas constructoras y contratistas ofrecemos crédito a 30 y 60 días sujeto a aprobación.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-2">Entrega y transporte</h2>
          <p>Los plazos de entrega se especifican en cada cotización. No nos responsabilizamos por daños ocurridos durante el transporte una vez que el producto sale de nuestro depósito, a menos que el flete sea realizado por nuestro equipo.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-2">Cambios y devoluciones</h2>
          <p>El vidrio templado y laminado fabricado a medida no acepta cambios ni devoluciones, ya que se produce según las especificaciones del cliente. Los productos estándar en stock pueden cambiarse dentro de los 5 días hábiles posteriores a la compra, siempre que se encuentren en perfecto estado.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-2">Garantía</h2>
          <p>Ofrecemos garantía contra defectos de fabricación en todos nuestros productos. La garantía no cubre roturas por mala manipulación, instalación incorrecta o uso inadecuado.</p>
        </section>

        <p className="text-xs text-[#6B7280] mt-10 border-t border-gray-200 pt-6">Última actualización: mayo 2026. Pitchy Blindex se reserva el derecho de modificar estos términos en cualquier momento.</p>
      </div>
    </div>
  )
}
