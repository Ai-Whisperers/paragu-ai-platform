import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Estudio alternativo de piercings en Asunción. Filosofía, ética, materiales implantgrade y un espacio pensado para que cada visita sea una experiencia.",
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Nosotros | Pierce Charm",
    description:
      "Nuestra filosofía: técnica, joyería implantgrade y estética alternativa en Asunción.",
    url: "/nosotros",
  },
};

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
