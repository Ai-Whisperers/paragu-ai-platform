"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import Image from "next/image";
export function ImageMagnifier({ src, alt }) {
    const [show, setShow] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const ref = useRef(null);
    const handleMouse = (e) => {
        if (!ref.current)
            return;
        const rect = ref.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setPos({ x, y });
    };
    return (_jsxs("div", { ref: ref, className: "relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface cursor-crosshair", onMouseEnter: () => setShow(true), onMouseLeave: () => setShow(false), onMouseMove: handleMouse, children: [_jsx(Image, { src: src, alt: alt, fill: true, className: "object-contain p-8", priority: true }), show && (_jsx("div", { className: "pointer-events-none absolute inset-0", style: {
                    background: `url(${src}) no-repeat`,
                    backgroundSize: "250%",
                    backgroundPosition: `${pos.x}% ${pos.y}%`,
                } }))] }));
}
//# sourceMappingURL=image-magnifier.js.map