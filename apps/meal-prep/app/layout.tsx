import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Analytics, TrackCtas } from "../components/analytics"

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodService",
  name: "Meal Prep",
  url: "https://meal-prep.paragu-ai.com",
  image: "https://meal-prep.paragu-ai.com/og/og-image.png",
  telephone: "+595****0000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Asunción",
    addressRegion: "Central",
    addressCountry: "PY"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -25.2637,
    longitude: -57.5759
  },
  "sameAs": ["https://instagram.com/mealprep.py"]
}

export const metadata: Metadata = {
  title: "Prep — Meal Prep semanal en San Lorenzo | De Abasto a Casa",
  description:
    "Mise-en-place semanal: compramos, lavamos, porcionamos y organizamos tu heladera. Menos caos, más comida lista. Desde Gs. 400.000/sem.",
  icons: {
    icon: "/favicon.svg",
  },
  keywords: "meal prep Paraguay, mise en place San Lorenzo, comida organizada, porciones semanales, delivery Asunción",
  openGraph: {
    title: "Prep — Meal Prep Semanal",
    description: "Tu heladera organizada, tus porciones listas, tu semana tranquila.",
    type: "website",
    images: [
      {
        url: "https://meal-prep.paragu-ai.com/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prep - Meal Prep semanal en Paraguay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prep — Meal Prep Semanal",
    description: "Tu heladera organizada, tus porciones listas, tu semana tranquila.",
    images: ["https://meal-prep.paragu-ai.com/og/og-image.png"],
  },

  alternates: { canonical: "https://meal-prep.paragu-ai.com", languages: { "es": "https://meal-prep.paragu-ai.com/" } },};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${lato.variable}`}>
      <head>
        <meta property="og:image" content="https://meal-prep.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://meal-prep.paragu-ai.com" />
        <meta property="og:site_name" content="Meal Prep" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://meal-prep.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </head>
        <TrackCtas />
      <body className="min-h-full flex flex-col antialiased">
        <Analytics />
        <TrackCtas />
{children}</body>
    </html>
  );
}
