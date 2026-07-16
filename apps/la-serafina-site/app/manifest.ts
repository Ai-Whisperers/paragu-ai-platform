import type { MetadataRoute } from "next";
import { content as c } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "La Serafina — Espacio Cultural Feminista",
    short_name: "La Serafina",
    description: c.metaDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#7B2CBF",
    icons: [{ src: "/icon", sizes: "32x32", type: "image/png" }],
  };
}
