import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Piercings",
  description:
    "Catálogo completo de piercings: lóbulo, helix, tragus, daith, rook, conch, industrial, septum y más. Precios en guaraníes, tiempos de cicatrización y niveles de cuidado.",
  alternates: { canonical: "/piercings" },
  openGraph: {
    title: "Piercings | Pierce Charm",
    description:
      "Todos los piercings que hacemos, con precio, tiempo de cicatrización y nivel de cuidado.",
    url: "/piercings",
  },
};

export default function PiercingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
