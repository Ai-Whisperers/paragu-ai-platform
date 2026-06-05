/**
 * ANNOTATION: BookingPage
 *
 * What it is: The main appointment booking page with a multi-step form (service
 * selection -> contact info -> date/time -> confirmation). Falls back to a
 * pre-filled WhatsApp message if no backend is configured.
 *
 * Why your business needs it: This page is your primary conversion engine.
 * Clients who can book online in under 60 seconds convert at 2x+ the rate of
 * those who must call or open WhatsApp manually. Every service business needs
 * this.
 *
 * What AI populates from your data:
 *   - Service list and pricing from content/{lang}/services/index.json
 *   - Business hours and availability from site config
 *   - WhatsApp number for fallback booking messages
 *   - SEO metadata from site config
 *
 * Your input: Tell us your available hours, booking lead time (e.g., "48 hours
 * advance"), and max appointments per day via WhatsApp. We configure the form
 * and fallback channel.
 *
 * Plan availability: Crecimiento, Profesional
 */

import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { BookingForm } from "@/components/sections/booking/BookingForm"
import { isSupabaseConfigured } from "@/lib/supabase"
import { getSiteConfig } from "@/lib/config/config"
import esUi from "@/content/es/ui.json"
import enUi from "@/content/en/ui.json"
import { Calendar } from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const site = await getSiteConfig(lang as "es" | "en")
  return {
    title: `Reservar | ${site.site.name}`,
    description: `Reservá tu turno en ${site.site.name} vía WhatsApp o completa el formulario.`,
  }
}

export default async function BookingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const isEs = lang === "es"

  const ui = isEs ? esUi : enUi

  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <div className="pt-24">
        <div className="mx-auto max-w-5xl px-4">
          <Breadcrumb lang={lang as "es" | "en"} />
          <div className="mt-6">
            <section className="py-12 mb-10 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10">
                <Calendar className="h-8 w-8 text-secondary" />
              </div>
              <h1 className="mb-4 text-5xl font-bold text-primary font-heading">
                {ui.bookingPage.pageTitle}
              </h1>
              <p className="mx-auto max-w-xl text-lg text-foreground-light">
                {ui.bookingPage.pageSubtitle}
              </p>
            </section>
            <BookingForm lang={lang as "es" | "en"} supabaseConfigured={isSupabaseConfigured} />
          </div>
        </div>
      </div>
      <Footer lang={lang as "es" | "en"} />
      <WhatsAppFloat lang={lang as "es" | "en"} />
    </>
  )
}
