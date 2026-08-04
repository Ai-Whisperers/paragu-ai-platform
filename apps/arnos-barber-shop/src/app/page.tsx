import type { Metadata } from 'next';
import content from "../../content/es.json";
import { SectionsRenderer } from "../components/SectionsRenderer";

export const metadata: Metadata = {
  title: "Nde Barba | Barbería en San Lorenzo",
  description: "Barbería y peluquería masculina en Fernando de la Mora. Cortes modernos y clásicos.. Cortes clásicos y modernos, ambiente familiar.",
  keywords: ["barbería", "San Lorenzo", "Paraguay", "corte de pelo"],
  robots: "index, follow",
  alternates: {
    canonical: "https://arnos-barber-shop.paragu-ai.com",
  },
  openGraph: {
    title: "Nde Barba | Barbería en San Lorenzo",
    description: "Barbería y peluquería masculina en Fernando de la Mora. Cortes modernos y clásicos.",
    url: "https://arnos-barber-shop.paragu-ai.com",
    siteName: "ParaguAI",
    locale: "es_PY",
    type: "website",
    images: [{
      url: "https://arnos-barber-shop.paragu-ai.com/og/og-image.png",
      width: 1200,
      height: 630,
      alt: "Nde Barba",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nde Barba | Barbería en San Lorenzo",
    description: "Barbería y peluquería masculina en Fernando de la Mora. Cortes modernos y clásicos.",
    images: ["https://arnos-barber-shop.paragu-ai.com/og/og-image.png"],
  },
};

export default function HomePage() {
  return <SectionsRenderer content={content as any} />;
}
