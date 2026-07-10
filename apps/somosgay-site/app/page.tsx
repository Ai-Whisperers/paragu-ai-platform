import type { Metadata } from "next";
import content from "@/content/es.json";
import HomeInner from "./HomeClient";

const c = content as any;
const SITE_URL = c.site?.url || "https://somosgay.paragu-ai.com";

export const metadata: Metadata = {
  title: "SOMOSGAY — Tekoporã para todes",
  description: c.metaDescription,
  alternates: { canonical: `${SITE_URL}/` },
};

export default function HomePage() {
  return <HomeInner />;
}