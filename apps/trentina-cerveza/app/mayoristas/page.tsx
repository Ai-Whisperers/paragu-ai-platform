import { Metadata } from "next";
import MayoristasClient from "./mayoristas-client";

export const metadata: Metadata = {
  title: "Mayoristas | Trentina Cerveza Artesanal",
  description: "Venta mayorista de cerveza artesanal Trentina. Precios por volumen para bares, restaurantes y distribuidores en Paraguay.",
};

export const revalidate = 1;

export default function MayoristasPage() {
  return <MayoristasClient />;
}