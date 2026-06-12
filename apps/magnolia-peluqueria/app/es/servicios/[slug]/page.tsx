import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Clock, ArrowLeft, MessageCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Breadcrumb } from "@/components/breadcrumb"
import { services, waLinkForService } from "@/lib/config"
import type { Lang } from "@/lib/config"

interface PageProps {
  params: Promise<{ lang: string; slug: string }>
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/ñ/g, "n")
    .replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u")
    .replace(/ /g, "-")
}

function findService(slug: string): { cat: string; catColor: string; catIcon: string; name: string; desc: string; duration: string; price: string; popular?: boolean } | null {
  for (const cat of services as any) {
    for (const item of (cat.items as any[])) {
      if (slugify(item.name) === slug) {
        return { ...item, cat: cat.name, catColor: cat.color, catIcon: cat.icon }
      }
    }
  }
  return null
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  for (const cat of services as any) {
    for (const item of (cat.items as any[])) {
      params.push({ lang: "es", slug: slugify(item.name) })
      params.push({ lang: "en", slug: slugify(item.name) })
    }
  }
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const svc = findService(slug)
  if (!svc) return { title: "Servicio no encontrado" }
  return {
    title: `${svc.name} | Magnolia Peluquería`,
    description: `${svc.name} — ${svc.desc} en ${lang === "es" ? "Magnolia Peluquería Asunción" : "Magnolia Hair Salon Asunción"}. ${svc.price}.`,
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { lang, slug } = await params
  const c = (await import("@/lib/config")).getContent(lang as Lang)
  const svc = findService(slug)
  if (!svc) notFound()

  const isEs = lang === "es"
  const waMsg = encodeURIComponent(
    isEs
      ? `Hola! Quiero reservarme un turno para: ${svc.name}`
      : `Hi! I want to book an appointment for: ${svc.name}`
  )
  const waHref = `https://wa.me/${c.business.whatsapp}?text=${waMsg}`

  return (
    <>
      <Header lang={lang as Lang} />
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="container-page max-w-3xl">
          <Breadcrumb lang={lang as Lang} />
          
          {/* Back link */}
          <Link
            href={`/${lang}/servicios`}
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {isEs ? "Volver a servicios" : "Back to services"}
          </Link>

          {/* Category badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            {svc.cat}
          </div>

          {/* Service name */}
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            {svc.name}
            {svc.popular && (
              <span className="ml-4 inline-block bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full align-middle">
                {isEs ? "⭐ Más popular" : "⭐ Most popular"}
              </span>
            )}
          </h1>

          {/* Description */}
          <p className="text-foreground-light text-lg leading-relaxed mb-8">
            {svc.desc}
          </p>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground-muted uppercase tracking-wide">
                  {isEs ? "Duración" : "Duration"}
                </p>
                <p className="font-semibold text-foreground mt-0.5">{svc.duration}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <span className="text-2xl">✂️</span>
              </div>
              <div>
                <p className="text-xs font-bold text-foreground-muted uppercase tracking-wide">
                  {isEs ? "Precio" : "Price"}
                </p>
                <p className="font-bold text-primary text-xl mt-0.5">{svc.price}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
            <h2 className="font-heading text-xl font-bold text-primary mb-2">
              {isEs ? "¿Querés reservarte?" : "Ready to book?"}
            </h2>
            <p className="text-foreground-light text-sm mb-5">
              {isEs
                ? "Reservá tu turno por WhatsApp y te confirmamos en minutos."
                : "Book your appointment via WhatsApp and we'll confirm in minutes."}
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#20BD5A] transition-all text-lg w-full justify-center"
            >
              <MessageCircle className="w-6 h-6" />
              {isEs ? "Reservar por WhatsApp" : "Book via WhatsApp"}
            </a>
          </div>

          {/* Related services hint */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <Link
              href={`/${lang}/servicios`}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/20 transition-all"
            >
              <span className="text-sm font-medium text-foreground">
                {isEs ? "Ver todos los servicios →" : "View all services →"}
              </span>
            </Link>
          </div>
        </div>
      </div>
      <Footer
        businessName={c.business.name}
        tagline={c.business.tagline}
        address={c.business.address}
        phone={c.business.phoneFormatted}
        hours={c.business.hours}
        waPhone={c.business.whatsapp}
        lang={lang as Lang}
      />
      <WhatsAppFloat lang={lang as Lang} />
    </>
  )
}