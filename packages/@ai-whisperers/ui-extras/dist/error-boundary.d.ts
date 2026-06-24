import { Component, ReactNode } from 'react';
interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}
interface State {
    hasError: boolean;
}
export declare class ErrorBoundary extends Component<Props, State> {
    state: {
        hasError: boolean;
    };
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    render(): string | number | boolean | Iterable<ReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
}
export {};
//# sourceMappingURL=error-boundary.d.ts.map