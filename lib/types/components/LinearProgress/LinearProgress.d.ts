/** @jsxImportSource theme-ui */
import { HTMLAttributes } from 'react';
export interface LinearProgressProps {
    className?: HTMLAttributes<HTMLDivElement>['className'];
    /** LinearProgress color */
    color?: 'primary' | 'secondary' | 'success' | 'warning';
    /** LinearProgress height */
    height?: number;
    /** Represents the progress (between 0 and 1) for LinearProgress, the default value is undefined and it renders an animated and indeterminate LinearProgress. */
    progress?: number;
}
declare const LinearProgress: import("react").ForwardRefExoticComponent<LinearProgressProps & import("react").RefAttributes<HTMLDivElement>>;
export default LinearProgress;
