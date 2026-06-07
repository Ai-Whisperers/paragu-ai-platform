import { Metadata } from "next";
import ClubClient from "./club-client";

export const metadata: Metadata = {
  title: "Club Trentina | Comunidad de Cerveceros",
  description: "Únete al Club Trentina y recibe beneficios exclusivos: descuentos, ediciones limitadas y acceso prioritario a nuevos lanzamientos.",
};

export const revalidate = 1;

export default function ClubPage() {
  return <ClubClient />;
}