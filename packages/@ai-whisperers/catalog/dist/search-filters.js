"use client";
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
// ProductModal provided by consumer
const ProductModal = ({ product }) => _jsx(_Fragment, {}); // consumer provides
const c = {}; // consumer provides locale data
export function SearchAndFilters({ products, categories, onFilteredProducts, }) {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [stockFilter, setStockFilter] = useState("");
    const [brandFilter, setBrandFilter] = useState("");
    const [pricePreset, setPricePreset] = useState("");
    const parseGs = (s) => parseInt(s.replace(/[^\d]/g, ""), 10) || 0;
    // Get unique brands
    const brands = [...new Set(products.map((p) => p.brand || "").filter(Boolean))].sort();
    const filtered = useMemo(() => {
        let result = [...products];
        if (search) {
            const q = search.toLowerCase();
            result = result.filter((p) => p.name.toLowerCase().includes(q) ||
                (p.brand || "").toLowerCase().includes(q) ||
                (p.description || "").toLowerCase().includes(q) ||
                (p.specs || "").toLowerCase().includes(q));
        }
        if (categoryFilter) {
            result = result.filter((p) => p.category === categoryFilter);
        }
        if (brandFilter) {
            result = result.filter((p) => p.brand === brandFilter);
        }
        // Price presets override manual inputs
        if (pricePreset) {
            const [min, max] = pricePreset.split("-").map(Number);
            result = result.filter((p) => {
                const price = parseGs(p.price);
                return price >= (min || 0) && (max ? price <= max : true);
            });
        }
        else {
            if (priceMin) {
                const min = parseGs(priceMin);
                result = result.filter((p) => parseGs(p.price) >= min);
            }
            if (priceMax) {
                const max = parseGs(priceMax);
                result = result.filter((p) => parseGs(p.price) <= max);
            }
        }
        if (stockFilter === "in_stock") {
            result = result.filter((p) => (p.stock ?? 0) > 0);
        }
        else if (stockFilter === "low_stock") {
            result = result.filter((p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) <= 5);
        }
        else if (stockFilter === "out_of_stock") {
            result = result.filter((p) => (p.stock ?? 0) === 0);
        }
        if (sortBy === "price_asc") {
            result.sort((a, b) => parseGs(a.price) - parseGs(b.price));
        }
        else if (sortBy === "price_desc") {
            result.sort((a, b) => parseGs(b.price) - parseGs(a.price));
        }
        else if (sortBy === "name") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }
        return result;
    }, [search, categoryFilter, sortBy, priceMin, priceMax, stockFilter, products]);
    // Return filtered products to parent
    if (typeof onFilteredProducts === "function") {
        // We call it via setTimeout to avoid re-render loops
        setTimeout(() => onFilteredProducts(filtered), 0);
    }
    return (_jsxs("div", { className: "mb-8 rounded-xl border border-border bg-surface p-4 shadow-sm", children: [_jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-6", children: [_jsxs("div", { className: "lg:col-span-2", children: [_jsx("label", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: "Buscar" }), _jsx("input", { type: "text", placeholder: "Busc\u00E1 por producto, marca...", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-ring" })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: "Categor\u00EDa" }), _jsxs("select", { value: categoryFilter, onChange: (e) => setCategoryFilter(e.target.value), className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-ring", children: [_jsx("option", { value: "", children: "Todas" }), categories.map((cat) => (_jsx("option", { value: cat, children: cat }, cat)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: "Ordenar" }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-ring", children: [_jsx("option", { value: "", children: "Por defecto" }), _jsx("option", { value: "price_asc", children: "Menor precio" }), _jsx("option", { value: "price_desc", children: "Mayor precio" }), _jsx("option", { value: "name", children: "A-Z" })] })] }), brands.length > 0 && (_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: "Marca" }), _jsxs("select", { value: brandFilter, onChange: e => setBrandFilter(e.target.value), className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-ring", children: [_jsx("option", { value: "", children: "Todas" }), brands.map(b => _jsx("option", { value: b, children: b }, b))] })] })), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: "Disponibilidad" }), _jsxs("select", { value: stockFilter, onChange: (e) => setStockFilter(e.target.value), className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-ring", children: [_jsx("option", { value: "", children: "Todos" }), _jsx("option", { value: "in_stock", children: "En stock" }), _jsx("option", { value: "low_stock", children: "Pocas unidades (\u22645)" }), _jsx("option", { value: "out_of_stock", children: "Agotado" })] })] }), _jsx("div", { className: "flex items-end justify-end", children: _jsxs("p", { className: "text-xs text-muted-foreground", children: [filtered.length, " de ", products.length, " productos"] }) })] }), _jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [_jsx("span", { className: "text-xs text-muted-foreground self-center mr-1", children: "Precio:" }), [
                        { label: "Hasta Gs. 50mil", value: "0-50000" },
                        { label: "Gs. 50mil-150mil", value: "50000-150000" },
                        { label: "Gs. 150mil-300mil", value: "150000-300000" },
                        { label: "Más de Gs. 300mil", value: "300000-0" },
                    ].map((preset) => (_jsx("button", { onClick: () => {
                            setPricePreset(pricePreset === preset.value ? "" : preset.value);
                        }, className: `rounded-full border px-3 py-1 text-xs font-medium transition-all ${pricePreset === preset.value
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border bg-white text-muted-foreground hover:bg-surface"}`, children: preset.label }, preset.value))), pricePreset && (_jsx("button", { onClick: () => setPricePreset(""), className: "text-xs text-muted-foreground hover:text-foreground underline", children: "Limpiar" }))] })] }));
}
//# sourceMappingURL=search-filters.js.map