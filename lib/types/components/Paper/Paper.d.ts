/** @jsxImportSource theme-ui */
import React, { HTMLAttributes } from 'react';
export interface PaperProps {
    /** Paper elevation */
    elevation?: number;
    /** Paper inside padding */
    padding?: number;
    /** The content of the component */
    children?: React.ReactNode;
    className?: HTMLAttributes<HTMLDivElement>['className'];
    onClick?: HTMLAttributes<HTMLDivElement>['onClick'];
}
declare const Paper: React.ForwardRefExoticComponent<PaperProps & React.RefAttributes<HTMLDivElement>>;
export default Paper;
