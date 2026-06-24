import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const toastVariants: (props?: ({
    variant?: "default" | "success" | "warning" | "info" | "error" | null | undefined;
    position?: "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
    title?: string;
    description?: string;
    onClose?: () => void;
    duration?: number;
    icon?: React.ReactNode;
}
export declare function Toast({ className, variant, position, title, description, onClose, duration, icon, ...props }: ToastProps): import("react/jsx-runtime").JSX.Element;
interface ToastContainerProps {
    children: React.ReactNode;
    position?: "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";
}
export declare function ToastContainer({ children, position }: ToastContainerProps): import("react/jsx-runtime").JSX.Element;
export declare function useToast(): {
    toasts: {
        id: string;
        props: ToastProps;
    }[];
    addToast: (props: Omit<ToastProps, "onClose">) => string;
    removeToast: (id: string) => void;
    clearToasts: () => void;
};
export {};
//# sourceMappingURL=toast.d.ts.map