/** @jsxImportSource theme-ui */
import React from 'react';
export interface TabsProps {
    children: React.ReactNode;
    className?: string;
    initialOpenIndex?: number;
}
declare const Tabs: {
    ({ children, className, initialOpenIndex }: TabsProps): React.JSX.Element;
    Tab: ({ title }: TabButtonProps) => React.JSX.Element;
    Panel: ({ children, index }: TabPanelProps) => React.JSX.Element;
};
export interface TabButtonProps {
    title: string;
}
export interface TabPanelProps {
    children: React.ReactNode;
    index: number;
}
export default Tabs;
