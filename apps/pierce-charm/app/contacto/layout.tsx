import type { Metadata } from "next";
import content from "@/content/es.json";
import type { SiteContent } from "@/lib/content-types";

const c = content as SiteContent;
const SITE_URL = c.site?.url || "https://piercecharm.paragu-ai.com";

export const metadata: Metadata = {
  title: 'Contacto y reserva',
  description: 'Reservá tu cita de piercing en Pierce Charm, Asunción. Atención con cita previa de lunes a sábado. WhatsApp + ubicación en Asunción, Paraguay.',
  alternates: {
    canonical: `${SITE_URL}/contacto`,
  },
  openGraph: {
    title: 'Contacto y reserva',
    description: 'Reservá tu cita de piercing en Pierce Charm, Asunción. Atención con cita previa de lunes a sábado. WhatsApp + ubicación en Asunción, Paraguay.',
    url: `${SITE_URL}/contacto`,
    siteName: c.businessName,
    locale: "es_PY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: 'Contacto y reserva',
    description: 'Reservá tu cita de piercing en Pierce Charm, Asunción. Atención con cita previa de lunes a sábado. WhatsApp + ubicación en Asunción, Paraguay.',
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
