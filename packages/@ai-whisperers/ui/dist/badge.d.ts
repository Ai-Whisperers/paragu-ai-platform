import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const filterBadgeVariants: (props?: ({
    variant?: "default" | "secondary" | "outline" | "muted" | "success" | "destructive" | "warning" | "info" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface FilterBadgeProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onChange">, VariantProps<typeof filterBadgeVariants> {
    label: string;
    value: string;
    isActive?: boolean;
    onChange?: (value: string, isActive: boolean) => void;
    onRemove?: (value: string) => void;
    removable?: boolean;
    count?: number;
}
export declare function FilterBadge({ className, variant, size, label, value, isActive, onChange, onRemove, removable, count, ...props }: FilterBadgeProps): import("react/jsx-runtime").JSX.Element;
export interface FilterBadgeGroupProps {
    options: Array<{
        label: string;
        value: string;
        count?: number;
    }>;
    activeValues: string[];
    onChange: (values: string[]) => void;
    variant?: "default" | "outline" | "muted";
    size?: "sm" | "md" | "lg";
    multiple?: boolean;
    className?: string;
}
export declare function FilterBadgeGroup({ options, activeValues, onChange, variant, size, multiple, className, }: FilterBadgeGroupProps): import("react/jsx-runtime").JSX.Element;
declare const legacyBadgeVariants: (props?: ({
    variant?: "default" | "secondary" | "outline" | "muted" | "success" | "destructive" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof legacyBadgeVariants> {
}
export declare function Badge({ className, variant, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=badge.d.ts.map