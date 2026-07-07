import type { Metadata } from "next";
import content from "@/content/es.json";

const c = content as any;
const SITE_URL = c.site?.url || "https://piercecharm.paragu-ai.com";

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: 'Términos y condiciones del servicio de Pierce Charm. Política de reservas, seña, política de edad, bioseguridad y jurisdicción.',
  alternates: {
    canonical: `${SITE_URL}/terminos`,
  },
  openGraph: {
    title: 'Términos y condiciones',
    description: 'Términos y condiciones del servicio de Pierce Charm. Política de reservas, seña, política de edad, bioseguridad y jurisdicción.',
    url: `${SITE_URL}/terminos`,
    siteName: c.businessName,
    locale: "es_PY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: 'Términos y condiciones',
    description: 'Términos y condiciones del servicio de Pierce Charm. Política de reservas, seña, política de edad, bioseguridad y jurisdicción.',
  },
};

export default function TerminosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
