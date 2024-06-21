/** @jsxImportSource theme-ui */
import React from 'react';
import { ThemeUICSSObject } from 'theme-ui';
import { UseSelectProps } from './hooks/useSelect';
import { SelectOption } from './SelectOption';
export type SelectValue = string | number | Record<string, unknown>;
export type SelectedItems = Array<SelectValue>;
export type SelectOptionType = {
    value: SelectValue;
    label: React.ReactNode;
    isCustom?: boolean;
};
export interface SelectProps {
    /** The id of the Select. Use this prop to make label and `helperText` accessible for screen readers */
    id?: string;
    /** Label text to be placed before the element */
    label?: string;
    /** The placeholder text, shown when there is no selected value */
    placeholder?: string;
    /** The value of the `select` element, required for a controlled component */
    value?: SelectValue;
    /** Default value which will not trigger the `filled` select state */
    defaultValue?: SelectValue;
    /** Whether the component is disabled or not */
    disabled?: boolean;
    /** Whether the user can select multiple options or not */
    multi?: boolean;
    /** Current selected items for multiple selection */
    selectedItems?: SelectedItems;
    /** Default array of selected items which will not trigger the `filled` select state */
    defaultSelectedItems?: SelectedItems;
    /** Callback fired when the value is changed */
    onChange?: (changes: SelectValue) => void;
    /** Callback fired when the selected items change for multiple selection */
    onSelectedItemsChange?: (changes: SelectedItems) => void;
    /** Highlight the select when it's in a `filled` state */
    highlightFilled?: boolean;
    /** Select grows to fill the width of the parent */
    fullWidth?: boolean;
    children: React.ReactNode;
    renderButtonLabel?: ({ value, selectedOption, selectedItems, }: {
        value?: SelectValue;
        selectedOption?: SelectOptionType;
        selectedItems?: SelectedItems;
    }) => React.ReactNode;
    styles?: {
        root?: ThemeUICSSObject;
        popoverContent?: ThemeUICSSObject;
        button?: ThemeUICSSObject;
    };
    isOpen?: UseSelectProps['isOpen'];
    onIsOpenChange?: (value: boolean) => void;
}
/**
 * Component responsible for rendering a select dropdown from given options
 */
declare const Select: {
    ({ id, label, value, defaultValue, disabled, multi, placeholder, selectedItems, defaultSelectedItems, onChange, onSelectedItemsChange, highlightFilled, fullWidth, children, renderButtonLabel, styles, isOpen: isOpenProp, onIsOpenChange, }: SelectProps): React.JSX.Element;
    Option: typeof SelectOption;
};
export default Select;
