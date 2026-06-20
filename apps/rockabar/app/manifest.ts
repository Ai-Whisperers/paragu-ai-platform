import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rocka Bar — Rock, Burgers & Tragos",
    short_name: "Rocka Bar",
    description: "Hamburguesas, pizzas y tragos con onda rock en Capiatá, Paraguay.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#B91C1C",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
