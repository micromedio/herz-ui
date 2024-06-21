/** @jsxImportSource theme-ui */
import { ThemeUICSSObject } from 'theme-ui';
import { ReactNode } from 'react';
export interface MobileModalProps {
    backgroundStyles?: ThemeUICSSObject;
    children?: ReactNode;
    dismissible?: boolean;
    draggable?: boolean;
    modalStyles?: ThemeUICSSObject;
    onClose?: () => void;
    onDismiss?: () => void;
    onOpen?: () => void;
    open?: boolean;
    overflowHeight?: number;
    threshold?: number;
    topSpacing?: number;
}
declare const MobileModal: ({ backgroundStyles, children, dismissible, draggable, modalStyles, onClose, onDismiss, onOpen, open, overflowHeight, threshold, topSpacing, }: MobileModalProps) => JSX.Element;
export default MobileModal;
