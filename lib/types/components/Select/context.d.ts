/// <reference types="react" />
import { useSelect } from './hooks/useSelect';
import { SelectProps } from './Select';
export interface SelectContext {
    index: number;
    highlightedIndex: ReturnType<typeof useSelect>['highlightedIndex'];
    selectItem: ReturnType<typeof useSelect>['selectItem'];
    selectedItem: ReturnType<typeof useSelect>['selectedItem'];
    selectedItems: SelectProps['selectedItems'];
    multi: boolean;
    getItemProps: ReturnType<typeof useSelect>['getItemProps'];
    closeMenu: ReturnType<typeof useSelect>['closeMenu'];
    openMenu: ReturnType<typeof useSelect>['openMenu'];
}
export declare const SelectContext: import("react").Context<SelectContext | null>;
