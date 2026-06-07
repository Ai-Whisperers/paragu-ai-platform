import { getContent } from '@/src/lib/content'
import Header from '@/src/components/sections/Header'
import Hero from '@/src/components/sections/Hero'
import Services from '@/src/components/sections/Services'
import HowItWorks from '@/src/components/sections/HowItWorks'
import Calculator from '@/src/components/sections/Calculator'
import Gallery from '@/src/components/sections/Gallery'
import Sourcing from '@/src/components/sections/Sourcing'
import Team from '@/src/components/sections/Team'
import Testimonials from '@/src/components/sections/Testimonials'
import FAQ from '@/src/components/sections/FAQ'
import Contact from '@/src/components/sections/Contact'
import Footer from '@/src/components/sections/Footer'
import WhatsAppFloat from '@/src/components/sections/WhatsAppFloat'

export default function HomePage() {
  const content = getContent()
  const home = content.home

  return (
    <>
      <Header />
      <main>
        <Hero
          headline={home.hero.headline}
          subheadline={home.hero.subheadline}
          ctaPrimary={home.hero.ctaPrimary}
          ctaSecondary={home.hero.ctaSecondary}
          ctaSecondaryHref={home.hero.ctaSecondaryHref}
          ctaPrimaryHref={home.hero.ctaPrimaryHref}
        />
        <Services />
        <HowItWorks />
        <Calculator />
        <Gallery />
        <Sourcing />
        <Team />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
