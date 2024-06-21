/** @jsxImportSource theme-ui */
import React from 'react';
export interface PaginationItemProps {
    /** Type of pagination item */
    type: 'page' | 'first' | 'last' | 'next' | 'previous' | 'ellipsis';
    /** The current page number */
    page?: number;
    /** If `true`, the item will be disabled */
    disabled?: boolean;
    /** If `true` the pagination item is selected */
    selected?: boolean;
    onClick?: () => void;
    /** Text to show for the `first` button */
    firstText?: string;
    /** Text to show for the `last` button */
    lastText?: string;
}
declare const PaginationItem: ({ page, type, disabled, selected, onClick, firstText, lastText, }: PaginationItemProps) => React.JSX.Element;
export default PaginationItem;
