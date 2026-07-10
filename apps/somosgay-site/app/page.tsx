import type { Metadata } from "next";
import { content as c } from "@/lib/content";
import HomeInner from "./HomeClient";
const SITE_URL = c.site?.url || "https://somosgay.paragu-ai.com";

export const metadata: Metadata = {
  title: "SOMOSGAY — Tekoporã para todes",
  description: c.metaDescription,
  alternates: { canonical: `${SITE_URL}/` },
};

export default function HomePage() {
  return <HomeInner />;
}