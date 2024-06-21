/** @jsxImportSource theme-ui */
import React from 'react';
export interface SkeletonProps {
    className?: string;
    variant?: 'circle' | 'text' | 'rect';
    width?: number | string;
    height?: number | string;
}
declare const Skeleton: ({ className, variant, width, height, }: SkeletonProps) => React.JSX.Element;
export default Skeleton;
