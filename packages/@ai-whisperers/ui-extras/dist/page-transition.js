"use client";
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
// framer-motion not available; using CSS animations
const motion = { div: (p) => _jsx("div", { ...p }) };
const AnimatePresence = ({ children }) => _jsx(_Fragment, { children: children });
import { usePathname } from "next/navigation";
export function PageTransition({ children }) {
    const pathname = usePathname();
    return (_jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 }, children: children }, pathname) }));
}
//# sourceMappingURL=page-transition.js.map