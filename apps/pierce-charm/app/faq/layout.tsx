import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Todo lo que necesitás saber antes de hacerte un piercing: dolor, cicatrización, joyería, cuidados y protocolos del estudio.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Preguntas frecuentes | Pierce Charm",
    description:
      "Respondemos las dudas más comunes antes de tu cita.",
    url: "/faq",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
