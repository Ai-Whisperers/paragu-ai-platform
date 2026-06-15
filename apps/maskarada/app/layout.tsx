import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { content } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maskarada.paragu-ai.com"),
  title: {
    default: "Club maškaráda — La noche donde el deseo usa máscara | Asunción",
    template: "%s | Club maškaráda",
  },
  description: content.site.description,
  keywords: ["bdsm", "kink", "asunción", "paraguay", "fiesta", "maskarada", "shibari", "fetish"],
  authors: [{ name: "Club maškaráda" }],
  creator: "Club maškaráda",
  openGraph: {
    type: "website",
    locale: "es_PY",
    url: "https://maskarada.paragu-ai.com",
    title: "Club maškaráda — La noche donde el deseo usa máscara",
    description: "BDSM/kink party en Asunción, Paraguay. 11 de junio. Entradas disponibles.",
    siteName: "Club maškaráda",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Club maškaráda" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Club maškaráda — La noche donde el deseo usa máscara",
    description: "BDSM/kink party en Asunción, Paraguay. 11 de junio. Entradas disponibles.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: { canonical: "https://maskarada.paragu-ai.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        <div className="fixed inset-0 mask-gradient opacity-80 pointer-events-none z-0" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,0,0,0.08),transparent_60%)] pointer-events-none z-0" />
        <Navbar />
        <main className="relative z-10 pt-16 min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
