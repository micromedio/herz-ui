import { ChangeEvent, ReactNode } from 'react';
export interface RadioGroupProps {
    name?: string;
    value: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    children?: ReactNode;
}
export declare function RadioGroup({ name, onChange, children, value, }: RadioGroupProps): import("react/jsx-runtime").JSX.Element;
