/** @jsxImportSource theme-ui */
import { HTMLAttributes } from 'react';
export interface DividerProps {
    className?: HTMLAttributes<HTMLHRElement>['className'];
    variant?: 'horizontal' | 'vertical';
}
declare const Divider: ({ className, variant }: DividerProps) => import("react").JSX.Element;
export default Divider;
