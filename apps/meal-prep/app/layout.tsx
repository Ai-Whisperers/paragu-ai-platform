import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${lato.variable}`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
