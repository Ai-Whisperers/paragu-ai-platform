import { Header } from "@/components/header";
import { Services } from "@/components/services";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export const metadata = { title: "Servicios — Luis De León Concept", description: "Conocé todos nuestros servicios con precios y duración." };

export default function ServiciosPage() {
  return (
    <>
      <Header />
      <div className="pt-24"><Services /></div>
      <Footer
        businessName="Luis De León Concept"
        tagline="Estilo y Elegancia en Asunción"
        address="Asunción"
        phone="0981 000 000"
        hours="Lun-Sáb: 9:00 - 20:00"
        waPhone="595981000000"
      />
      <WhatsAppFloat />
    </>
  );
}
