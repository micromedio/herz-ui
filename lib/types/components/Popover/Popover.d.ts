/** @jsxImportSource theme-ui */
import { ThemeUICSSObject } from 'theme-ui';
import React from 'react';
import { TippyProps } from '@tippyjs/react';
export interface PopoverProps {
    /** Content is always rendered, even when the Popover is not mounted or hidden */
    alwaysRenderContent?: boolean;
    /** Popover content */
    content: React.ReactNode;
    /** Reference element */
    children: TippyProps['children'];
    /** Used to control where the popover will be positioned in relation to the reference element */
    placement?: TippyProps['placement'];
    /** List of events that can trigger the popover showing. Only used if the element is not controlled (if `isVisible` is not used) */
    trigger?: Array<'mouseenter' | 'focus' | 'focusin' | 'click' | 'manual'>;
    /** Element in wich the Popover should be appended to */
    appendTo?: TippyProps['appendTo'];
    /** Popover color theme */
    theme?: 'light' | 'dark';
    /** Popover border radius */
    borderRadius?: number;
    /** Popover content style */
    contentStyle?: ThemeUICSSObject;
    /** Popover box style */
    boxStyle?: ThemeUICSSObject;
    /** Use to control the visibility of the popover from the parent component. Most of the time this is not needed when choosing the right triggers for your situation */
    isVisible?: boolean;
    /** If `true` removes padding from the content container */
    noPadding?: boolean;
    /** If `true` the popover will remain visible while the mouse is hovering over the content */
    isInteractive?: boolean;
    /** If `true` the popover has an arrow pointing to the reference element */
    hasArrow?: boolean;
    /** If `true` shows a background overlay to fade the rest of the application when the popover is open */
    hasBackgroundOverlay?: boolean;
    /** `true` if popover should hide on click. Only used if the element is not controlled (if `isVisible` is not used) */
    hideOnClick?: boolean;
    /** Callback called when there's a click outside the popover */
    onClickOutside?: TippyProps['onClickOutside'];
    /** Callback called when popover is hidden */
    onHide?: TippyProps['onHide'];
    /** Callback called when popover is shown */
    onShow?: TippyProps['onShow'];
    /** Callback called when popover is created, can be used to access the underlying tippy.js instance */
    onCreate?: TippyProps['onCreate'];
    /** z-index of the popover element */
    zIndexPopper?: number;
    /** z-index of the background overlay element */
    zIndexOverlay?: number;
}
declare const Popover: ({ alwaysRenderContent, content, children, placement, trigger, appendTo, theme, borderRadius, contentStyle, boxStyle, isVisible, noPadding, isInteractive, hasArrow, hasBackgroundOverlay, hideOnClick, onClickOutside, onHide, onShow, onCreate, zIndexPopper, zIndexOverlay, }: PopoverProps) => React.JSX.Element;
export default Popover;
