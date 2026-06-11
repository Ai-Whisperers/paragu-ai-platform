import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileCta } from "@/components/mobile-cta"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export function PageLayout({
  children,
  phone,
  showMobileCta = true,
}: {
  children: React.ReactNode
  phone?: string
  showMobileCta?: boolean
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {showMobileCta && phone && <MobileCta phone={phone} />}
      {phone && <WhatsAppFloat phone={phone} />}
    </>
  )
}
