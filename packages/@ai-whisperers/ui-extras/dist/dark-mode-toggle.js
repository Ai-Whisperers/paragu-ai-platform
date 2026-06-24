"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
export function DarkModeToggle() {
    const [dark, setDark] = useState(false);
    useEffect(() => {
        const saved = localStorage.getItem("viajero-dark-mode");
        if (saved === "true") {
            setDark(true);
            document.documentElement.classList.add("dark");
        }
    }, []);
    const toggle = () => {
        const next = !dark;
        setDark(next);
        localStorage.setItem("viajero-dark-mode", next.toString());
        document.documentElement.classList.toggle("dark", next);
    };
    return (_jsx("button", { onClick: toggle, className: "flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-all hover:bg-surface-light", "aria-label": dark ? "Modo claro" : "Modo oscuro", children: dark ? (_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "12", cy: "12", r: "5" }), _jsx("path", { d: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" })] })) : (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" }) })) }));
}
//# sourceMappingURL=dark-mode-toggle.js.map