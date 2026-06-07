import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Breadcrumb } from "@/components/breadcrumb"
import { getContent } from "@/lib/config"

const TERMS_ES = `## TÉRMINOS Y CONDICIONES — MAGNOLIA PELUQUERÍA

**Última actualización:** Mayo 2026

### 1. ACEPTACIÓN
Al utilizar nuestros servicios, aceptás estos términos y condiciones en su totalidad. Si no estás de acuerdo, por favor no utilices nuestros servicios.

### 2. SERVICIOS
Magnolia Peluquería ofrece servicios de peluquería, coloración, tratamientos capilares, peinados y servicios relacionados. Los precios y disponibilidad pueden cambiar sin previo aviso.

### 3. RESERVAS
- Las reservas pueden realizarse vía WhatsApp o a través de nuestro formulario en línea.
- Las reservas quedan confirmadas al recibir respuesta afirmativa por parte del salón.
- Cancelaciones deben comunicarse con al menos 2 horas de anticipación.

### 4. PRECIOS Y PAGOS
- Todos los precios incluyen diagnóstico gratuito.
- Los precios pueden variar según la complejidad del servicio.
- Aceptamos efectivo y transferencias bancarias.
- Noitamos: Gs. 50.000 mínimo por servicio.

### 5. PRODUCTOS
La venta de productos capilares se rige por las políticas de devolución del fabricante. Consultá con nuestro personal para más información.

### 6. RESPONSABILIDAD
- El salón no se hace responsable por alergias no informadas previamente.
- Recomendamos informar cualquier condición médica relevante antes del servicio.
- Los resultados pueden variar según el tipo de cabello y condiciones previas.

### 7. PROTECCIÓN DE DATOS
Ver nuestra Política de Privacidad para información sobre cómo recopilamos, usamos y protegemos tus datos personales.

### 8. PROPIEDAD INTELECTUAL
Todo el contenido del sitio web, incluyendo textos, imágenes y logotipos, son propiedad de Magnolia Peluquería y no pueden ser reproducidos sin autorización.

### 9. MODIFICACIONES
Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigencia al ser publicados en el sitio.

### 10. LEY APLICABLE
Estos términos se rigen por las leyes de la República del Paraguay.

### CONTACTO
Para consultas sobre estos términos, escribinos a: info@magnolia-peluqueria.com`

const TERMS_EN = `## TERMS AND CONDITIONS — MAGNOLIA PELUQUERÍA

**Last updated:** May 2026

### 1. ACCEPTANCE
By using our services, you accept these terms and conditions in full. If you do not agree, please do not use our services.

### 2. SERVICES
Magnolia Peluquería offers hairdressing, coloring, hair treatments, styling, and related services. Prices and availability may change without prior notice.

### 3. BOOKINGS
- Bookings may be made via WhatsApp or through our online form.
- Bookings are confirmed upon receiving an affirmative response from the salon.
- Cancellations must be communicated at least 2 hours in advance.

### 4. PRICES AND PAYMENT
- All prices include free diagnosis.
- Prices may vary based on service complexity.
- We accept cash and bank transfers.
- Minimum service charge: Gs. 50,000.

### 5. PRODUCTS
Product returns are governed by manufacturer policies. Ask our staff for more information.

### 6. LIABILITY
- The salon is not responsible for undisclosed allergies.
- Please inform us of any relevant medical conditions before service.
- Results may vary based on hair type and prior conditions.

### 7. DATA PROTECTION
See our Privacy Policy for information on how we collect, use, and protect your personal data.

### 8. INTELLECTUAL PROPERTY
All website content, including texts, images, and logos, are property of Magnolia Peluquería and may not be reproduced without authorization.

### 9. MODIFICATIONS
We reserve the right to modify these terms at any time. Changes take effect upon posting on the site.

### 10. APPLICABLE LAW
These terms are governed by the laws of the Republic of Paraguay.

### CONTACT
For questions about these terms, write to us at: info@magnolia-peluqueria.com`

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return {
    title: `Términos y Condiciones | ${c.business.name}`,
    description: `Términos y condiciones de uso de los servicios de ${c.business.name} en Asunción.`,
  }
}

export default async function TerminosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  const isEs = lang === "es"
  const content = isEs ? TERMS_ES : TERMS_EN

  // Simple markdown-to-HTML renderer
  const html = content
    .split("\n")
    .map(line => {
      if (line.startsWith("## ")) return `<h2 class="font-heading text-2xl font-bold text-primary mt-10 mb-4">${line.slice(3)}</h2>`
      if (line.startsWith("### ")) return `<h3 class="font-semibold text-foreground mt-6 mb-2">${line.slice(4)}</h3>`
      if (line.startsWith("- ")) return `<li class="ml-4 text-foreground-light">${line.slice(2)}</li>`
      if (line.trim() === "") return ""
      if (line.match(/^\d+\./)) return `<p class="text-foreground-light my-2">${line}</p>`
      return `<p class="text-foreground-light leading-relaxed">${line}</p>`
    })
    .join("\n")

  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <div className="pt-24">
        <div className="container-page max-w-3xl">
          <Breadcrumb lang={lang as "es" | "en"} />
          <article
            className="mt-6 prose prose-stone max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      <Footer businessName={c.business.name} tagline={c.business.tagline} address={c.business.address} phone={c.business.phoneFormatted} hours={c.business.hours} waPhone={c.business.whatsapp} lang={lang as "es" | "en"} />
      <WhatsAppFloat lang={lang as "es" | "en"} />
    </>
  )
}