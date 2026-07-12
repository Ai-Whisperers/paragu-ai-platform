import type { Metadata } from "next";
import { content as c, SITE_URL } from "@/lib/content";
import HomeInner from "./HomeClient";

export const metadata: Metadata = {
  title: "La Serafina — La casa más sáfica de Paraguay",
  description: c.metaDescription,
  alternates: { canonical: `${SITE_URL}/` },
  other: { "content-language": "es-PY" },
};

export default function HomePage() {
  return <HomeInner locale="es" />;
}
