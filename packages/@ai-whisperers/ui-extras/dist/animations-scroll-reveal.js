"use client";
import { jsx as _jsx } from "react/jsx-runtime";
// framer-motion not available; using CSS animations
const motion = { div: (p) => _jsx("div", { ...p }), span: (p) => _jsx("span", { ...p }) };
export function FadeUp({ children, className, delay = 0 }) {
    return (_jsx(motion.div, { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.6, delay, ease: "easeOut" }, className: className, children: children }));
}
export function FadeIn({ children, className, delay = 0 }) {
    return (_jsx(motion.div, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.5, delay }, className: className, children: children }));
}
export function StaggerGrid({ children, className }) {
    return (_jsx(motion.div, { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-50px" }, variants: { visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }, className: className, children: children }));
}
export function StaggerItem({ children, className }) {
    return (_jsx(motion.div, { variants: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }, transition: { duration: 0.4 }, className: className, children: children }));
}
export function ScaleOnHover({ children, className }) {
    return (_jsx(motion.div, { whileHover: { scale: 1.03 }, transition: { type: "spring", stiffness: 300 }, className: className, children: children }));
}
export function PulseBadge({ children }) {
    return (_jsx(motion.span, { animate: { scale: [1, 1.1, 1] }, transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }, className: "inline-block", children: children }));
}
//# sourceMappingURL=animations-scroll-reveal.js.map