import type { Metadata } from "next";
import content from "@/content/es.json";

const c = content as any;
const SITE_URL = c.site?.url || "https://piercecharm.paragu-ai.com";

export const metadata: Metadata = {
  title: 'Preguntas frecuentes',
  description: 'Todo lo que necesitás saber antes de tu cita de piercing: materiales, cicatrización, política de edad, precios, bioseguridad, cuidados post-servicio.',
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    title: 'Preguntas frecuentes',
    description: 'Todo lo que necesitás saber antes de tu cita de piercing: materiales, cicatrización, política de edad, precios, bioseguridad, cuidados post-servicio.',
    url: `${SITE_URL}/faq`,
    siteName: c.businessName,
    locale: "es_PY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: 'Preguntas frecuentes',
    description: 'Todo lo que necesitás saber antes de tu cita de piercing: materiales, cicatrización, política de edad, precios, bioseguridad, cuidados post-servicio.',
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
