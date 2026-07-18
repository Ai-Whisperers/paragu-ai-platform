import type { Metadata } from "next";
import content from "@/content/es.json";
import type { SiteContent } from "@/lib/content-types";

const c = content as SiteContent;
const SITE_URL = c.site?.url || "https://piercecharm.paragu-ai.com";

export const metadata: Metadata = {
  title: 'Catálogo de piercings',
  description: 'Catálogo interactivo de perforaciones profesionales: oreja (lóbulo, helix, tragus, daith, rook, industrial), rostro (septum, nostril, labret, eyebrow) y cuerpo (ombligo). 14 ubicaciones del cartílago y lóbulo + 10 faciales + 2 corporales.',
  alternates: {
    canonical: `${SITE_URL}/piercings`,
  },
  openGraph: {
    title: 'Catálogo de piercings',
    description: 'Catálogo interactivo de perforaciones profesionales: oreja (lóbulo, helix, tragus, daith, rook, industrial), rostro (septum, nostril, labret, eyebrow) y cuerpo (ombligo). 14 ubicaciones del cartílago y lóbulo + 10 faciales + 2 corporales.',
    url: `${SITE_URL}/piercings`,
    siteName: c.businessName,
    locale: "es_PY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: 'Catálogo de piercings',
    description: 'Catálogo interactivo de perforaciones profesionales: oreja (lóbulo, helix, tragus, daith, rook, industrial), rostro (septum, nostril, labret, eyebrow) y cuerpo (ombligo). 14 ubicaciones del cartílago y lóbulo + 10 faciales + 2 corporales.',
  },
};

export default function PiercingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
