/** @jsxImportSource theme-ui */
import React, { MouseEvent } from 'react';
export interface ButtonControlProps {
    isLoading?: boolean;
    showButtons?: boolean;
    onReset?: (event: MouseEvent<HTMLButtonElement>) => void;
    onSave?: () => void;
    children: React.ReactNode;
}
declare const ButtonControl: ({ isLoading, showButtons, onReset, onSave, children, }: ButtonControlProps) => React.JSX.Element;
export default ButtonControl;
