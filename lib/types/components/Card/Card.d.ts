/** @jsxImportSource theme-ui */
import { ReactNode } from 'react';
import { ButtonProps } from '../Button/Button';
export interface CardProps {
    /** Header text */
    title: string;
    /** Body content */
    children: ReactNode;
    /** Actions */
    actions?: Array<{
        /** Button label */
        label: string;
        /** Button color */
        color?: ButtonProps['color'];
        /** Button variant */
        variant?: ButtonProps['variant'];
        /** Button disabled */
        disabled?: boolean;
        /** Callback on action button click */
        onClick: ButtonProps['onClick'];
    }>;
}
declare const Card: ({ title, children, actions }: CardProps) => import("react").JSX.Element;
export default Card;
