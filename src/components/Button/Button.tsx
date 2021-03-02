/** @jsxRuntime classic /
/** @jsx jsx */
import {
  Button as ThemeUIButton,
  HerzUITheme,
  jsx,
  SxStyleProp,
} from "theme-ui"
import { MouseEvent, ButtonHTMLAttributes, forwardRef } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string

  variant?: "filled" | "plain"

  color?: "primary" | "secondary" | "success" | "text"

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
    color: color === "text" ? "text.40" : "#fff",
    backgroundColor: (theme: HerzUITheme) =>
      color === "text" ? theme.colors.text.alpha[95] : theme.colors[color][0],
    "&:hover": {
      backgroundColor: (theme: HerzUITheme) =>
        color === "text"
          ? theme.colors.text[90]
          : theme.colors[color].shade[10],
    },
    "&:disabled": {
      opacity: 0.3,
      cursor: "default",
    },
  }

  const filled: SxStyleProp = {
    ...baseButton,
    paddingX: 3,
    paddingY: 2,
  }

  const plain: SxStyleProp = {
    ...baseButton,
    paddingX: 1,
    paddingY: 2,
    backgroundColor: "transparent",
    color: (theme: HerzUITheme) =>
      theme.colors[color][color === "text" ? 40 : 0],
    "&:hover": {
      backgroundColor: (theme: HerzUITheme) => theme.colors[color].alpha[90],
    },
    "&:disabled": {
      ...baseButton["&:disabled"],
      backgroundColor: "transparent",
    },
  }

  return (
    <ThemeUIButton
      ref={ref}
      onClick={onClick}
      {...htmlProps}
      disabled={disabled}
      sx={variant === "filled" ? filled : plain}
    >
      {children}
    </ThemeUIButton>
  )
})

export default Button
