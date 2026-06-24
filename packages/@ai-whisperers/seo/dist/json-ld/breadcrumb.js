import { jsx as _jsx } from "react/jsx-runtime";
1 |
    2 | "use client";
3 | ;
export function CategoryBreadcrumbJsonLd({ category, name }) {
    4 | ;
    return (5 | _jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify({
                6:  | "@context", "https://schema.org": ,
                7:  | "@type", "BreadcrumbList": ,
                8:  | "itemListElement", [9 | { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://el-viajero.paragu-ai.com/" },
                    10 | { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://el-viajero.paragu-ai.com/tienda" },
                    11 | { "@type": "ListItem", "position": 3, "name": name, "item": "https://el-viajero.paragu-ai.com/categoria/" + category },
                    12 | ]: 13 | 
            }) } }));
    14 | ;
    15 | ;
}
16 | ;
//# sourceMappingURL=breadcrumb.js.map