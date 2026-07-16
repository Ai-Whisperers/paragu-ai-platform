import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto y reservas",
  description:
    "Reservá tu cita por WhatsApp. Horarios, ubicación en Asunción y qué traer el día de tu turno.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto y reservas | Pierce Charm",
    description: "Reservá tu cita por WhatsApp. Atendemos con cita previa en Asunción.",
    url: "/contacto",
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
