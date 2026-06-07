import { Metadata } from "next"
import { GiftCardsSection } from "@/components/gift-cards"

export const metadata: Metadata = {
  title: "Tarjetas de Regalo | Magnolia Peluquería",
  description: "Regala un momento especial en Magnolia Peluquería. Tarjetas de regalo disponibles.",
}

export default function ReservaPage() {
  return (
    <main>
      <GiftCardsSection />
    </main>
  )
}
