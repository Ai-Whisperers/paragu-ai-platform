import "./globals.css";
import { CookieConsent } from "@ai-whisperers/seo";
import { WhatsAppFloat } from "@ai-whisperers/whatsapp";


export const metadata = {
  title: "Camilo Acosta - El Gato Siamés",
  description: "Stand up paraguayo: humor negro, one-liners",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
        <WhatsAppFloat phone="+595981123456" />
        <CookieConsent />
      </body>
    </html>
  );
}
