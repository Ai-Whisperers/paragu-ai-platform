import type { Metadata } from "next";
import content from "@/content/es.json";
import type { SiteContent } from "@/lib/content-types";

const c = content as SiteContent;
const SITE_URL = c.site?.url || "https://piercecharm.paragu-ai.com";

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conocé a Luana, la piercer principal de Pierce Charm. Estudio de piercing alternativo en Asunción con bioseguridad, materiales implantgrade y un compromiso con la honestidad sobre la anatomía de cada cliente.',
  alternates: {
    canonical: `${SITE_URL}/nosotros`,
  },
  openGraph: {
    title: 'Nosotros',
    description: 'Conocé a Luana, la piercer principal de Pierce Charm. Estudio de piercing alternativo en Asunción con bioseguridad, materiales implantgrade y un compromiso con la honestidad sobre la anatomía de cada cliente.',
    url: `${SITE_URL}/nosotros`,
    siteName: c.businessName,
    locale: "es_PY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: 'Nosotros',
    description: 'Conocé a Luana, la piercer principal de Pierce Charm. Estudio de piercing alternativo en Asunción con bioseguridad, materiales implantgrade y un compromiso con la honestidad sobre la anatomía de cada cliente.',
  },
};

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
