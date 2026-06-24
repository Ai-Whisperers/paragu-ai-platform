interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}
interface Props {
    tabs: Tab[];
    defaultTab?: string;
}
export declare function ProductTabs({ tabs, defaultTab }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=product-tabs.d.ts.map