import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Breadcrumb } from "@/components/breadcrumb"
import { Testimonials } from "@/components/testimonials"
import { getContent } from "@/lib/config"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return {
    title: `Sobre Nosotros | ${c.business.name}`,
    description: `${c.business.name} — Conocé a nuestro equipo de profesionales con más de 18 años de experiencia en Asunción.`,
  }
}

export default async function NosotrosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <div className="pt-24">
        <div className="container-page max-w-5xl">
          <Breadcrumb lang={lang as "es" | "en"} />
          <div className="mt-6">
            <section className="text-center py-20 px-4 bg-primary relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 3px 3px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
              <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6">Sobre Nosotros</h1>
                <p className="text-white/80 text-xl max-w-2xl mx-auto">Más de 18 años trayendo lo mejor del cuidado capilar a Asunción</p>
              </div>
            </section>
            <section className="py-20 bg-background">
              <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-14">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-4">✨ Equipo</span>
                  <h2 className="font-heading text-4xl font-bold text-primary">Nuestro Equipo</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {c.team.map((member: { name: string; role: string; bio: string; image: string }, i: number) => (
                    <div key={i} className="text-center p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-shadow">
                      <div className="w-24 h-24 rounded-full bg-secondary/10 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                        <span className="text-4xl">👩‍🎨</span>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-primary">{member.name}</h3>
                      <p className="text-secondary text-sm font-medium mb-2">{member.role}</p>
                      <p className="text-foreground-light text-sm">{member.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <Testimonials />
          </div>
        </div>
      </div>
      <Footer businessName={c.business.name} tagline={c.business.tagline} address={c.business.address} phone={c.business.phoneFormatted} hours={c.business.hours} waPhone={c.business.whatsapp} lang={lang as "es" | "en"} />
      <WhatsAppFloat lang={lang as "es" | "en"} />
    </>
  )
}
