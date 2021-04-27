/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import Button, { ButtonProps } from "./Button"

const ButtonExamples = () => {
  const variants: Array<ButtonProps["variant"]> = [
    "filled",
    "filledLight",
    "plain",
  ]
  const colors: Array<ButtonProps["color"]> = [
    "primary",
    "secondary",
    "success",
    "text",
  ]

  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "repeat(5, 1fr)",
        gap: 4,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {[undefined, ...variants].map((variant) =>
        [undefined, ...colors].map((color) => {
          if (!color && !variant) return <span />
          if (!color) return <span>{variant}</span>
          if (!variant) return <span>{color}</span>
          return (
            <Button key={color} variant={variant} color={color}>
              Button Text
            </Button>
          )
        })
      )}
    </div>
  )
}

export default ButtonExamples
