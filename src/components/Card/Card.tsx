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
    <Paper padding={0} sx={{ display: "grid", gap: 2, p: 6 }}>
      <div
        sx={{
          variant: "text.heading3",
        }}
      >
        {title}
      </div>
      <div
        sx={{
          variant: "text.body1",
        }}
      >
        {children}
      </div>
      <div
        sx={{
          display: "flex",
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
