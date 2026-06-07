import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Breadcrumb } from "@/components/breadcrumb"
import { BookingForm } from "@/components/booking-form"
import { isSupabaseConfigured } from "@/lib/supabase"
import { getContent } from "@/lib/config"
import { Calendar } from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return {
    title: `Reservar | ${c.business.name}`,
    description: `Reservá tu turno en ${c.business.name} vía WhatsApp o completa el formulario.`,
  }
}

export default async function BookingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  const t = c.booking ?? {}
  const isEs = lang === "es"

  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <div className="pt-24">
        <div className="container-page max-w-5xl">
          <Breadcrumb lang={lang as "es" | "en"} />
          <div className="mt-6">
            <section className="text-center py-12 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-secondary" />
              </div>
              <h1 className="font-heading text-5xl font-bold text-primary mb-4">
                {t.title ?? (isEs ? "Reservar Turno" : "Book Appointment")}
              </h1>
              <p className="text-foreground-light text-lg max-w-xl mx-auto">
                {t.subtitle ?? (isEs
                  ? "Completá el formulario y te confirmamos por WhatsApp en minutos"
                  : "Fill out the form and we'll confirm via WhatsApp in minutes")}
              </p>
            </section>
            <BookingForm lang={lang as "es" | "en"} supabaseConfigured={isSupabaseConfigured} />
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
        lang={lang as "es" | "en"}
      />
      <WhatsAppFloat lang={lang as "es" | "en"} />
    </>
  )
}
