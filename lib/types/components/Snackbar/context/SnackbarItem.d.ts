/** @jsxImportSource theme-ui */
/// <reference types="react" />
import { SnackbarProps } from '../Snackbar';
export interface SnackbarItemProps extends SnackbarProps {
    id: string;
    autoHideDuration: number;
    showClose?: boolean;
    isPersistent?: boolean;
}
declare const SnackbarItem: ({ id, autoHideDuration, showClose, isPersistent, title, type, body, onClose, }: SnackbarItemProps) => import("react").JSX.Element;
export default SnackbarItem;
