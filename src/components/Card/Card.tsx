/** @jsxRuntime classic /
/** @jsx jsx */
import { ReactNode } from "react"
import { jsx } from "theme-ui"
import Button, { ButtonProps } from "../Button/Button"
import Paper from "../Paper/Paper"

export interface CardProps {
  /** Header text */
  title: string

  /** Body content */
  children: ReactNode

  /** Actions */
  actions?: Array<{
    /** Button label */
    label: string
    /** Button color */
    color?: ButtonProps["color"]
    /** Button variant */
    variant?: ButtonProps["variant"]
    /** Button disabled */
    disabled?: boolean
    /** Callback on action button click */
    onClick: ButtonProps["onClick"]
  }>
}

const Card = ({ title, children, actions }: CardProps) => {
  return (
    <Paper padding={0} sx={{ display: "grid", gap: 1 }}>
      <div
        sx={{
          px: 6,
          pt: 6,
          variant: "text.heading1",
        }}
      >
        {title}
      </div>
      <div
        sx={{
          px: 6,
        }}
      >
        {children}
      </div>
      <div
        sx={{
          display: "flex",
          px: 5,
          pb: 5,
          gap: 5,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {actions &&
          actions.map(
            (
              {
                label,
                color = "secondary",
                variant = "plain",
                disabled = false,
                onClick,
              },
              index
            ) => (
              <div
                key={index}
                sx={{
                  flexShrink: 0,
                }}
              >
                <Button
                  color={color}
                  variant={variant}
                  disabled={disabled}
                  onClick={onClick}
                >
                  {label}
                </Button>
              </div>
            )
          )}
      </div>
    </Paper>
  )
}

export default Card
