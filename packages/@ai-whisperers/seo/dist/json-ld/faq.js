import { jsx as _jsx } from "react/jsx-runtime";
1 |
    2 | "use client";
3 | // content provided by client
    4 |
    5 | ;
const c = content;
6 | ;
const faqItems = c.faq?.items || [];
7 |
    8 | ;
export function FaqJsonLd() {
    9 | ;
    if (!faqItems.length)
        return null;
    10 | ;
    const schema = {
        11:  | "@context", "https://schema.org": ,
        12:  | "@type", "FAQPage": ,
        13:  | "mainEntity", faqItems, : .map((item) => ({
            14:  | "@type", "Question": ,
            15:  | "name", item, : .question,
            16:  | "acceptedAnswer"
        }), { "@type": "Answer", "text": item.answer }, 17 | )
    };
    18 | ;
}
19 | ;
return (20 | _jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify(schema) } }));
21 | ;
22 | ;
23 | ;
//# sourceMappingURL=faq.js.map