/** @jsxImportSource theme-ui */
import { get, ThemeUICSSObject } from "theme-ui"
import { MouseEvent, ButtonHTMLAttributes, forwardRef, useMemo } from "react"
import Icon, { IconProps } from "../Icon/Icon"
import { Spinner } from ".."

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | React.ReactNode

  variant?: "filled" | "plain" | "filledLight"

  color?: "primary" | "secondary" | "success" | "text"

  disabled?: boolean
  loading?: boolean

  size?: "small" | "large"

  onClick?: (event: MouseEvent<HTMLButtonElement>) => void

  iconName?: IconProps["name"]

  styles?: {
    childrenWrapper?: ThemeUICSSObject
    icon?: ThemeUICSSObject
    root?: ThemeUICSSObject
  }

  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    onClick,
    variant = "filled",
    color = "primary",
    size = "large",
    disabled,
    loading = false,
    iconName,
    styles,
    type = "button",
    ...htmlProps
  }: ButtonProps,
  ref
): JSX.Element {
  const baseButton: ThemeUICSSObject = {
    display: "flex",
    gap: size === "large" ? 2 : 1,
    paddingX: size === "large" ? 3 : 1,
    paddingY: size === "large" ? 2 : 1,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 2,
    cursor: "pointer",
    // position: "relative",
    transition: "all .2s linear",
    variant: "text.button1",
    outline: "none",
    border: "none",

    ":focus": {
      outline: "none",
      border: "none",
    },

    "&:disabled": {
      opacity: 0.3,
      cursor: "default",
    },
  }

  const filled: ThemeUICSSObject = {
    color: color === "text" ? "text.40" : "#fff",
    backgroundColor: (t) =>
      color === "text"
        ? get(t, "colors.text.alpha.95")
        : get(t, `colors.${color}`),
    "&:not([disabled])": {
      "&:hover": {
        backgroundColor: (t) =>
          color === "text"
            ? get(t, "colors.text.90")
            : get(t, `colors.${color}.shade.10`),
      },
    },
  }

  const filledLight: ThemeUICSSObject = {
    color: (t) => get(t, `colors.${color}.${color === "text" ? 40 : 0}`),
    backgroundColor: (t) => get(t, `colors.${color}.alpha.95`),
    "&:not([disabled])": {
      "&:hover": {
        backgroundColor: (t) => get(t, `colors.${color}.alpha.90`),
      },
    },
  }

  const plain: ThemeUICSSObject = {
    paddingX: 1,
    backgroundColor: "transparent",
    color: (t) => get(t, `colors.${color}.${color === "text" ? 40 : 0}`),
    "&:not([disabled])": {
      "&:hover": {
        backgroundColor: (t) => get(t, `colors.${color}.alpha.90`),
      },
    },
  }

  const spinnerStyles = useMemo<ThemeUICSSObject>(() => {
    const variants: Record<string, ThemeUICSSObject> = {
      filled: {
        "--dot-color": (t) =>
          color === "text" ? get(t, `colors.text.70`) : "#fff",
        stroke: color === "text" ? "text.40" : "#fff",
      },
      filledLight: {
        "--dot-color": (t) =>
          get(t, `colors.${color}.${color === "text" ? 70 : 40}`),
        stroke: (t) => get(t, `colors.${color}.${color === "text" ? 40 : 0}`),
      },
      plain: {
        "--dot-color": (t) =>
          get(t, `colors.${color}.${color === "text" ? 70 : 40}`),
        stroke: (t) => get(t, `colors.${color}.${color === "text" ? 40 : 0}`),
      },
    }
    return variants[variant]
  }, [variant, color])

  return (
    <button
      ref={ref}
      onClick={onClick}
      {...htmlProps}
      disabled={disabled || loading}
      type={type}
      sx={{
        ...baseButton,
        ...{
          filled,
          filledLight,
          plain,
        }[variant],
        ...styles?.root,
      }}
    >
      {iconName &&
        (loading ? (
          <Spinner sx={spinnerStyles} />
        ) : (
          <Icon
            name={iconName}
            size={size === "small" ? 16 : 20}
            sx={styles?.icon}
          />
        ))}
      {children && (
        <span
          sx={{
            ...styles?.childrenWrapper,
            ...(loading && !iconName
              ? {
                  color: "transparent",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }
              : {}),
          }}
        >
          {loading && !iconName && (
            <Spinner
              sx={{
                ...spinnerStyles,
                position: "absolute",
              }}
            />
          )}
          {children}
        </span>
      )}
    </button>
  )
})

export default Button
