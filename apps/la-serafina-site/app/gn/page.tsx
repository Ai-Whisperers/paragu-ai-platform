import type { Metadata } from "next";
import { getContent, SITE_URL } from "@/lib/content";
import HomeInner from "../HomeClient";

const c = getContent("gn");

export const metadata: Metadata = {
  title: "La Serafina — Ñepyrũ guaraníme",
  description: c.metaDescription,
  alternates: { canonical: `${SITE_URL}/gn` },
};

// /gn mirrors the canonical / page with guaraní content. Full bilingual site
// would require mirroring every page; for the portfolio demo, only the home
// is translated. /es is canonical, /gn is the honor-language layer.
export default function GnHomePage() {
  return <HomeInner locale="gn" />;
}
