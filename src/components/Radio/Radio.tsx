/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import { ChangeEvent, forwardRef } from "react"

export interface RadioProps {
  /** The label content */
  label?: string
  /** The value of the `input` element, required for a controlled component */
  value?: string
  /** Callback fired when the value is changed */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /** If `true`, the `input` is required */
  required?: boolean
  /** The id of the `input` element. Use this prop to make label and `helperText` accessible for screen readers */
  id?: string

  /** Radio identification */
  name?: string
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { id, value, label, name, onChange, required = false }: RadioProps,
  ref
) {
  return (
    <label
      sx={{
        position: "relative",
        display: "flex",
        paddingLeft: "28px",
        margin: 2,
        overflow: "auto",
        "&:hover input ~ span": {
          backgroundColor: "secondary.90",
        },
      }}
    >
      {label}
      <input
        sx={{
          position: "absolute",
          opacity: 0,
          cursor: "pointer",
          height: 0,
          width: 0,
          display: "flex",
          "&:checked + span": {
            backgroundColor: "secondary.90",
            "&:after": {
              content: `""`,
              display: "block",
              width: "8px",
              height: "8px",
              borderRadius: "8px",
              backgroundColor: "secondary.0",
            },
          },
        }}
        id={id}
        type="radio"
        ref={ref}
        value={value}
        name={name}
        onChange={onChange}
        required={required}
      />
      <span
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "20px",
          width: "20px",
          borderRadius: "20px",
          backgroundColor: "text.95",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </label>
  )
})

export default Radio
