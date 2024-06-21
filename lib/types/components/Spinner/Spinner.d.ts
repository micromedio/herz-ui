/** @jsxImportSource theme-ui */
import { SVGAttributes } from 'react';
export interface SpinnerProps {
    color?: 'primary' | 'secondary' | 'text';
    size?: number;
    className?: SVGAttributes<SVGElement>['className'];
}
declare const Spinner: ({ color, size, className, }: SpinnerProps) => import("react").JSX.Element;
export default Spinner;
