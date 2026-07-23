import type { Metadata } from "next";
import content from "@/content/es.json";
import type { SiteContent } from "@/lib/content-types";
import HomeInner from "./HomeClient";

const c = content as SiteContent;
const SITE_URL = c.site?.url || "https://piercecharm.paragu-ai.com";

export const metadata: Metadata = {
  title: {
    absolute: "Pierce Charm — Piercings & Joyería Alternativa · Asunción",
  },
  description:
    "Estudio de piercing & joyería alternativa en Asunción. Catálogo interactivo de 26 perforaciones profesionales, materiales implantgrade, bioseguridad y compromiso con cada cliente. Reservá por WhatsApp.",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: "Pierce Charm — Piercings & Joyería Alternativa",
    description:
      "Estudio de piercing & joyería alternativa en Asunción. Materiales implantgrade, bioseguridad y un compromiso con cada cliente.",
    url: `${SITE_URL}/`,
    siteName: c.businessName,
    locale: "es_PY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pierce Charm — Piercings & Joyería Alternativa",
    description:
      "Estudio de piercing & joyería alternativa en Asunción. Materiales implantgrade, bioseguridad y un compromiso con cada cliente.",
  },
};

export default function HomePage() {
  return <HomeInner />;
}
