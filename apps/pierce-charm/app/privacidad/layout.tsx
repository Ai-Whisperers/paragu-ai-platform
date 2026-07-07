import type { Metadata } from "next";
import content from "@/content/es.json";

const c = content as any;
const SITE_URL = c.site?.url || "https://piercecharm.paragu-ai.com";

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Política de privacidad y tratamiento de datos personales de Pierce Charm conforme a la Ley 6534/2020 de Paraguay. Derechos ARCO, retención, contacto y jurisdicción.',
  alternates: {
    canonical: `${SITE_URL}/privacidad`,
  },
  openGraph: {
    title: 'Política de privacidad',
    description: 'Política de privacidad y tratamiento de datos personales de Pierce Charm conforme a la Ley 6534/2020 de Paraguay. Derechos ARCO, retención, contacto y jurisdicción.',
    url: `${SITE_URL}/privacidad`,
    siteName: c.businessName,
    locale: "es_PY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: 'Política de privacidad',
    description: 'Política de privacidad y tratamiento de datos personales de Pierce Charm conforme a la Ley 6534/2020 de Paraguay. Derechos ARCO, retención, contacto y jurisdicción.',
  },
};

export default function PrivacidadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
