import type { MetadataRoute } from "next"
export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Magnolia Peluquería",
    short_name: "Magnolia",
    description: "Cortes profesionales, coloración y tratamientos que transforman tu estilo en Asunción",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f9fa",
    theme_color: "#0d2137",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  }
}