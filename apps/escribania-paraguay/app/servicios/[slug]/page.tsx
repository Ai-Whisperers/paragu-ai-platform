import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import ServiceDetailHero from "@/components/service-detail-hero"
import ServiceBenefits from "@/components/service-benefits"
import ServiceItemsList from "@/components/service-items-list"
import ServiceProcess from "@/components/service-process"
import CtaBanner from "@/components/cta-banner"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"
import content from "@/content/es.json"
import serviciosData from "@/content/pages/servicios.json"

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  const servicios = serviciosData as Record<string, any>
  return Object.keys(servicios).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const servicios = serviciosData as Record<string, any>
  const service = servicios[slug]

  if (!service) {
    return { title: "Servicio no encontrado" }
  }

  return {
    title: `${service.name} | Servicios Notariales Paraguay`,
    description: service.description?.slice(0, 160) || "",
  }
}

export default async function ServicioDetailPage({ params }: Props) {
  const { slug } = await params
  const servicios = serviciosData as Record<string, any>
  const service = servicios[slug]

  if (!service) {
    notFound()
  }

  const data = content as any
  const siteInfo = data.site || { businessName: data.siteName }
  const cta = data.serviciosPage?.cta || {
    title: "¿Necesitás asesoramiento?",
    subtitle: "Contactanos para más información sobre este servicio",
    buttonText: "Consultar Ahora",
    buttonHref: "https://wa.me/595981000000?text=Hola%21%20Quiero%20informaci%C3%B3n%20sobre%20servicios%20notariales",
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "ProfessionalService",
      name: siteInfo.businessName || data.siteName,
    },
    areaServed: "PY",
    inLanguage: "es",
  }

  return (
    <>
      <Header />
      <main>
        <ServiceDetailHero
          headline={service.hero.headline}
          subheadline={service.hero.subheadline}
        />
        <ServiceBenefits
          title={`Beneficios de ${service.name.toLowerCase()}`}
          items={service.benefits || []}
        />
        <ServiceItemsList
          title="Servicios incluidos"
          items={service.items || []}
          icon={service.icon}
        />
        <ServiceProcess
          title="Proceso"
          subtitle="Pasos para realizar este trámite"
          steps={(service.process || []).map((step: string, i: number) => ({
            number: String(i + 1).padStart(2, "0"),
            description: step,
          }))}
        />
        <CtaBanner
          title={cta.title}
          subtitle={cta.subtitle}
          buttonText={cta.buttonText}
          buttonHref={cta.buttonHref}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
