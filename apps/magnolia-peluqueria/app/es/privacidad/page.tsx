import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Breadcrumb } from "@/components/breadcrumb"
import { getContent } from "@/lib/config"

const PRIV_ES = `## POLÍTICA DE PRIVACIDAD — MAGNOLIA PELUQUERÍA

**Última actualización:** Mayo 2026

### 1. INFORMACIÓN QUE RECOPILAMOS
Recopilamos información personal que vos nos proporcionás voluntariamente, incluyendo:
- **Nombre y número de WhatsApp** — cuando reservás un turno o nos contactás.
- **Datos del formulario de reserva** — incluyendo servicio solicitado, fecha preferida y notas.
- **Datos de navegación** — información técnica como dirección IP y tipo de navegador (a través de cookies).

### 2. CÓMO USAMOS TU INFORMACIÓN
Usamos tu información para:
- Confirmar y gestionar tus reservas.
- Comunicarte cambios de horario o confirmaciones.
- Mejorar nuestros servicios y experiencia del cliente.
- Enviar promociones y novedades (solo si aceptaste recibir mensajes).
- Cumplir con obligaciones legales.

### 3. PROTECCIÓN DE DATOS
Tus datos personales están protegidos por:
- **Cifrado en tránsito** — Toda comunicación con nuestro sitio usa HTTPS.
- **Acceso restringido** — Solo personal autorizado accede a los datos.
- **No venta de datos** — Nunca vendemos, alquilamos ni compartimos tus datos personales con terceros con fines de marketing.

### 4. COOKIES
Nuestro sitio usa cookies para:
- Mejorar la funcionalidad del sitio.
- Recordar tus preferencias de idioma.
- Analizar el tráfico del sitio (a través de Google Analytics, si está habilitado).
- Podés desactivar cookies en tu navegador, pero algunas funciones del sitio pueden verse afectadas.

### 5. TUS DERECHOS
Tenés derecho a:
- **Acceder** a tus datos personales que tenemos.
- **Corregir** datos inexactos o incompletos.
- **Eliminar** tus datos (salvo obligaciones legales que requieran conservación).
- **Retirar consentimiento** para mensajes de marketing en cualquier momento.

Para ejercer cualquiera de estos derechos, escribinos por WhatsApp o email.

### 6. CONSERVACIÓN DE DATOS
Conservamos tus datos:
- **Reservas:** 12 meses después del turno.
- **Datos de contacto:** Hasta que solicites eliminación.
- **Logs técnicos:** 90 días máximo.

### 7. COMPARTIR DATOS
No compartimos tus datos personales con terceros, excepto:
- **Proveedores de servicios** (ej: hosting, análisis) bajo estrictos acuerdos de confidencialidad.
- **Cuando sea requerido por ley** — órdenes judiciales o cumplimiento legal.

### 8. NIÑOS
Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente datos de niños.

### 9. CAMBIOS A ESTA POLÍTICA
Podemos actualizar esta política periódicamente. Te notificaremos de cambios significativos a través de nuestro sitio web.

### 10. CONTACTO
**Responsable:** Magnolia Peluquería — Asunción, Paraguay
**WhatsApp:** 0981 106 062
**Email:** info@magnolia-peluqueria.com

Si creés que no hemos tratado tus datos personales de acuerdo con esta política, contactanos y resolveremos el problema.`

const PRIV_EN = `## PRIVACY POLICY — MAGNOLIA PELUQUERÍA

**Last updated:** May 2026

### 1. INFORMATION WE COLLECT
We collect personal information that you voluntarily provide, including:
- **Name and WhatsApp number** — when booking an appointment or contacting us.
- **Booking form data** — including requested service, preferred date, and notes.
- **Navigation data** — technical information like IP address and browser type (via cookies).

### 2. HOW WE USE YOUR INFORMATION
We use your information to:
- Confirm and manage your appointments.
- Communicate schedule changes or confirmations.
- Improve our services and customer experience.
- Send promotions and news (only if you agreed to receive messages).
- Comply with legal obligations.

### 3. DATA PROTECTION
Your personal data is protected by:
- **Encryption in transit** — All site communication uses HTTPS.
- **Restricted access** — Only authorized personnel access data.
- **No data selling** — We never sell, rent, or share your personal data with third parties for marketing purposes.

### 4. COOKIES
Our site uses cookies to:
- Improve site functionality.
- Remember your language preferences.
- Analyze site traffic (via Google Analytics, if enabled).
- You can disable cookies in your browser, but some site functions may be affected.

### 5. YOUR RIGHTS
You have the right to:
- **Access** your personal data that we hold.
- **Correct** inaccurate or incomplete data.
- **Delete** your data (except legal obligations requiring retention).
- **Withdraw consent** for marketing messages at any time.

To exercise any of these rights, write to us via WhatsApp or email.

### 6. DATA RETENTION
We retain your data:
- **Appointments:** 12 months after the appointment.
- **Contact data:** Until you request deletion.
- **Technical logs:** Maximum 90 days.

### 7. DATA SHARING
We do not share your personal data with third parties, except:
- **Service providers** (e.g., hosting, analytics) under strict confidentiality agreements.
- **When required by law** — court orders or legal compliance.

### 8. CHILDREN
Our services are not directed at minors under 18. We do not intentionally collect data from children.

### 9. CHANGES TO THIS POLICY
We may update this policy periodically. We will notify you of significant changes through our website.

### 10. CONTACT
**Responsible:** Magnolia Peluquería — Asunción, Paraguay
**WhatsApp:** 0981 106 062
**Email:** info@magnolia-peluqueria.com

If you believe we have not handled your personal data in accordance with this policy, contact us and we will resolve the issue.`

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return {
    title: `Política de Privacidad | ${c.business.name}`,
    description: `Política de privacidad y protección de datos de ${c.business.name} en Asunción.`,
  }
}

export default async function PrivacidadPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  const isEs = lang === "es"
  const content = isEs ? PRIV_ES : PRIV_EN

  const html = content
    .split("\n")
    .map(line => {
      if (line.startsWith("## ")) return `<h2 class="font-heading text-2xl font-bold text-primary mt-10 mb-4">${line.slice(3)}</h2>`
      if (line.startsWith("### ")) return `<h3 class="font-semibold text-foreground mt-6 mb-2">${line.slice(4)}</h3>`
      if (line.startsWith("- ")) return `<li class="ml-4 text-foreground-light">${line.slice(2)}</li>`
      if (line.trim() === "") return ""
      return `<p class="text-foreground-light leading-relaxed">${line}</p>`
    })
    .join("\n")

  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <div className="pt-24">
        <div className="container-page max-w-3xl">
          <Breadcrumb lang={lang as "es" | "en"} />
          <article className="mt-6" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
      <Footer businessName={c.business.name} tagline={c.business.tagline} address={c.business.address} phone={c.business.phoneFormatted} hours={c.business.hours} waPhone={c.business.whatsapp} lang={lang as "es" | "en"} />
      <WhatsAppFloat lang={lang as "es" | "en"} />
    </>
  )
}