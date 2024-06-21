interface UseRowSelectionProps {
    selectedRowIds?: Record<string, boolean>;
    onChange?: (rowIds: Record<string, boolean>) => void;
}
declare const useRowSelection: ({ selectedRowIds: controlledSelectedRowIds, onChange, }?: UseRowSelectionProps) => {
    selectedRowIds: Record<string, boolean>;
    toggleRowSelected: (rowId: string | number) => void;
    setRowsSelected: (rowIds: Array<string | number>, value: boolean) => void;
};
export default useRowSelection;
