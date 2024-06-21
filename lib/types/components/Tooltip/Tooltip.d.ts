/// <reference types="react" />
/** @jsxImportSource theme-ui */
import { PopoverProps } from '../Popover/Popover';
export interface TooltipProps {
    title: string;
    children: PopoverProps['children'];
    placement?: PopoverProps['placement'];
    trigger?: PopoverProps['trigger'];
    isVisible?: PopoverProps['isVisible'];
    isInteractive?: PopoverProps['isInteractive'];
    custom?: React.ReactNode;
}
export default function Tooltip({ children, title, placement, trigger, isVisible, isInteractive, custom, }: TooltipProps): import("react").JSX.Element;
