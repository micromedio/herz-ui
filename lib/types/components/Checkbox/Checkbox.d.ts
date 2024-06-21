/** @jsxImportSource theme-ui */
import * as React from 'react';
export interface ICheckboxProps {
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    id?: string;
    label?: React.ReactNode;
    name?: string;
    onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}
declare const Checkbox: React.ForwardRefExoticComponent<ICheckboxProps & React.RefAttributes<HTMLInputElement>>;
export default Checkbox;
