/** @jsxRuntime classic /
/** @jsx jsx */
import {
  Button as ThemeUIButton,
  HerzUITheme,
  jsx,
  SxStyleProp,
} from "theme-ui"
import { MouseEvent, ButtonHTMLAttributes, forwardRef } from "react"
import Icon, { IconProps } from "../Icon/Icon"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | React.ReactNode

  variant?: "filled" | "plain"

  color?: "primary" | "secondary" | "success" | "text"

  disabled?: boolean

  size?: "small" | "large"

  onClick?: (event: MouseEvent<HTMLButtonElement>) => void

  iconName?: IconProps["name"]
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    onClick,
    variant = "filled",
    color = "primary",
    size = "large",
    disabled,
    iconName,
    ...htmlProps
  }: ButtonProps,
  ref
) {
  const baseButton = {
    display: "flex",
    gap: size === "small" ? 1 : 2,
    justifyContent: "center",
    alignItems: "center",
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
    paddingX: size === "large" ? 3 : 1,
    paddingY: size === "large" ? 2 : 1,
  }

  const plain: SxStyleProp = {
    ...baseButton,
    paddingY: size === "large" ? 2 : 1,
    paddingX: 1,
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
      {iconName && <Icon name={iconName} size={size === "small" ? 16 : 20} />}
      {children && <span>{children}</span>}
    </ThemeUIButton>
  )
})

export default Button
