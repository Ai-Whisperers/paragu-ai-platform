import SubirFotosClient from "../SubirFotosClient";

export const metadata = {
  title: "Subir fotos — Club maškaráda",
  description: "Compartinos las fotos de este evento.",
};

export default async function SubirFotosEvento({ params }: { params: Promise<{ eventSlug: string }> }) {
  const { eventSlug } = await params;
  return <SubirFotosClient eventSlug={eventSlug} />;
}