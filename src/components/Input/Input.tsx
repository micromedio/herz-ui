/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Input type */
  type?: HTMLInputElement["type"]
  /** The value of the `input` element, required for a controlled component */
  value?: string
  /** Callback fired when the value is changed */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /** Placeholder text content */
  placeholder?: string

  /** If `true`, the `input` will be displayed in an error state */
  error?: boolean
  /** If `true`, the `input` element will be disabled */
  disabled?: boolean
  /** If `true`, the `input` is required */
  required?: boolean

  /** The id of the `input` element. Use this prop to make label and `helperText` accessible for screen readers */
  id?: string
  /** Text  */
  unit?: string

  // Icon?: React.Component
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    type = "text",
    value,
    onChange,
    placeholder,
    disabled = false,
    error = false, //TODO: error state, needs design
    required = false,
    // Icon, //TODO: icon library to be defined
    unit,
    ...htmlProps
  }: InputProps,
  ref
) {
  return (
    <div
      sx={{
        display: "flex",
        width: "100%",
        position: "relative",
        justifyContent: "center",
        gap: 2,

        paddingY: 2,
        paddingX: 3,
        backgroundColor: value ? "#0082FC0F" : "#0000000A", // TODO: remove fixed colors, use shade from theme
        outline: 0,
        borderRadius: 2,
        border: "2px solid transparent",

        transition: "all 0.2s",
        "&:hover": {
          backgroundColor: "#00000017", // TODO: remove fixed colors, use shade from theme
        },
        "&:focus-within": {
          borderColor: "highlight",
          boxShadow: "0px 0px 0px 4px #EBF3FB", // TODO: remove fixed colors, use shade from theme
          backgroundColor: "#FFFFFF", // TODO: remove fixed colors, use shade from theme
        },
      }}
    >
      <input
        id={id}
        type={type}
        ref={ref}
        required={required}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={error}
        {...htmlProps}
        sx={{
          flexGrow: 1,
          outline: 0,
          backgroundColor: "transparent",
          border: "none",
          p: 0,

          color: "text",
          variant: "text.body1",
        }}
      />

      {unit && (
        <label
          htmlFor={id}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            color: "muted",
            variant: "text.body1",
          }}
        >
          {unit}
        </label>
      )}
    </div>
  )
})

export default Input
