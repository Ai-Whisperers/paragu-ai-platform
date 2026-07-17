import { type Locale, type SiteConfig } from "./alternates.js";
export interface OpenGraphLocaleMap {
    [locale: string]: string;
}
export interface BuildMetadataInput {
    slug: string;
    title: string;
    description: string;
    locale: Locale;
    ogImage?: string;
    ogType?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
}
export interface BuildMetadataConfig extends SiteConfig {
    siteName: string;
    ogLocaleMap?: OpenGraphLocaleMap;
    defaultOgImage?: string;
    ogImagePathPrefix?: string;
}
export declare function buildMetadata(input: BuildMetadataInput, config: BuildMetadataConfig): {
    title: string;
    description: string;
    alternates: import("./alternates.js").AlternatesResult;
    openGraph: {
        authors?: string[] | undefined;
        modifiedTime?: string | undefined;
        publishedTime?: string | undefined;
        type: "website" | "article";
        locale: string;
        url: string;
        siteName: string;
        title: string;
        description: string;
        images: {
            url: string;
            width: number;
            height: number;
            alt: string;
        }[];
    };
    twitter: {
        card: "summary_large_image";
        title: string;
        description: string;
        images: string[];
    };
    robots: {
        index: boolean;
        follow: boolean;
        googleBot: {
            index: boolean;
            follow: boolean;
            "max-image-preview": "large";
            "max-snippet": number;
        };
    };
};
export declare function resolveSiteUrl(envVarName: string, fallback: string): string;
//# sourceMappingURL=metadata.d.ts.map