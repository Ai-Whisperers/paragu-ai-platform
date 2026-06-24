"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Image from "next/image";
export function ImageGallery({ images, productName, isNew, hasDiscount }) {
    const [selected, setSelected] = useState(0);
    const [zoomed, setZoomed] = useState(false);
    if (!images.length)
        return (_jsx("div", { className: "flex aspect-square items-center justify-center rounded-2xl border border-border bg-muted", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "64", height: "64", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1", className: "text-muted-foreground/30", children: [_jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }), _jsx("circle", { cx: "8.5", cy: "8.5", r: "1.5" }), _jsx("path", { d: "M21 15l-5-5L5 21" })] }) }));
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface cursor-crosshair", onMouseEnter: () => setZoomed(true), onMouseLeave: () => setZoomed(false), children: [_jsx(Image, { src: images[selected], alt: productName, fill: true, className: "object-contain p-8 transition-transform duration-300 " + (zoomed ? "scale-150" : "scale-100"), priority: true }), isNew && _jsx("span", { className: "absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground", children: "NUEVO" }), hasDiscount && _jsx("span", { className: "absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground", children: "OFERTA" })] }), images.length > 1 && (_jsx("div", { className: "flex gap-3 overflow-x-auto pb-2", children: images.map((src, i) => (_jsx("button", { onClick: () => setSelected(i), className: "h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all " + (i === selected ? "border-primary" : "border-border"), "aria-label": "Ver imagen " + (i + 1), children: _jsx(Image, { src: src, alt: "", width: 64, height: 64, className: "h-full w-full object-contain p-1" }) }, i))) }))] }));
}
//# sourceMappingURL=image-gallery.js.map