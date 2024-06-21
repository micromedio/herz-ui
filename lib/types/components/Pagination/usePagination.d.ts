interface UsePaginationProps {
    /** The page selected by default when the component is uncontrolled */
    defaultPage?: number;
    /** The total number of pages */
    count?: number;
    /** If true, the pagination component will be disabled */
    disabled?: boolean;
    /** The current page */
    page?: number;
    /** Callback fired when the page is changed */
    onChange?: (page: number) => void;
    /** Number of always visible pages at the beginning and end */
    boundaryCount?: number;
    /** Number of always visible pages before and after the current page */
    siblingCount?: number;
    showFirstButton?: boolean;
    showPreviousButton?: boolean;
    showNextButton?: boolean;
    showLastButton?: boolean;
}
declare const usePagination: ({ page: pageProp, defaultPage, count, disabled: disabledProp, onChange, boundaryCount, siblingCount, showFirstButton, showPreviousButton, showNextButton, showLastButton, }?: UsePaginationProps) => {
    items: {
        onClick: () => void;
        type: "page" | "first" | "last" | "next" | "previous" | "ellipsis";
        page: number;
        selected: boolean;
        disabled: boolean;
    }[];
};
export default usePagination;
