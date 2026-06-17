import SubirFotosClient from "./SubirFotosClient";

export const metadata = {
  title: "Subir fotos — Club maškaráda",
  description:
    "Compartinos las fotos que sacaste en un evento de maškaráda. El equipo las revisa y publica las mejores en la galería del evento.",
};

export default function SubirFotosIndex() {
  return <SubirFotosClient />;
}
