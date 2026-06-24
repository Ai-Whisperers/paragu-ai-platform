"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "next/image";
import { useState } from "react";
export function SafeImage({ src, alt, width = 400, height = 300, fill, className = "", containerClassName = "", priority = false }) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    if (!src || error) {
        return (_jsx("div", { className: "flex items-center justify-center bg-muted " + containerClassName, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1", className: "text-muted-foreground/40", children: [_jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }), _jsx("circle", { cx: "8.5", cy: "8.5", r: "1.5" }), _jsx("path", { d: "M21 15l-5-5L5 21" })] }) }));
    }
    return (_jsxs("div", { className: "relative overflow-hidden " + containerClassName, children: [!loaded && _jsx("div", { className: "absolute inset-0 animate-shimmer bg-muted" }), _jsx(Image, { src: src, alt: alt, width: fill ? undefined : width, height: fill ? undefined : height, fill: fill, className: "transition-opacity duration-300 " + (loaded ? "opacity-100" : "opacity-0") + " " + className, onLoad: () => setLoaded(true), onError: () => setError(true), priority: priority })] }));
}
//# sourceMappingURL=safe-image.js.map