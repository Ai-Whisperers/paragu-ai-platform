import type { Metadata } from "next";
import content from "@/content/es.json";
import type { SiteContent } from "@/lib/content-types";

const c = content as SiteContent;
const SITE_URL = c.site?.url || "https://piercecharm.paragu-ai.com";

export const metadata: Metadata = {
  title: 'Joyería alternativa',
  description: 'Curaduría de joyería alternativa para piercings: cadenas, expansores, captives, septum y labrets. Materiales implantgrade, titanio ASTM F136 y acero quirúrgico certificado.',
  alternates: {
    canonical: `${SITE_URL}/galeria`,
  },
  openGraph: {
    title: 'Joyería alternativa',
    description: 'Curaduría de joyería alternativa para piercings: cadenas, expansores, captives, septum y labrets. Materiales implantgrade, titanio ASTM F136 y acero quirúrgico certificado.',
    url: `${SITE_URL}/galeria`,
    siteName: c.businessName,
    locale: "es_PY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: 'Joyería alternativa',
    description: 'Curaduría de joyería alternativa para piercings: cadenas, expansores, captives, septum y labrets. Materiales implantgrade, titanio ASTM F136 y acero quirúrgico certificado.',
  },
};

export default function GaleriaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
