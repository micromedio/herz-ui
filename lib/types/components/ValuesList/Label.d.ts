/** @jsxImportSource theme-ui */
import { HTMLAttributes, ReactNode } from 'react';
export interface LabelProps {
    children: ReactNode;
    className?: HTMLAttributes<HTMLDivElement>['className'];
}
export declare const Label: ({ children, className }: LabelProps) => import("react").JSX.Element;
