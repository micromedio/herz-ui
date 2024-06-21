/** @jsxImportSource theme-ui */
import { HTMLAttributes, ReactNode } from 'react';
export interface ValueProps {
    children: ReactNode;
    className?: HTMLAttributes<HTMLDivElement>['className'];
}
export declare const Value: ({ children, className }: ValueProps) => import("react").JSX.Element;
