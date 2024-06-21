/** @jsxImportSource theme-ui */
import React from 'react';
import { SelectValue } from './Select';
export interface SelectOptionProps<T = SelectValue> {
    value: T;
    children?: React.ReactNode;
    disabled?: boolean;
}
export declare function SelectOption<T = SelectValue>({ children, value, disabled, }: SelectOptionProps<T>): React.JSX.Element;
export declare namespace SelectOption {
    var isSelectOption: boolean;
}
