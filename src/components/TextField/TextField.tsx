/** @jsxImportSource theme-ui */
import { ChangeEvent, FocusEvent, forwardRef } from "react"
import Select, { SelectProps } from "../Select/Select"
import Input, { InputProps } from "../Input/Input"

interface BaseTextFieldProps {
  /** Input type */
  type?: HTMLInputElement["type"]
  /** The label content */
  label?: string
  /** Placeholder text content */
  placeholder?: string

  /** The helper text content */
  helperText?: string
  /** Controls which state the `input` will be displayed in */
  state?: "default" | "error" | "success"
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
  /** Text at the end of the input */
  unit?: string

  iconName?: InputProps["iconName"]

  /** Will render a textarea instead of an input if `true` */
  multiline?: boolean
  /** If true, the textarea will grow as the user types */
  autoExpand?: boolean
  /** Number of textarea cols */
  cols?: number
  /** Number of textarea rows */
  rows?: number
  /** Input form id */
  form?: string
}

interface InputTextFieldProps extends BaseTextFieldProps {
  /** The value of the `input` element, required for a controlled component */
  value?: string
  /** Callback fired when the value is changed */
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  /** Callback fired when the input is unfocused */
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void

  /** Will render a Select instead of an Input if `true` */
  select?: false
}

interface SelectTextFieldProps extends BaseTextFieldProps {
  /** Will render a Select instead of an Input if `true` */
  select: true
  /** Props passed to the Select component when `select` is `true` */
  selectProps: Omit<SelectProps, "fullWidth" | "hightlightFilled" | "children">
  children: SelectProps["children"]
}

export type TextFieldProps = InputTextFieldProps | SelectTextFieldProps

const TextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextFieldProps
>(function TextField(props: TextFieldProps, ref) {
  const {
    id,
    type = "text",
    label,
    placeholder,
    disabled = false,
    state = "default",
    helperText,
    required = false,
    requiredText = "required",
    optionalText = "optional",
    iconName,
    unit,
    multiline,
    autoExpand = true,
    rows = 1,
    cols,
    form,
    select,
  } = props

  const helperTextId = helperText && id ? `${id}-helper-text` : undefined
  const inputLabelId = label && id ? `${id}-label` : undefined

  return (
    <div
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      {label && (
        <div sx={{ display: "flex", gap: 1 }}>
          <label
            htmlFor={id}
            id={inputLabelId}
            sx={{
              color: "text",
              variant: "text.body1",
            }}
          >
            {label}
          </label>
          <span
            sx={{
              color: "text.40",
              variant: "text.body2",
            }}
          >
            ({required ? requiredText : optionalText})
          </span>
        </div>
      )}

      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 2,

          ...{
            default: {},
            success: {
              backgroundColor: "success.alpha.95",
            },
            error: {
              backgroundColor: "primary.alpha.95",
            },
          }[state],
        }}
      >
        {select ? (
          <Select
            id={id}
            placeholder={placeholder}
            {...props.selectProps}
            fullWidth
            highlightFilled={false}
          >
            {props.children}
          </Select>
        ) : (
          <Input
            id={id}
            type={type}
            ref={ref}
            placeholder={placeholder}
            iconName={iconName}
            value={props.value}
            disabled={disabled}
            onChange={props.onChange}
            onBlur={props.onBlur}
            state={state}
            unit={unit}
            multiline={multiline}
            autoExpand={autoExpand}
            rows={rows}
            cols={cols}
            aria-describedby={helperTextId}
            form={form}
          />
        )}
        {helperText && (
          <span
            id={helperTextId}
            sx={{
              ...{
                default: {
                  color: "text.40",
                  variant: "text.body2",
                },
                success: {
                  px: 3,
                  pb: 2,
                  color: "success",
                  variant: "text.body1",
                },
                error: {
                  px: 3,
                  pb: 2,
                  color: "primary",
                  variant: "text.body1",
                },
              }[state],
            }}
          >
            {helperText}
          </span>
        )}
      </div>
    </div>
  )
})

export default TextField
