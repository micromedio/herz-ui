/** @jsxImportSource theme-ui */
import { MouseEventHandler, ReactElement } from 'react';
import { ThemeUICSSObject } from 'theme-ui';
interface SubNavigationMenuItemProps {
    children: ReactElement | string;
    collapsedItem?: ReactElement | string;
    onClick?: MouseEventHandler<HTMLLIElement>;
    selected?: boolean;
    styles?: {
        root: ThemeUICSSObject;
        anchor: ThemeUICSSObject;
    };
}
export interface SubNavigationMenuProps {
    /** Description content */
    children: ReactElement[];
    /** Whether the component is hidden when collapsed or not */
    collapsedHidden?: boolean;
    /** The amount of width for the collapsed menu */
    collapsedWidth?: number;
    /** Whether the menu is collapsible or not */
    collapsible?: boolean;
    /** Callback for collapse button click */
    onCollapseButtonClick?: (collapsed: boolean) => void;
    /** Callback for collapse button hover */
    onCollapseButtonHover?: (isHovering: boolean) => void;
    styles?: {
        root?: ThemeUICSSObject;
        list?: ThemeUICSSObject;
    };
    /** The amount of width for the non collapsed menu */
    width?: number;
}
declare const SubNavigationMenu: {
    ({ children, collapsedHidden, collapsedWidth, collapsible, onCollapseButtonClick, onCollapseButtonHover, styles, width, }: SubNavigationMenuProps): import("react").JSX.Element;
    MenuItem: ({ children, collapsedItem, onClick, selected, styles, }: SubNavigationMenuItemProps) => import("react").JSX.Element;
};
export default SubNavigationMenu;
