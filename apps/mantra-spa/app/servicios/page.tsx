import { Header } from "@/components/header";
import { Services } from "@/components/services";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export const metadata = { title: "Servicios — Mantra Spa", description: "Conocé todos nuestros servicios con precios y duración." };

export default function ServiciosPage() {
  return (
    <>
      <Header />
      <div className="pt-24"><Services /></div>
      <Footer
        businessName="Mantra Spa"
        tagline="Bienestar y Relax en Concepción"
        address="Concepción"
        phone="0981 106 062"
        hours="Lun-Sáb: 10:00 - 20:00"
        waPhone="595986106062"
      />
      <WhatsAppFloat />
    </>
  );
}
