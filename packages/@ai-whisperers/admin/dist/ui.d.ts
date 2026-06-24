import React from "react";
export declare function StatCard({ label, value, sub, icon, color, }: {
    label: string;
    value: string;
    sub?: string;
    icon?: React.ReactNode;
    color?: "emerald" | "blue" | "amber" | "purple" | "red";
}): import("react/jsx-runtime").JSX.Element;
export declare function EmptyState({ icon, title, description, actions, }: {
    icon: React.ReactNode;
    title: string;
    description?: string;
    actions?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function CardSkeleton({ count }: {
    count?: number;
}): import("react/jsx-runtime").JSX.Element;
export declare function TableSkeleton({ rows, cols }: {
    rows?: number;
    cols?: number;
}): import("react/jsx-runtime").JSX.Element;
export declare function StatsGridSkeleton({ count }: {
    count?: number;
}): import("react/jsx-runtime").JSX.Element;
export declare function FilterBar({ options, active, onChange, counts, }: {
    options: {
        key: string;
        label: string;
        icon?: string;
    }[];
    active: string;
    onChange: (key: string) => void;
    counts?: Record<string, number>;
}): import("react/jsx-runtime").JSX.Element;
export declare function SearchInput({ value, onChange, placeholder, }: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function PageHeader({ title, subtitle, actions, }: {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function Badge({ status, children }: {
    status: string;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function StatusSelect({ value, onChange, options, disabled, }: {
    value: string;
    onChange: (v: string) => void;
    options: {
        key: string;
        label: string;
        icon?: string;
    }[];
    disabled?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export declare function SummaryBar({ items }: {
    items: {
        label: string;
        value: string;
        color?: string;
    }[];
}): import("react/jsx-runtime").JSX.Element;
export declare function OrderCard({ order, onStatusChange, onNoteToggle, noteInput, noteText, onNoteChange, onNoteSave, onNoteClose, }: {
    order: any;
    onStatusChange: (id: string, status: string) => void;
    onNoteToggle: (id: string) => void;
    noteInput: string | null;
    noteText: string;
    onNoteChange: (v: string) => void;
    onNoteSave: (id: string) => void;
    onNoteClose: () => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function DataTable({ headers, children, }: {
    headers: {
        key: string;
        label: string;
        className?: string;
    }[];
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ui.d.ts.map