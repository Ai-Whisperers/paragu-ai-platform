"use client";
import { jsx as _jsx } from "react/jsx-runtime";
export function CategoryBreadcrumbJsonLd({ category, name }) {
    return (_jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://el-viajero.paragu-ai.com/" },
                    { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://el-viajero.paragu-ai.com/tienda" },
                    { "@type": "ListItem", "position": 3, "name": name, "item": "https://el-viajero.paragu-ai.com/categoria/" + category },
                ]
            }) } }));
}
//# sourceMappingURL=category-breadcrumb-jsonld.js.map