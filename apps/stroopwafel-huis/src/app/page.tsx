import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { WhatIsSection } from '@/components/what-is-section'
import { WeeklyFlavor } from '@/components/weekly-flavor'
import { FavoritesSection } from '@/components/favorites-section'
import { StorySection } from '@/components/story-section'
import { LocationSection } from '@/components/location-section'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { MobileCta } from '@/components/mobile-cta'
import type { Content } from '@/types/content'
import raw from '@/content/es.json'

const content = raw as unknown as Content
const h = content.home
const phone = content.whatsapp.phone
const waMessage = content.whatsapp.message

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection
          headline={h.hero.headline}
          subheadline={h.hero.subheadline}
          ctaPrimary={h.hero.ctaPrimary}
          ctaSecondary={h.hero.ctaSecondary}
        />
        <WhatIsSection
          title={h.whatIs.title}
          body={h.whatIs.body}
          tip={h.whatIs.tip}
          cta={h.whatIs.cta}
        />
        <WeeklyFlavor
          title={h.weeklyFlavor.title}
          subtitle={h.weeklyFlavor.subtitle}
          name={h.weeklyFlavor.name}
          description={h.weeklyFlavor.description}
          price={h.weeklyFlavor.price}
          cta={h.weeklyFlavor.cta}
          phone={phone}
          message={waMessage}
        />
        <FavoritesSection
          title={h.favorites.title}
          items={h.favorites.items}
        />
        <StorySection
          title={h.story.title}
          body={h.story.body}
          author={h.story.author}
        />
        <LocationSection
          title={h.location.title}
          address={h.location.address}
          phone={h.location.phone}
          email={h.location.email}
          hours={h.location.hours}
          cta={h.location.cta}
        />
      </main>
      <Footer />
      <WhatsAppFloat phone={phone} message={waMessage} />
      <MobileCta phone={phone} message={waMessage} />
    </>
  )
}
