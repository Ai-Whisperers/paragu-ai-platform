import { jsx as _jsx } from "react/jsx-runtime";
1 |
    2 | "use client";
3 | ;
export function ArticleJsonLd({ title, description, image, date, author }) {
    4 | ;
    return (5 | _jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify({
                6:  | "@context", "https://schema.org": ,
                7:  | "@type", "Article": ,
                8:  | "headline", title,
                9:  | "description", description,
                10:  | "image", image
            } || "", 11 | "datePublished", date, 12 | "author", { "@type": "Person", "name": author || "El Viajero" }, 13 | ) } }));
}
/>;
14 | ;
15 | ;
16 | ;
//# sourceMappingURL=article.js.map