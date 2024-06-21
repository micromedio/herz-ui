/** @jsxImportSource theme-ui */
import React, { HTMLAttributes } from 'react';
export interface TableFiltersProps {
    children: React.ReactNode;
}
declare const TableFilters: {
    ({ children }: TableFiltersProps): React.JSX.Element;
    Item: ({ label, children, className, minWidth, grows, }: {
        label?: string;
        children?: React.ReactNode;
        className?: HTMLAttributes<HTMLDivElement>['className'];
        minWidth?: number;
        grows?: boolean;
    }) => React.JSX.Element;
};
export default TableFilters;
