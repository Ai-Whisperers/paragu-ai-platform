import type { Metadata } from "next";
import "./globals.css";
import { CookieConsent } from "@ai-whisperers/seo"
import { WhatsAppFloat } from "@ai-whisperers/whatsapp"

export const metadata: Metadata = {
  title: "El Gato Siamés — Stand Up Paraguay",
  description: "Camilo Acosta, El Gato Siamés. Comediante paraguayo de stand up: humor negro, one-liners, doble sentido y una estética escénica oscura e inexpresiva.",
  authors: [{ name: "El Gato Siamés" }],
  openGraph: {
    title: "El Gato Siamés — Stand Up Paraguay",
    description: "Camilo Acosta, comediante paraguayo de stand up. Humor ácido, negro y original desde Paraguay.",
    url: "https://elgatosiames.paragu-ai.com",
    siteName: "El Gato Siamés",
    locale: "es_PY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@el.gatosiames",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}
        <WhatsAppFloat />
        <CookieConsent />
      </body>
    </html>
  );
}
