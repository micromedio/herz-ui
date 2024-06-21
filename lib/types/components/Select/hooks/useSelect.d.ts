import { UseSelectProps as UseDownshiftSelectProps } from 'downshift';
import { SelectProps, SelectValue, SelectOptionType } from '../Select';
export declare enum SELECT_BULK_ACTIONS {
    DESELECT_ALL = 0,
    SELECT_ALL = 1
}
export interface UseSelectProps {
    options: Array<SelectOptionType>;
    multi: SelectProps['multi'];
    value: SelectProps['value'];
    selectedItems: SelectProps['selectedItems'];
    onChange: SelectProps['onChange'];
    onSelectedItemsChange: SelectProps['onSelectedItemsChange'];
    isOpen: UseDownshiftSelectProps<SelectValue>['isOpen'];
    onIsOpenChange: UseDownshiftSelectProps<SelectValue>['onIsOpenChange'];
}
export declare function useSelect({ options, multi, value, selectedItems, onChange, onSelectedItemsChange, isOpen, onIsOpenChange, }: UseSelectProps): {
    isOpen: boolean;
    selectedItem: SelectValue | null;
    getToggleButtonProps: (options?: import("downshift").UseSelectGetToggleButtonPropsOptions | undefined, otherOptions?: import("downshift").GetPropsCommonOptions | undefined) => any;
    getLabelProps: (options?: import("downshift").UseSelectGetLabelPropsOptions | undefined) => any;
    getMenuProps: (options?: import("downshift").UseSelectGetMenuPropsOptions | undefined, otherOptions?: import("downshift").GetPropsCommonOptions | undefined) => any;
    highlightedIndex: number;
    getItemProps: (options: import("downshift").UseSelectGetItemPropsOptions<SelectValue>) => any;
    getDropdownProps: (options?: import("downshift").UseMultipleSelectionGetDropdownProps | undefined, extraOptions?: import("downshift").GetPropsCommonOptions | undefined) => any;
    handleBulkAction: (type?: SELECT_BULK_ACTIONS) => void;
    selectItem: (item: SelectValue) => void;
    closeMenu: () => void;
    openMenu: () => void;
};
