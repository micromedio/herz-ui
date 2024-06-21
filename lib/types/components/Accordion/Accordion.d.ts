/** @jsxImportSource theme-ui */
import React, { HTMLAttributes } from 'react';
export interface AccordionProps {
    initialOpenIndex?: number;
    children: React.ReactNode;
    activeBackgroundColor?: 'primary' | 'secondary' | 'text' | 'success' | 'warning';
    className?: HTMLAttributes<HTMLDivElement>['className'];
}
declare const Accordion: {
    ({ children, initialOpenIndex, activeBackgroundColor, className, }: AccordionProps): React.JSX.Element;
    Item: ({ title, children, className }: AccordionItemProps) => React.JSX.Element;
};
export interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    className?: HTMLAttributes<HTMLDivElement>['className'];
}
export default Accordion;
