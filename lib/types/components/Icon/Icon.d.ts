import { SVGAttributes } from 'react';
type IconType = typeof import('@tabler/icons-react');
export interface IconProps {
    name: keyof Omit<IconType, 'iconsList' | 'icons' | 'createReactComponent'>;
    size?: number;
    stroke?: number;
    className?: SVGAttributes<SVGElement>['className'];
    style?: SVGAttributes<SVGElement>['style'];
}
declare const Icon: ({ name, size, stroke, className, style, }: IconProps) => import("react/jsx-runtime").JSX.Element;
export default Icon;
