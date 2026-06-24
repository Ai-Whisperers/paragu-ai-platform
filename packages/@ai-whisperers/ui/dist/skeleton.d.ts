import { type VariantProps } from "class-variance-authority";
declare const skeletonVariants: (props?: ({
    variant?: "default" | "text" | "circle" | "image" | "avatar" | "card" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
    rows?: number;
}
export declare function Skeleton({ className, variant, rows, ...props }: SkeletonProps): import("react/jsx-runtime").JSX.Element;
export declare function SkeletonText({ lines, className }: {
    lines?: number;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function SkeletonTableRow({ columns }: {
    columns?: number;
}): import("react/jsx-runtime").JSX.Element;
export declare function SkeletonCard({ hasImage }: {
    hasImage?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=skeleton.d.ts.map