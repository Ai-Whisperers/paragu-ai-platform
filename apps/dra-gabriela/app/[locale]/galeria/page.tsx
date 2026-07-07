import { GabyGallery } from "@/components/GabyGallery"

export default function GaleriaPage({ params }: { params: { locale: string } }) {
  return (
    <main>
      <GabyGallery />
    </main>
  )
}