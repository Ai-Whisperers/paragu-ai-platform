"use client"
import { Suspense } from "react"
import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import content from "@/content/es.json"
import { ProductCard } from "@/components/product-card"
import { EmptyState } from "@/components/empty-state"
import Link from "next/link"
const _c = content as any

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc" | "rating"
type ViewMode = "grid" | "list"

const SORT_LABELS: Record<SortOption, string> = {
  "default": "Ordenar",
  "price-asc": "Menor precio",
  "price-desc": "Mayor precio",
  "name-asc": "A-Z",
  "name-desc": "Z-A",
  "rating": "Mejor valorados",
}

const LEVELS = ["beginner", "intermediate", "advanced"] as const
const LEVEL_LABELS: Record<string, string> = { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" }
const ITEMS_PER_PAGE = 12

const QUICK_TAGS: {label: string; filter: any}[] = []

function TiendaInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const catParam = searchParams.get("cat")
  const queryParam = searchParams.get("q")
  const sortParam = searchParams.get("sort") as SortOption | null
  const pageParam = searchParams.get("page")

  const [selectedCat, setSelectedCat] = useState<string | null>(catParam)
  const [searchQuery, setSearchQuery] = useState(queryParam || "")
  const [sort, setSort] = useState<SortOption>(sortParam || "default")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000])
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [onlyNew, setOnlyNew] = useState(false)
  const [onlyFeatured, setOnlyFeatured] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showCategories, setShowCategories] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [page, setPage] = useState(Number(pageParam) || 1)

  useEffect(() => { if (catParam) setSelectedCat(catParam) }, [catParam])
  useEffect(() => { setPage(1) }, [selectedCat, searchQuery, levelFilter, onlyNew, onlyFeatured, priceRange])

  // URL sync
  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCat) params.set("cat", selectedCat)
    if (searchQuery) params.set("q", searchQuery)
    if (sort !== "default") params.set("sort", sort)
    if (page > 1) params.set("page", String(page))
    const qs = params.toString()
    router.replace(qs ? `/tienda?${qs}` : "/tienda", { scroll: false })
  }, [selectedCat, searchQuery, sort, page])

  const allProducts = content.products || []
  const maxPrice = Math.max(...allProducts.map(p => Number(p.price) || 0), 500000)

  const filtered = useMemo(() => {
    let result = [...allProducts]
    if (selectedCat) result = result.filter(p => p.category === selectedCat)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.line || "").toLowerCase().includes(q)
      )
    }
    result = result.filter(p => Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1])
    if (onlyNew) result = result.filter(p => (p as any).new)
    if (onlyFeatured) result = result.filter(p => (p as any).featured)
    switch (sort) {
      case "price-asc": result.sort((a, b) => Number(a.price) - Number(b.price)); break
      case "price-desc": result.sort((a, b) => Number(b.price) - Number(a.price)); break
      case "name-asc": result.sort((a, b) => a.name.localeCompare(b.name)); break
      case "name-desc": result.sort((a, b) => b.name.localeCompare(a.name)); break
      case "rating": result.sort((a, b) => Number((b as any).rating || 0) - Number((a as any).rating || 0)); break
    }
    return result
  }, [selectedCat, searchQuery, sort, priceRange, levelFilter, onlyNew, onlyFeatured, allProducts])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  const resultCount = filtered.length
  const activeFilters = [selectedCat ? 1 : 0, levelFilter !== "all" ? 1 : 0, onlyNew ? 1 : 0, onlyFeatured ? 1 : 0].reduce((a, b) => a + b, 0)

  // Quick tag click handler
  const applyTag = (tag: typeof QUICK_TAGS[0]) => {
    const f = tag.filter
    if (f.type === "level") { setLevelFilter(f.value as string); setSelectedCat(null); setOnlyNew(false); setOnlyFeatured(false) }
    else if (f.type === "cat") { setSelectedCat(f.value as string); setLevelFilter("all"); setOnlyNew(false); setOnlyFeatured(false) }
    else if (f.type === "new") { setOnlyNew(!onlyNew); setSelectedCat(null); setLevelFilter("all"); setOnlyFeatured(false) }
  }

  // Mobile filter as bottom drawer
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const FilterContent = () => (
    <>
      {/* Search */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Buscar</label>
        <input type="text" value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setSelectedCat(null) }}
          placeholder="Nombre, material..."
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
        />
      </div>

      {/* Categories */}
      <div>
        <button onClick={() => setShowCategories(!showCategories)}
          className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Categorías
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`transition-transform ${showCategories ? "rotate-180" : ""}`}>
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
        {showCategories && (
          <div className="space-y-1">
            <button onClick={() => setSelectedCat(null)}
              className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                !selectedCat ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"
              }`}>Todos</button>
            {content.categories.map(cat => (
              <button key={cat.id} onClick={() => setSelectedCat(cat.id)}
                className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedCat === cat.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                }`}>
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price range */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
          Hasta Gs. {priceRange[1].toLocaleString("es-PY")}
        </label>
        <input type="range" min={0} max={maxPrice} step={5000}
          value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-primary" />
      </div>

      {/* Level */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Nivel</label>
        <div className="space-y-1">
          <button onClick={() => setLevelFilter("all")}
            className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
              levelFilter === "all" ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"
            }`}>Todos</button>
          {LEVELS.map(l => (
            <button key={l} onClick={() => setLevelFilter(l)}
              className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                levelFilter === l ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"
              }`}>
              {l === "beginner" ? "🌱" : l === "intermediate" ? "⭐" : "🔥"} {LEVEL_LABELS[l]}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={onlyNew} onChange={e => setOnlyNew(e.target.checked)}
            className="rounded border-border accent-primary" />
          <span className="text-sm text-foreground">Novedades</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={onlyFeatured} onChange={e => setOnlyFeatured(e.target.checked)}
            className="rounded border-border accent-primary" />
          <span className="text-sm text-foreground">Destacados</span>
        </label>
      </div>

      {/* Clear all */}
      <button onClick={() => { setSelectedCat(null); setSearchQuery(""); setSort("default"); setPriceRange([0, maxPrice]); setLevelFilter("all"); setOnlyNew(false); setOnlyFeatured(false); setPage(1) }}
        className="w-full rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        Limpiar filtros
      </button>
    </>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Tienda</h1>
          <p className="text-muted-foreground text-sm">{resultCount} producto{resultCount !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="hidden sm:flex border border-border rounded-lg overflow-hidden">
            <button onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              title="Cuadrícula">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
            </button>
            <button onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              title="Lista">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Sort */}
          <select value={sort} onChange={e => setSort(e.target.value as SortOption)}
            className="rounded-lg border border-input bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-ring">
            {Object.entries(SORT_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>

          {/* Filter button (desktop) */}
          <button onClick={() => setShowFilters(!showFilters)}
            className={`hidden sm:flex relative items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              showFilters || activeFilters > 0
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
            </svg>
            Filtros
            {activeFilters > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>

          {/* Filter button (mobile) */}
          <button onClick={() => setMobileFilterOpen(true)}
            className={`sm:hidden relative flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              activeFilters > 0
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
            </svg>
            {activeFilters > 0 && (
              <span className="bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1">{activeFilters}</span>
            )}
          </button>
        </div>
      </div>

      {/* Quick filter tags */}
      <div className="flex gap-2 flex-wrap mb-4 overflow-x-auto pb-1">
        {QUICK_TAGS.map((tag, i) => (
          <button key={i} onClick={() => applyTag(tag)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              (tag.filter.type === "level" && levelFilter === tag.filter.value) ||
              (tag.filter.type === "cat" && selectedCat === tag.filter.value) ||
              (tag.filter.type === "new" && onlyNew)
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}>
            {tag.label}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        {showFilters && (
          <aside className="hidden sm:block w-64 shrink-0 space-y-5 sticky top-20 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
            <FilterContent />
          </aside>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Active filter chips */}
          {(selectedCat || levelFilter !== "all" || onlyNew || onlyFeatured) && (
            <div className="flex gap-2 flex-wrap mb-4">
              {selectedCat && (
                <button onClick={() => setSelectedCat(null)}
                  className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
                  {content.categories.find(c => c.id === selectedCat)?.name || selectedCat} <span>✕</span>
                </button>
              )}
              {levelFilter !== "all" && (
                <button onClick={() => setLevelFilter("all")}
                  className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
                  {LEVEL_LABELS[levelFilter]} <span>✕</span>
                </button>
              )}
              {onlyNew && (
                <button onClick={() => setOnlyNew(false)}
                  className="flex items-center gap-1 bg-accent/10 text-accent text-xs font-medium px-2.5 py-1 rounded-full">
                  Nuevo <span>✕</span>
                </button>
              )}
              {onlyFeatured && (
                <button onClick={() => setOnlyFeatured(false)}
                  className="flex items-center gap-1 bg-accent/10 text-accent text-xs font-medium px-2.5 py-1 rounded-full">
                  Destacado <span>✕</span>
                </button>
              )}
            </div>
          )}

          <p className="text-xs text-muted-foreground mb-4 sm:hidden">{resultCount} resultado{resultCount !== 1 ? "s" : ""}</p>

          {/* Products */}
          {viewMode === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paged.map((p: any) => <ProductCard key={p.slug || p.name} {...p} />)}
            </div>
          ) : (
            <div className="space-y-4">
              {paged.map((p: any) => (
                <div key={p.slug || p.name} className="flex gap-4 rounded-xl border border-border bg-surface p-4 items-center">
                  <div className="w-20 h-20 shrink-0 bg-gradient-to-br from-surface-light to-surface rounded-lg flex items-center justify-center">
                    <span className="text-2xl opacity-20">✦</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/producto/${p.slug}`} className="text-sm font-semibold text-foreground hover:text-primary line-clamp-1">{p.name}</Link>
                    <p className="text-xs text-muted-foreground line-clamp-1">{p.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-primary">Gs. {p.price.toLocaleString("es-PY")}</span>
                      {p.rating && <span className="text-warning text-[10px]">{Array.from({ length: p.rating }).map((_, i) => <span key={i}>★</span>)}</span>}
                      {p.new && <span className="bg-accent/10 text-accent text-[10px] font-medium px-1.5 py-0.5 rounded">Nuevo</span>}
                    </div>
                  </div>
                  <a href={`https://wa.me/595981234567?text=${encodeURIComponent(`¡Hola! Quiero: ${p.name}`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="shrink-0 bg-[#25D366] text-white px-3 py-2 rounded-lg text-xs font-semibold no-underline hover:bg-[#20BD5A] whitespace-nowrap">
                    WhatsApp
                  </a>
                </div>
              ))}
            </div>
          )}

          {paged.length === 0 && <EmptyState />}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
                className="px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed">
                ← Anterior
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    page === i + 1
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:text-foreground"
                  }`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
                className="px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed">
                Siguiente →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[9999] sm:hidden" onClick={() => setMobileFilterOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Filtros</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="text-muted-foreground hover:text-foreground text-lg">✕</button>
            </div>
            <div className="space-y-5">
              <FilterContent />
            </div>
            <button onClick={() => setMobileFilterOpen(false)}
              className="w-full mt-5 bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm">
              Ver {resultCount} resultado{resultCount !== 1 ? "s" : ""}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Tienda() {
  return <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Cargando...</div>}><TiendaInner /></Suspense>
}
