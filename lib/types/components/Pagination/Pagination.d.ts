/** @jsxImportSource theme-ui */
import React from 'react';
export interface PaginationProps {
    /** The page selected by default when the component is uncontrolled */
    defaultPage?: number;
    /** The total number of pages */
    count?: number;
    /** If `true`, the pagination component will be disabled */
    disabled?: boolean;
    /** The current page */
    page?: number;
    /** Callback fired when the page is changed */
    onChange?: (page: number) => void;
    /** Number of always visible pages at the beginning and end */
    boundaryCount?: number;
    /** Number of always visible pages before and after the current page */
    siblingCount?: number;
    /** Text to show for the `first` button */
    firstText?: string;
    /** Text to show for the `last` button */
    lastText?: string;
}
declare const Pagination: ({ page, onChange, disabled, count, defaultPage, boundaryCount, siblingCount, firstText, lastText, }: PaginationProps) => React.JSX.Element;
export default Pagination;
