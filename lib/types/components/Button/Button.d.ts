/** @jsxImportSource theme-ui */
import { ThemeUICSSObject } from 'theme-ui';
import { MouseEvent, ButtonHTMLAttributes } from 'react';
import { IconProps } from '../Icon/Icon';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: string | React.ReactNode;
    variant?: 'filled' | 'plain' | 'filledLight';
    color?: 'primary' | 'secondary' | 'success' | 'text';
    disabled?: boolean;
    loading?: boolean;
    size?: 'small' | 'large';
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    iconName?: IconProps['name'];
    styles?: {
        childrenWrapper?: ThemeUICSSObject;
        icon?: ThemeUICSSObject;
        root?: ThemeUICSSObject;
    };
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}
declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export default Button;
