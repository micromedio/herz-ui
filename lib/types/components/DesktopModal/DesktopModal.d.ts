import { DialogProps } from '../Dialog/Dialog';
import { ReactNode } from 'react';
export interface DesktopModalProps extends DialogProps {
    title?: string;
    className?: string;
}
declare const DesktopModal: {
    ({ children, className, ...dialogProps }: DesktopModalProps): import("react").JSX.Element;
    Header({ className, children, }: {
        className?: string;
        children: ReactNode;
    }): import("react").JSX.Element;
    Body({ className, children, }: {
        className?: string;
        children: ReactNode;
    }): import("react").JSX.Element;
    Title({ className, children, }: {
        className?: string;
        children: ReactNode;
    }): import("react").JSX.Element;
    Actions({ className, children, }: {
        className?: string;
        children: ReactNode;
    }): import("react").JSX.Element;
};
export default DesktopModal;
