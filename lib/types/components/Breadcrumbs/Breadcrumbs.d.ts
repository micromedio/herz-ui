/** @jsxImportSource theme-ui */
import React, { HTMLAttributes } from 'react';
export interface BreadcrumbsProps {
    children?: React.ReactNode;
    className?: HTMLAttributes<HTMLElement>['className'];
}
declare const Breadcrumbs: ({ children, className }: BreadcrumbsProps) => React.JSX.Element;
export default Breadcrumbs;
