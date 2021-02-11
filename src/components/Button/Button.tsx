/** @jsxRuntime classic /
/** @jsx jsx */
import { Button as ThemeUIButton, jsx, SxStyleProp } from "theme-ui"
import { MouseEvent, ButtonHTMLAttributes, forwardRef } from "react"
import { shade } from "@theme-ui/color"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string

  variant?: string

  color?: string

  disabled?: boolean

  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    onClick,
    variant,
    color = "primary",
    disabled,
    ...htmlProps
  }: ButtonProps,
  ref
) {
  const filled: SxStyleProp = {
    paddingX: "0.75rem",
    paddingY: "0.5rem",
    backgroundColor: color,
    position: "relative",
    borderRadius: "0.5rem !important",
    "&:hover": {
      backgroundColor: shade(color, 0.1),
    },
    "&:disabled": {
      opacity: 0.3,
      cursor: "default",
    },
  }

  const plain: SxStyleProp = {
    variant: "text.body1",
    paddingX: "0.25rem",
    paddingY: "0.5rem",
    backgroundColor: "transparent",
    color: "#0082FC",
    position: "relative",
    borderRadius: "0.5rem !important",
    "&:hover": {
      backgroundColor: "#0082FC0F",
    },
    "&:disabled": {
      backgroundColor: "transparent",
      opacity: 0.3,
      cursor: "default",
    },
  }

  return (
    <ThemeUIButton
      ref={ref}
      onClick={onClick}
      variant={variant}
      {...htmlProps}
      disabled={disabled}
      sx={variant === "filled" ? filled : plain}
    >
      {children}
    </ThemeUIButton>
  )
})

export default Button
