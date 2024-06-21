/** @jsxImportSource theme-ui */
/// <reference types="react" />
export interface SwitchProps {
    checked?: boolean;
    disabled?: boolean;
    color?: 'primary' | 'secondary' | 'text' | 'success' | 'warning';
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: React.ReactNode;
    name?: string;
    id?: string;
}
export declare const Switch: import("react").ForwardRefExoticComponent<SwitchProps & import("react").RefAttributes<HTMLInputElement>>;
