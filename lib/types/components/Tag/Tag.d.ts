/** @jsxImportSource theme-ui */
import React from 'react';
export interface TagProps {
    color?: 'primary' | 'secondary' | 'text' | 'success';
    children: React.ReactNode;
    onRemove?: () => void;
    showRemove?: boolean;
}
declare const Tag: ({ color, children, onRemove, showRemove, }: TagProps) => React.JSX.Element;
export default Tag;
