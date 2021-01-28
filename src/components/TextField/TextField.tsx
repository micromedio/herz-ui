/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx, Flex } from "theme-ui"
import { ChangeEvent, forwardRef } from "react"
import Input from "../Input/Input"

export interface TextFieldProps {
  /** Input type */
  type?: HTMLInputElement["type"]
  /** The label content */
  label?: string
  /** The value of the `input` element, required for a controlled component */
  value?: string
  /** Callback fired when the value is changed */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /** Placeholder text content */
  placeholder?: string

  /** The helper text content */
  helperText?: string
  /** If `true`, the `input` will be displayed in an error state */
  error?: boolean
  /** If `true`, the `input` element will be disabled */
  disabled?: boolean
  /** If `true`, the `input` is required */
  required?: boolean

  /** Text to show after label if field is required */
  requiredText?: string
  /** Text to show after label if field is not required (optional) */
  optionalText?: string

  /** The id of the `input` element. Use this prop to make label and `helperText` accessible for screen readers */
  id?: string
  /** Text  */
  unit?: string

  // Icon?: React.Component
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      id,
      type = "text",
      value,
      onChange,
      label,
      placeholder,
      disabled = false,
      error = false, //TODO: error state, needs design
      helperText,
      required = false,
      requiredText = "required",
      optionalText = "optional",
      // Icon, //TODO: icon library to be defined
      unit,
    }: TextFieldProps,
    ref
  ) {
    const helperTextId = helperText && id ? `${id}-helper-text` : undefined
    const inputLabelId = label && id ? `${id}-label` : undefined

    return (
      <Flex sx={{ flexDirection: "column", gap: 2 }}>
        {label && (
          <Flex sx={{ gap: 1 }}>
            <label
              htmlFor={id}
              id={inputLabelId}
              sx={{
                // TODO: use typography styles
                color: "text",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              {label}
            </label>
            <span
              sx={{
                // TODO: use typography styles
                color: "muted",
                fontWeight: 500,
                fontSize: 13,
              }}
            >
              ({required ? requiredText : optionalText})
            </span>
          </Flex>
        )}

        <Input
          id={id}
          type={type}
          ref={ref}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={onChange}
          error={error}
          unit={unit}
          aria-describedby={helperTextId}
        />

        {helperText && (
          <span
            id={helperTextId}
            sx={{
              // TODO: use typography styles
              color: "muted",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            {helperText}
          </span>
        )}
      </Flex>
    )
  }
)

export default TextField
