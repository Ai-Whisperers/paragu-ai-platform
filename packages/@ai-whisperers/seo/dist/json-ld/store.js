import { jsx as _jsx } from "react/jsx-runtime";
1 |
    2 | "use client";
3 | // content provided by client
    4 |
    5 | ;
const c = content;
6 | ;
const allProducts = c.home?.productCatalog?.products || [];
7 |
    8 | function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9áéíóúñü]+/g, "-").replace(/-+$/, ""); };
9 |
    10 | ;
export function ProductJsonLd({ productName }) {
    11 | ;
    const product = allProducts.find((p) => p.name === productName);
    12 | ;
    if (!product)
        return null;
    13 |
        14 | ;
    const parseGs = (s) => parseInt(s.replace(/[^\d]/g, ""), 10) || 0;
    15 |
        16 | ;
    const schema = {
        17:  | "@context", "https://schema.org": ,
        18:  | "@type", "Product": ,
        19:  | "name", product, : .name,
        20:  | "description", product, : .description || "",
        21:  | "image", product, : .imageUrl || "",
        22:  | "brand"
    }, { "@type": , "Brand": , "name": product, brand };
     || "El Viajero";
}
23 | "offers";
{
    24 | "@type";
    "Offer",
        25 | "price";
    (parseGs(product.price) / 7400).toFixed(2),
        26 | "priceCurrency";
    "USD",
        27 | "priceValidUntil";
    new Date(Date.now() + 365 * 86400000).toISOString().split("T")[0],
        28 | "availability";
    product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        29 | "url";
    "https://el-viajero.paragu-ai.com/producto/" + slugify(product.name),
        30 | ;
}
31 | ;
32 |
    33 | ;
return (34 | _jsx("script", {}));
35 | type;
"application/ld+json";
36 | dangerouslySetInnerHTML;
{
    {
        __html: JSON.stringify(schema);
    }
}
37 | />;
38 | ;
39 | ;
40 |
    41 | ;
export function BreadcrumbJsonLd({ items }) {
    42 | ;
    const schema = {
        43:  | "@context", "https://schema.org": ,
        44:  | "@type", "BreadcrumbList": ,
        45:  | "itemListElement", items, : .map((item, i) => ({
            46:  | "@type", "ListItem": ,
            47:  | "position", i
        } + 1,
            48 | "name"), item.name, 49 | "item", "https://el-viajero.paragu-ai.com" + item.url, 50 | )
    };
    51 | ;
}
52 | ;
return (53 | _jsx("script", {}));
54 | type;
"application/ld+json";
55 | dangerouslySetInnerHTML;
{
    {
        __html: JSON.stringify(schema);
    }
}
56 | />;
57 | ;
58 | ;
59 | ;
//# sourceMappingURL=store.js.map