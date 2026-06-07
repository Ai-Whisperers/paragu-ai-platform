"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Beer, Wine, Citrus, Sparkles, GlassWater } from "lucide-react";

interface BeerItem {
  name: string;
  description: string;
  ABV: string;
  IBU: string;
  price?: string;
  maridaje?: string;
  sizes?: string;
  image?: string;
}

interface Subcategory {
  id: string;
  name: string;
  description: string;
  items: BeerItem[];
}

interface Category {
  id: string;
  name: string;
  icon?: string;
  subcategories?: Subcategory[];
}

export default function CervezasClient({
  categories,
  whatsapp,
}: {
  categories: Category[];
  whatsapp: string;
}) {
  const subcategories = categories[0]?.subcategories ?? [];
  const [activeCat, setActiveCat] = useState(subcategories[0]?.id || "");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && subcategories.find((s) => s.id === hash)) {
      setActiveCat(hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [subcategories]);

  const catIcons: Record<string, React.ReactNode> = {
    lagers: <Beer size={18} />,
    ales: <Citrus size={18} />,
    ipas: <Sparkles size={18} />,
    especiales: <Wine size={18} />,
    stouts: <GlassWater size={18} />,
  };

  const handleFilterClick = (id: string) => {
    setActiveCat(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = id;
    }
  };

  return (
    <div className="section-padding bg-[var(--color-background)]">
      <div className="container-page">
        {/* Category Filter Tabs (desktop) */}
        <div className="hidden md:flex flex-wrap gap-2 mb-12 justify-center">
          {subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => handleFilterClick(sub.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCat === sub.id
                  ? "bg-gold text-[var(--color-background)]"
                  : "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
              }`}
            >
              <span className="inline-block mr-2 align-middle">
                {catIcons[sub.id]}
              </span>
              {sub.name}
            </button>
          ))}
        </div>

        {/* Beer Cards Grid */}
        <div className="space-y-16 max-w-5xl mx-auto">
          {subcategories.map((sub) => (
            <section key={sub.id} id={sub.id} className="scroll-mt-28">
              {/* Mobile Accordion Header */}
              <button
                className="md:hidden w-full flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] mb-4"
                onClick={() =>
                  setOpenAccordion(
                    openAccordion === sub.id ? null : sub.id
                  )
                }
              >
                <span className="flex items-center gap-2 font-semibold text-[var(--color-text)]">
                  {catIcons[sub.id]}
                  {sub.name}
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    openAccordion === sub.id ? "rotate-180" : ""
                  } text-[var(--color-text-muted)]`}
                />
              </button>

              {/* Desktop Category Header */}
              <div className="hidden md:flex items-center gap-3 mb-6">
                <span className="text-gold">{catIcons[sub.id]}</span>
                <h2 className="text-2xl font-[var(--font-heading)] font-bold text-[var(--color-text)]">
                  {sub.name}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent ml-4" />
              </div>

              {/* Category Description */}
              <p className="text-sm text-[var(--color-text-muted)] mb-8 max-w-2xl ml-0 md:ml-8">
                {sub.description}
              </p>

              {/* Accordion Content */}
              <div
                className={`${
                  openAccordion !== sub.id && openAccordion !== null
                    ? "hidden"
                    : "block"
                } md:block`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sub.items.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] overflow-hidden hover:border-gold/40 transition-all group"
                    >
                      {/* Beer Image */}
                      {item.image && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-alt)] via-transparent to-transparent" />
                        </div>
                      )}
                      <div className="p-6">
                        {/* Name + ABV/IBU badges */}
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-[var(--color-text)] group-hover:text-gold transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex gap-2 shrink-0 ml-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-gold">
                              ABV {item.ABV}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-gold">
                              IBU {item.IBU}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-[var(--color-text-light)] leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Maridaje */}
                        {item.maridaje && (
                          <p className="text-xs text-[var(--color-text-muted)] mb-3">
                            <span className="text-gold font-medium">
                              Maridaje:{" "}
                            </span>
                            {item.maridaje}
                          </p>
                        )}

                        {/* Sizes */}
                        {item.sizes && (
                          <p className="text-xs text-[var(--color-text-muted)] mb-4">
                            <span className="text-gold font-medium">
                              Presentación:{" "}
                            </span>
                            {item.sizes}
                          </p>
                        )}

                        {/* Price + WhatsApp */}
                        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
                          <div>
                            <span className="text-sm font-semibold text-gold">
                              {item.price || "Consultar"}
                            </span>
                            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                              ABV = Alcohol por volumen · IBU = Amargor
                            </p>
                          </div>
                          <a
                            href={`https://wa.me/${whatsapp}?text=Hola!%20Quiero%20pedir%20${encodeURIComponent(item.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-all"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Pedir
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary-light)] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            </svg>
            Pedí por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
