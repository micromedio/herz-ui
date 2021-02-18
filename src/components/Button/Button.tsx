/** @jsxRuntime classic /
/** @jsx jsx */
import { Button as ThemeUIButton, jsx, SxStyleProp } from "theme-ui"
import { MouseEvent, ButtonHTMLAttributes, forwardRef } from "react"
import { shade } from "@theme-ui/color"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string

  variant?: "filled" | "plain"

  color?: string

  disabled?: boolean

  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    onClick,
    variant = "filled",
    color = "primary",
    disabled,
    ...htmlProps
  }: ButtonProps,
  ref
) {
  const baseButton = {
    variant: "text.button1",
    borderRadius: 2,
    cursor: "pointer",
    position: "relative",
    transition: "all .2s linear",
  }

  const filled: SxStyleProp = {
    ...baseButton,
    paddingX: 3,
    paddingY: 2,
    backgroundColor: color,
    "&:hover": {
      backgroundColor: shade(color, 0.1),
    },
    "&:disabled": {
      opacity: 0.3,
      cursor: "default",
    },
  }

  const plain: SxStyleProp = {
    ...baseButton,
    paddingX: 1,
    paddingY: 2,
    backgroundColor: "transparent",
    color: "#0082FC",
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
