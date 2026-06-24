interface GAConfig {
    enabled?: boolean;
    measurementId?: string;
}
declare global {
    interface Window {
        dataLayer?: any[];
        gtag?: (...args: any[]) => void;
    }
}
export declare function AnalyticsProvider({ children, config }: {
    children: React.ReactNode;
    config?: GAConfig;
}): import("react/jsx-runtime").JSX.Element;
export declare function trackWhatsAppClick(label?: string): void;
export declare function trackAddToCart(productName: string, price: number, quantity: number): void;
export declare function trackBeginCheckout(total: number): void;
export {};
//# sourceMappingURL=analytics.d.ts.map