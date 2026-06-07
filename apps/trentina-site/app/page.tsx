import type { Metadata } from "next";
import content from "@/content/es.json";
import Hero from "@/components/hero";
import FeaturesSection from "@/components/features-section";
import StatsSection from "@/components/stats-section";
import MenuPreviewSection from "@/components/menu-preview-section";
import ProcessSection from "@/components/process-section";
import WeeklySpecial from "@/components/weekly-special";
import CtaBanner from "@/components/cta-banner";

const c = content as any;

export const metadata: Metadata = {
  title: "Cerveza Trentina — Cerveza artesanal paraguaya | Santa Rita, Alto Paraná",
  description:
    "Cerveza artesanal paraguaya elaborada en Santa Rita, Alto Paraná por el Maestro Cervecero Alexsandro Giordani. Pilsen, APA, IPA, Metatron IPL y Dunkel Cacao. Chopp para eventos y packs a domicilio.",
  openGraph: {
    title: "Cerveza Trentina — Cerveza artesanal paraguaya",
    description:
      "Pilsen, APA, IPA, Metatron IPL y Dunkel Cacao. Elaborada en Santa Rita, Alto Paraná con pasión artesanal.",
  },
};

export default function HomePage() {
  const h = c.home;
  const site = c.site;

  // Beer-style features items
  const beerFeatures = h.features.items.map((item: any) => ({
    icon: item.icon,
    title: item.title,
    description: item.description,
  }));

  // Beer categories for menu preview — REAL Trentina data
  const cervezaCategories = [
    { id: "lagers", name: "Pilsen", priceRange: "Gs 130.000 – 300.000/pack" },
    { id: "ipas", name: "IPA", priceRange: "Gs 400.000/pack" },
    { id: "ales", name: "APA", priceRange: "Gs 400.000/pack" },
    { id: "especiales", name: "Metatron IPL", priceRange: "Gs 380.000/pack" },
    { id: "stouts", name: "Dunkel Cacao", priceRange: "Estacional" },
  ];

  // Process steps
  const processSteps = [
    {
      number: "01",
      title: "Selección de Ingredientes",
      description:
        "Malta de cebada seleccionada, lúpulos alemanes y americanos, levadura pura y agua de la mejor calidad.",
      image: "/images/ingredients/hops-cone.jpg",
    },
    {
      number: "02",
      title: "Cocción y Lupulizado",
      description:
        "Macereo y cocción controlada para extraer lo mejor de cada malta. Agregado de lúpulos en momentos precisos.",
      image: "/images/process/boiling.jpg",
    },
    {
      number: "03",
      title: "Fermentación",
      description:
        "Fermentación lenta y controlada respetando los tiempos que cada estilo requiere para su perfil ideal.",
      image: "/images/process/fermentation.jpg",
    },
    {
      number: "04",
      title: "Maduración y Envasado",
      description:
        "Maduración en frío para lograr claridad y carbonatación natural. Envasado artesanal botella por botella.",
      image: "/images/process/bottling.jpg",
    },
  ];

  return (
    <>
      {/* Hero */}
      <Hero
        eyebrow={h.hero.eyebrow}
        headline={h.hero.headline}
        subheadline={h.hero.subheadline}
        ctaPrimaryText={h.hero.ctaPrimaryText}
        ctaPrimaryHref={h.hero.ctaPrimaryHref}
        ctaSecondaryText={h.hero.ctaSecondaryText}
        ctaSecondaryHref={h.hero.ctaSecondaryHref}
        bgImage="/images/beer-pour-craft.jpg"
        variant="dark"
      />

      {/* Stats Section */}
      <StatsSection items={h.stats.items} />

      {/* Features Section */}
      <FeaturesSection
        title={h.features.title}
        subtitle={h.features.subtitle}
        items={beerFeatures}
      />

      {/* Beer Categories Preview */}
      <MenuPreviewSection
        title={h.menuSection.title}
        description={h.menuSection.description}
        categories={cervezaCategories}
      />

      {/* Brewing Process */}
      <ProcessSection
        steps={processSteps}
      />

      {/* Weekly Special / Promo Pack */}
      <WeeklySpecial
        title={h.weeklySpecial.title}
        subtitle={h.weeklySpecial.subtitle}
        badge={h.weeklySpecial.badge}
        item={h.weeklySpecial.item}
        ctaText={h.weeklySpecial.ctaText}
        ctaHref={h.weeklySpecial.ctaHref}
        validDays={h.weeklySpecial.validDays}
      />

      {/* CTA Banner (WhatsApp) */}
      <CtaBanner
        title={h.cta.title}
        subtitle={h.cta.subtitle}
        buttonText={h.cta.buttonText}
        buttonHref={h.cta.buttonHref}
      />
    </>
  );
}
