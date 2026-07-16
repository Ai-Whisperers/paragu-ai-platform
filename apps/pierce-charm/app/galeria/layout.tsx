import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galería",
  description:
    "Curaduría de joyería alternativa y piezas del estudio. Cadenas, plugs, septum, captives y ornamentos góticos.",
  alternates: { canonical: "/galeria" },
  openGraph: {
    title: "Galería | Pierce Charm",
    description: "Nuestra curaduría de joyería alternativa y ornamentos.",
    url: "/galeria",
  },
};

export default function GaleriaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
