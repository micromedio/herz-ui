/** @jsxImportSource theme-ui */

import { ThemeUICSSProperties } from "@theme-ui/css"
import { forwardRef, HTMLAttributes, ReactNode, useCallback } from "react"
import { useLoadedImage } from "./hooks/useLoadedImage"

export interface AvatarProps {
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: string
  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
   */
  children?: ReactNode

  className?: string
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes) applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
   */
  imgProps?: Omit<HTMLAttributes<HTMLImageElement>, "src" | "srcSet">
  /**
   * The `size` attribute represents the height and width used on the wrapper and img tags
   */
  size?: number
  /**
   * The `src` attribute for the `img` element.
   */
  src?: string
  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet?: string
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  styles?: Record<"image", ThemeUICSSProperties>
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {
    alt,
    children,
    className,
    imgProps,
    size = 20,
    src,
    srcSet,
    styles,
  }: AvatarProps,
  ref
) {
  const loaded = useLoadedImage(src)

  const getChildren = useCallback(() => {
    if (loaded === "loaded") return
    if (["error", "nosource"].includes(loaded)) {
      if (children) return children
      return alt.slice(0, 1)
    }
  }, [alt, children, loaded])

  return (
    <div
      className={className}
      ref={ref}
      sx={{
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "text.70",
        borderRadius: "50%",
        color: "text.97",
        display: "flex",
        fontSize: size * 0.625,
        height: size,
        justifyContent: "center",
        width: size,
      }}
    >
      {(!src || loaded !== "loaded") && getChildren()}
      {src && loaded === "loaded" && (
        <img
          {...imgProps}
          src={src}
          srcSet={srcSet}
          sx={{
            ...styles?.image,
            borderRadius: "50%",
            height: size,
            objectFit: "cover",
            width: size,
          }}
        />
      )}
    </div>
  )
})

export default Avatar
