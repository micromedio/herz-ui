/** @jsxImportSource theme-ui */
import React, { HTMLProps } from 'react';
export interface CheckableTagProps extends Omit<HTMLProps<HTMLInputElement>, 'label' | 'ref'> {
    label?: React.ReactNode;
}
declare const CheckableTag: React.ForwardRefExoticComponent<CheckableTagProps & React.RefAttributes<HTMLInputElement>>;
export default CheckableTag;
