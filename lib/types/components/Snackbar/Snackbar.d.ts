/** @jsxImportSource theme-ui */
/// <reference types="react" />
export interface SnackbarProps {
    type: 'success' | 'error' | 'loading';
    title: string;
    body?: React.ReactNode;
    onClose?: () => void;
    position?: {
        horizontal: 'left' | 'center' | 'right';
        vertical: 'top' | 'bottom';
    };
}
declare const Snackbar: ({ type, title, body, onClose, position }: SnackbarProps) => import("react").JSX.Element;
export default Snackbar;
