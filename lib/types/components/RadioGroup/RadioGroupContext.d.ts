import { ChangeEvent, ReactNode } from 'react';
declare const RadioGroupContext: import("react").Context<{
    name: string | undefined;
    value: string;
    onChange?: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;
    children?: ReactNode;
} | null>;
export default RadioGroupContext;
