type ToastType = "success" | "error" | "info";
interface ToastCtx {
    toast: (msg: string, type?: ToastType) => void;
}
export declare function useToast(): ToastCtx;
export declare function ToastProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=toast.d.ts.map