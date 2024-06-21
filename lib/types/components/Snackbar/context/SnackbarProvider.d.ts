/// <reference types="react" />
export interface SnackbarProviderProps {
    children: React.ReactNode;
    autoHideDuration?: number;
    position?: {
        vertical: 'top' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
}
declare const SnackbarProvider: ({ children, autoHideDuration, position, }: SnackbarProviderProps) => import("react").JSX.Element;
export default SnackbarProvider;
