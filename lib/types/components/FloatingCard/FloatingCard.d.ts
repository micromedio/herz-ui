/** @jsxImportSource theme-ui */
import { HTMLAttributes, ReactNode } from 'react';
import { PopoverProps } from '../Popover/Popover';
export interface FloatingCardProps {
    /** Card title */
    title: string;
    /** Reference element, where the FloatingCard will point to and spawn from */
    children: PopoverProps['children'];
    /** Card body content */
    body: ReactNode;
    /** Title text alignment */
    titleAlign?: 'start' | 'center';
    /** Show the X (close) button */
    showClose?: boolean;
    /** Placement of the card relative to the reference element */
    placement?: PopoverProps['placement'];
    /** Controls if the card is visible or not. Use it if you need the visibility to be controlled by the parent */
    isVisible?: boolean;
    /** Callback called when the Popover spawning the card is closed */
    onClose?: () => void;
    className?: HTMLAttributes<HTMLDivElement>['className'];
    appendTo?: PopoverProps['appendTo'];
}
declare const FloatingCard: ({ title, titleAlign, children, body, placement, showClose, isVisible, onClose, className, appendTo, }: FloatingCardProps) => import("react").JSX.Element;
export default FloatingCard;
