/** @jsxImportSource theme-ui */
import { ReactNode } from 'react';
import { IconProps } from '../Icon/Icon';
export interface AlertProps {
    /** Alert title */
    title: string;
    /** Description content */
    children: ReactNode;
    /** The alert icon from tabler */
    iconName?: IconProps['name'];
    /** custom Alert icon */
    iconSVG?: ReactNode;
    color: string;
    position?: 'fixed' | 'relative';
}
declare const Alert: ({ title, children, iconName, iconSVG, color, position, }: AlertProps) => import("react").JSX.Element;
export default Alert;
