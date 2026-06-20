"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Utensils, Flame, Fish, Beef, Drumstick, Pizza, Beer, Martini } from "lucide-react";

interface MenuItem {
  name: string;
  description?: string;
  price: string;
}

interface MenuCategory {
  id: string;
  name: string;
  icon?: string;
  type?: string;
  columns?: string[];
  rows?: string[][];
  items?: MenuItem[];
  notes?: string[];
}

export default function MenuPageClient({
  categories,
  whatsapp,
}: {
  categories: MenuCategory[];
  whatsapp: string;
}) {
  const [activeCat, setActiveCat] = useState(categories[0]?.id || "");
  const [openCat, setOpenCat] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && categories.find((c) => c.id === hash)) {
      setActiveCat(hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [categories]);

  const catIcons: Record<string, React.ReactNode> = {
    entradas: <Utensils size={18} />,
    sopas: <Utensils size={18} />,
    salteados: <Flame size={18} />,
    carne: <Beef size={18} />,
    pollo: <Drumstick size={18} />,
    cerdo: <Drumstick size={18} />,
    mariscos: <Fish size={18} />,
    pescados: <Fish size={18} />,
    sushi: <Fish size={18} />,
    hamburguesas: <Flame size={18} />,
    pizzas: <Pizza size={18} />,
    cervezas: <Beer size={18} />,
    tragos: <Martini size={18} />,
  };

  return (
    <div className="section-padding bg-[var(--color-background)]">
      <div className="container-page">
        {/* Category Nav (desktop) — sticky pills */}
        <div className="hidden md:flex flex-wrap gap-2 mb-12 justify-center sticky top-20 z-30 py-3 bg-[var(--color-background)]/85 backdrop-blur-md rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCat(cat.id);
                document
                  .getElementById(cat.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`tap px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeCat === cat.id
                  ? "bg-gold text-[var(--color-primary-dark)] shadow-md shadow-[var(--color-accent)]/20"
                  : "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
              }`}
            >
              {catIcons[cat.id] && (
                <span className="inline-block mr-2 align-middle">
                  {catIcons[cat.id]}
                </span>
              )}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category sections */}
        <div className="space-y-10 md:space-y-14 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <section
              key={cat.id}
              id={cat.id}
              className="scroll-mt-nav"
            >
              {/* Mobile accordion header */}
              <button
                className="md:hidden tap w-full flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] mb-3 active:bg-[var(--color-surface-light)]"
                onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)}
                aria-expanded={openCat === cat.id || openCat === null}
              >
                <span className="flex items-center gap-2.5 font-semibold text-[var(--color-text)] text-base">
                  <span className="text-gold">{catIcons[cat.id]}</span>
                  {cat.name}
                </span>
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-200 ${
                    openCat === cat.id ? "rotate-180" : ""
                  } text-[var(--color-text-muted)]`}
                />
              </button>

              {/* Desktop heading */}
              <div className="hidden md:flex items-center gap-3 mb-6">
                <span className="text-gold">{catIcons[cat.id]}</span>
                <h2 className="text-2xl md:text-3xl font-[var(--font-heading)] font-bold text-[var(--color-text)] tracking-wide">
                  {cat.name}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent ml-4" />
              </div>

              <div className={`${openCat !== cat.id && openCat !== null ? "hidden" : "block"} md:block`}>
                {/* Table-style categories */}
                {cat.type === "table" && cat.columns && cat.rows ? (
                  <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[var(--color-surface-alt)]">
                          {cat.columns.map((col) => (
                            <th
                              key={col}
                              className="px-4 py-3 text-left text-[var(--color-text)] font-semibold whitespace-nowrap"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--color-border)]">
                        {cat.rows.map((row, i) => (
                          <tr
                            key={i}
                            className="hover:bg-[var(--color-surface-alt)]/50 transition-colors"
                          >
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className={`px-4 py-3 whitespace-nowrap ${
                                  j === 0
                                    ? "text-[var(--color-text)] font-medium"
                                    : cell
                                    ? "text-[var(--color-text-muted)]"
                                    : "text-[var(--color-text-muted)] opacity-40"
                                }`}
                              >
                                {cell || "—"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  /* List-style categories */
                  <div className="space-y-2">
                    {cat.items?.map((item) => (
                      <div
                        key={item.name}
                        className="p-4 md:p-4 rounded-lg bg-[var(--color-surface-alt)]/30 hover:bg-[var(--color-surface-alt)]/60 transition-colors border border-transparent hover:border-[var(--color-border)]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base font-semibold text-[var(--color-text)] leading-tight">
                            {item.name}
                          </h3>
                          <span className="text-sm md:text-base font-bold text-gold whitespace-nowrap shrink-0 mt-0.5">
                            {item.price}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-xs md:text-sm text-[var(--color-text-muted)] mt-1.5 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Notes */}
                {cat.notes && cat.notes.length > 0 && (
                  <div className="mt-4 p-4 rounded-lg bg-[var(--color-surface-alt)]/50 border border-[var(--color-border)]">
                    {cat.notes.map((note, i) => (
                      <p
                        key={i}
                        className="text-xs text-[var(--color-text-muted)] italic"
                      >
                        * {note}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 md:mt-16 text-center px-4 md:px-0">
          <p className="text-[var(--color-text-muted)] mb-5 text-sm md:text-base">
            ¿Listo para pedir?
          </p>
          <a
            href={`https://wa.me/${whatsapp}?text=Hola!%20Quiero%20hacer%20un%20pedido`}
            target="_blank"
            rel="noopener noreferrer"
            className="tap inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] active:scale-[0.98] text-white font-bold rounded-lg transition-all text-base shadow-lg shadow-[var(--color-primary)]/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            </svg>
            Pedí por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
