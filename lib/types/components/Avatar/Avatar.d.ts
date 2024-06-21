/** @jsxImportSource theme-ui */
import { ThemeUICSSProperties } from '@theme-ui/css';
import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
export interface AvatarProps {
    /**
     * Used in combination with `src` or `srcSet` to
     * provide an alt attribute for the rendered `img` element.
     */
    alt?: string;
    /**
     * Used to render icon or text elements inside the Avatar if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: ReactNode;
    /**
     * Background color array used based on alt letter
     */
    colorsArray?: Array<CSSProperties['backgroundColor']>;
    className?: string;
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes) applied to the `img` element if the component is used to display an image.
     * It can be used to listen for the loading error event.
     */
    imgProps?: Omit<HTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'>;
    /**
     * The `size` attribute represents the height and width used on the wrapper and img tags
     */
    size?: number;
    /**
     * The `src` attribute for the `img` element.
     */
    src?: string;
    /**
     * The `srcSet` attribute for the `img` element.
     * Use this attribute for responsive image display.
     */
    srcSet?: string;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    styles?: Record<'image', ThemeUICSSProperties>;
}
declare const Avatar: import("react").ForwardRefExoticComponent<AvatarProps & import("react").RefAttributes<HTMLDivElement>>;
export default Avatar;
