import type { MetadataRoute } from "next";
import { content as c } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SOMOSGAY — Tekoporã para todes",
    short_name: "SOMOSGAY",
    description: "Derechos LGBTQ+ y salud comunitaria en Paraguay",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFCF7",
    theme_color: "#7B2CBF",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}