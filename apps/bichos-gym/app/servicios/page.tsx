import { Header } from "@/components/header";
import { Services } from "@/components/services";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export const metadata = { title: "Servicios — Bicho's Gym", description: "Conocé todos nuestros servicios con precios y duración." };

export default function ServiciosPage() {
  return (
    <>
      <Header />
      <div className="pt-24"><Services /></div>
      <Footer
        businessName="Bicho's Gym"
        tagline="Transformá tu Cuerpo en Capiatá"
        address="Capiatá"
        phone="0981 106 062"
        hours="Lun-Sáb: 7:00 - 21:00, Dom: 9:00 - 13:00"
        waPhone="595986106062"
      />
      <WhatsAppFloat />
    </>
  );
}
