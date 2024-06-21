import { Column, SortingRule } from 'react-table';
import { HTMLAttributes, ReactElement } from 'react';
export interface TableProps<T extends Record<string, unknown> = Record<string, unknown> & {
    id: string;
}> {
    /** Definition of the table columns */
    columns: Array<Column<T> & {
        Loader?: () => ReactElement;
    }>;
    /** Data to be displayed in the table */
    data: Array<T>;
    /** If `true`, the table will have clickable rows */
    rowClickable?: boolean;
    /** Callback called when a row is clicked */
    onRowClick?: (row: T) => void;
    /** Active row ids */
    activeRowIds?: Record<string, boolean>;
    /** If `true`, the table will have selectable rows with a checkbox */
    rowsSelectable?: boolean;
    /** Selected row ids */
    selectedRowIds?: Record<string, boolean>;
    /** Callback called when row selection changes */
    onRowSelectionChange?: (selectedRowIds: Record<string, boolean>) => void;
    /** If `true`, the table will be displayed in a loading state */
    loading?: boolean;
    manualSorting?: boolean;
    /** Initial sorting rules */
    initialSortBy?: {
        id: string;
        desc?: boolean;
    };
    /** If `true`, the table pagination will be controlled by the parent */
    manualPagination?: boolean;
    /** Used if manualPagination is `true`. The total count of items in the table */
    totalCount?: number;
    /** Used if manualPagination is `true`. The total count of pages in the table */
    pageCount?: number;
    /** Initial page size */
    initialPageSize?: number;
    /** Initial page index */
    initialPageIndex?: number;
    /** If true removes pagination and do querys when scroll */
    infiniteScroll?: boolean;
    /** Callback called when pagination or sorting changes */
    onTableChange?: ({ pageIndex, pageSize, sortBy, }: {
        pageIndex: number;
        pageSize: number;
        sortBy?: SortingRule<string>;
    }) => void;
    className?: HTMLAttributes<HTMLDivElement>['className'];
    style?: HTMLAttributes<HTMLDivElement>['style'];
    uniqueFieldKey?: keyof T;
}
declare function Table<T extends Record<string, unknown> = Record<string, unknown> & {
    id: string;
}>({ columns, data, loading, rowClickable, onRowClick, activeRowIds, rowsSelectable, selectedRowIds: controlledSelectedRowIds, onRowSelectionChange, manualSorting, initialSortBy, manualPagination, pageCount: controlledPageCount, totalCount: controlledTotalCount, initialPageSize, initialPageIndex, infiniteScroll, onTableChange, className, style, uniqueFieldKey, }: TableProps<T>): import("react").JSX.Element;
declare const _default: typeof Table;
export default _default;
