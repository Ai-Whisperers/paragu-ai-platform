import { PageLayout } from "@/components/page-layout"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const content = raw as unknown as Content
const phone = content.whatsapp.phone

export default function TerminosPage() {
  return (
    <PageLayout phone={phone}>
      <section className="flex min-h-[30vh] items-center justify-center bg-surface px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">Términos y Condiciones</h1>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-muted-foreground leading-relaxed">
          <p className="mb-4">Al encargar un diseño con Dayah LitWorks, aceptás los siguientes términos:</p>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-foreground">Pedidos:</strong> Todos los pedidos se realizan a través de WhatsApp. La confirmación está sujeta a disponibilidad y briefing previo.</li>
            <li><strong className="text-foreground">Pagos:</strong> Se requiere 50% de anticipo para iniciar el proyecto. El saldo restante se paga contra entrega. Aceptamos transferencia bancaria, efectivo (Gs. y USD) y Western Union.</li>
            <li><strong className="text-foreground">Revisiones:</strong> Se incluyen hasta 2 rondas de revisiones en el precio base. Cambios adicionales se cotizan por separado.</li>
            <li><strong className="text-foreground">Cancelaciones:</strong> Si una vez iniciado el proyecto el cliente decidiera rescindir el contrato, no se reembolsará el porcentaje adelantado.</li>
            <li><strong className="text-foreground">Derechos:</strong> Los derechos del diseño pertenecen a Dayah LitWorks hasta que el cliente haya efectuado el 100% del pago.</li>
            <li><strong className="text-foreground">Uso de portfolio:</strong> Dayah LitWorks podrá mostrar los trabajos realizados en su portfolio, redes sociales y página web.</li>
            <li><strong className="text-foreground">Responsabilidad:</strong> El cliente es responsable de revisar el diseño, textos y datos antes de cualquier proceso de impresión o publicación. Dayah LitWorks no se responsabiliza por errores no comunicados durante la revisión.</li>
          </ol>
        </div>
      </section>
    </PageLayout>
  )
}