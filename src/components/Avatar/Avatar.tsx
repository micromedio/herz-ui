/** @jsxImportSource theme-ui */

import { ThemeUICSSProperties } from '@theme-ui/css';
import {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useMemo,
} from 'react';
import { Icon } from '..';
import { useLoadedImage } from './hooks/useLoadedImage';

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

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {
    alt,
    children,
    className,
    colorsArray = [
      'secondary',
      'primary',
      'success',
      'warning',
      '#FFA53C',
      '#F700FC',
      '#3CD0FF',
      '#CCFF3C',
    ],
    imgProps,
    size = 20,
    src,
    srcSet,
    styles,
  }: AvatarProps,
  ref
) {
  const loaded = useLoadedImage(src);

  const childrenAndColor = useMemo(() => {
    if (loaded === 'loaded') return { children: undefined };
    if (['error', 'nosource'].includes(loaded)) {
      if (children) return { children };
      const altFirstLetter = alt?.slice(0, 1);
      if (alt && altFirstLetter) {
        const charCodeSum = alt
          .split(' ')
          .reduce(
            (accumulative, current) => accumulative + current.charCodeAt(0),
            0
          );
        return {
          children: altFirstLetter,
          backgroundColor: colorsArray[charCodeSum % colorsArray.length],
        };
      }
    }
    return { children: <Icon name="IconUser" size={size * 0.625} /> };
  }, [alt, children, colorsArray, loaded, size]);

  return (
    <div
      className={className}
      ref={ref}
      sx={{
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: childrenAndColor?.backgroundColor || 'text.70',
        borderRadius: '50%',
        color: 'text.97',
        display: 'flex',
        fontSize: size * 0.625,
        fontWeight: 600,
        height: size,
        justifyContent: 'center',
        width: size,
      }}
    >
      {(!src || loaded !== 'loaded') && childrenAndColor.children}
      {src && loaded === 'loaded' && (
        <img
          {...imgProps}
          src={src}
          srcSet={srcSet}
          sx={{
            borderRadius: '50%',
            height: size,
            objectFit: 'cover',
            width: size,
            ...styles?.image,
          }}
        />
      )}
    </div>
  );
});

export default Avatar;
