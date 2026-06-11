import HeaderSection from '@/components/sections/header-section'
import HeroSection from '@/components/sections/hero-section'
import MusicSection from '@/components/sections/music-section'
import EventsSection from '@/components/sections/events-section'
import VideosSection from '@/components/sections/videos-section'
import MerchSection from '@/components/sections/merch-section'
import LyricsSection from '@/components/sections/lyrics-section'
import AboutSection from '@/components/sections/about-section'
import ContactSection from '@/components/sections/contact-section'
import FooterSection from '@/components/sections/footer-section'

export default function Home() {
  return (
    <>
      <HeaderSection />
      <main>
        <HeroSection />
        <MusicSection />
        <EventsSection />
        <VideosSection />
        <MerchSection />
        <LyricsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  )
}
