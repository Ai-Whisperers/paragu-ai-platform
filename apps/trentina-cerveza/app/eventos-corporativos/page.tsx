import { Metadata } from "next";
import EventosClient from "./eventos-client";

export const revalidate = 1;
export const metadata: Metadata = {
  title: "Eventos Corporativos | Trentina Cerveza Artesanal",
  description: "Llevamos chopp Trentina a tu evento empresarial, casamiento o fiesta. Servicio profesional en Asunción y alrededores.",
};

export default function EventosPage() {
  return <EventosClient />;
}