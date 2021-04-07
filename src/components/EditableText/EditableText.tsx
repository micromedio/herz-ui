/** @jsxRuntime classic /
/** @jsx jsx */
import { HerzUITheme, jsx } from "theme-ui"
import { forwardRef, useRef, useState } from "react"
import Button from "../Button/Button"

export interface EditableTextProps {
  /** The text value and initial value of the `input` element */
  value: string

  loading?: boolean
  state?: "error" | "success" | "normal"

  onSave?: (value: string) => void

  saveOnBlur?: boolean
  resetOnBlur?: boolean
}

const EditableText = forwardRef<HTMLInputElement, EditableTextProps>(
  function EditableText(
    {
      value: initialValue,
      state = "normal",
      onSave,
      saveOnBlur = false,
      resetOnBlur = true,
    }: EditableTextProps,
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [value, setValue] = useState(initialValue)

    return (
      <div
        ref={containerRef}
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: 2,

          paddingY: 1,
          paddingX: 3,
          backgroundColor: "transparent",
          outline: 0,
          borderRadius: 2,
          border: "2px solid transparent",

          transition: "all 0.2s",
          "&:hover": {
            backgroundColor: "text.alpha.95",
          },
          "&:focus-within": {
            borderColor: "secondary.0",
            boxShadow: (theme: HerzUITheme) =>
              `0px 0px 0px 4px ${theme.colors.secondary.alpha[90]}`,
            backgroundColor: "#FFF",
          },
          "&:not(:focus-within)": {
            ".editable-text-actions": {
              display: "none",
              opacity: 0,
            },
          },
        }}
        onBlur={(event) => {
          const blurredInside =
            containerRef.current?.contains(event.target) &&
            containerRef.current?.contains(event.relatedTarget as Element)

          if (!blurredInside) {
            if (saveOnBlur) onSave?.(value)
            if (resetOnBlur) setValue(initialValue)
          }
        }}
      >
        <input
          type="text"
          ref={ref}
          value={value}
          onChange={(event) => {
            setValue(event?.target?.value)
          }}
          aria-invalid={state === "error"}
          size={1} // input has a default size property of 20, which limits it's minimum width. Setting it to 1 and handling width through the parent so that we can control the input width better.
          sx={{
            width: "100%",
            flexGrow: 1,
            outline: 0,
            backgroundColor: "transparent",
            border: "none",
            p: 0,
            py: "2px", // the 2px border counts towards height, so we need 6px instead of 8px for the correct height
            color: "text.0",
            variant: "text.body1",
          }}
        />
        <div
          sx={{
            display: "flex",
            gap: 1,
          }}
          className="editable-text-actions"
        >
          <Button
            size="small"
            color="text"
            iconName="IconX"
            onClick={(event) => {
              setValue(initialValue)
              event.currentTarget.blur()
            }}
          />
          <Button
            size="small"
            color="text"
            iconName="IconCheck"
            onClick={() => onSave?.(value)}
          />
        </div>
      </div>
    )
  }
)

export default EditableText
