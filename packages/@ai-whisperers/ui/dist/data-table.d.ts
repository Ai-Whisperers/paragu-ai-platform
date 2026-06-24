interface Column<T> {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (item: T) => React.ReactNode;
    className?: string;
}
interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyExtractor: (item: T) => string;
    searchable?: boolean;
    searchKeys?: (keyof T)[];
    pageSize?: number;
    emptyMessage?: string;
    onRowClick?: (item: T) => void;
}
export declare function DataTable<T extends Record<string, any>>({ data, columns, keyExtractor, searchable, searchKeys, pageSize, emptyMessage, onRowClick, }: DataTableProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table.d.ts.map