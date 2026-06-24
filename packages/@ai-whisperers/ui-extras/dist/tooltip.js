"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export function Tooltip({ text, children }) {
    const [show, setShow] = useState(false);
    return (_jsxs("div", { className: "relative inline-flex", onMouseEnter: () => setShow(true), onMouseLeave: () => setShow(false), children: [children, show && (_jsxs("div", { className: "absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs text-background shadow-lg", children: [text, _jsx("div", { className: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" })] }))] }));
}
//# sourceMappingURL=tooltip.js.map