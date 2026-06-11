import { videos } from '@/data/videos'
import HeaderSection from '@/components/sections/header-section'
import FooterSection from '@/components/sections/footer-section'
import VideoPageClient from './client'

export const metadata = {
  title: 'Videos — Nüdo',
  description: 'Videoclips, lyric videos y presentaciones en vivo de Nüdo.',
}

export default function VideosPage() {
  return (
    <>
      <HeaderSection />
      <main>
        <VideoPageClient videos={videos} />
      </main>
      <FooterSection />
    </>
  )
}
