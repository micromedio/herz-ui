/** @jsxRuntime classic /
/** @jsx jsx */
import { HerzUITheme, jsx, SxStyleProp } from "theme-ui"
import { forwardRef, useEffect, useMemo, useRef, useState } from "react"
import Button from "../Button/Button"
import Spinner from "../Spinner/Spinner"
import Icon from "../Icon/Icon"

export interface EditableTextProps {
  /** The text value and initial value of the `input` element */
  value: string

  status?: "error" | "success" | "loading"
  helperText?: string

  onSave?: (value: string) => void

  saveOnBlur?: boolean
  resetOnBlur?: boolean
}

const EditableText = forwardRef<HTMLInputElement, EditableTextProps>(
  function EditableText(
    {
      value: initialValue,
      status,
      helperText = "",
      onSave,
      saveOnBlur = false,
      resetOnBlur = true,
    }: EditableTextProps,
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [value, setValue] = useState(initialValue)
    useEffect(() => setValue(initialValue), [initialValue])

    const state = useMemo(() => {
      if (status) return status
      return "default"
    }, [status])

    const styles: Record<string, SxStyleProp> = {
      active: {
        borderColor: "secondary.0",
        boxShadow: (theme: HerzUITheme) =>
          `0px 0px 0px 4px ${theme.colors.secondary.alpha[90]}`,
        backgroundColor: "#FFF",
      },
    }

    return (
      <div
        sx={{
          borderRadius: 2,

          ...{
            default: {},
            loading: {},
            success: {
              backgroundColor: "success.alpha.95",
            },
            error: {
              backgroundColor: "primary.alpha.95",
            },
          }[state],
        }}
      >
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
            ...(state === "loading" ? styles.active : {}),

            ...{
              default: {},
              loading: {},
              success: {
                borderColor: "success.0",
              },
              error: {
                borderColor: "primary.0",
              },
            }[state],

            transition: "all 0.2s",
            "&:hover": {
              ...(state === "default" && {
                backgroundColor: "text.alpha.95",
              }),
            },
            "&:focus-within": {
              ...styles.active,
            },
          }}
          onBlur={(event) => {
            if (state === "loading") return

            const blurredInside =
              containerRef.current?.contains(event.target) &&
              containerRef.current?.contains(event.relatedTarget as Element)
            if (blurredInside) return

            if (saveOnBlur && value !== initialValue) onSave?.(value)
            if (resetOnBlur) setValue(initialValue)
          }}
        >
          <input
            type="text"
            ref={ref}
            value={value}
            placeholder={value}
            onChange={(event) => setValue(event?.target?.value)}
            disabled={status === "loading"}
            aria-invalid={status === "error"}
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
          {
            {
              default: "",
              error: (
                <Icon
                  name="IconAlertCircle"
                  size={16}
                  sx={{ color: "primary.0" }}
                />
              ),
              loading: <Spinner />,
              success: (
                <Icon
                  name="IconCircleCheck"
                  size={16}
                  sx={{ color: "success.0" }}
                />
              ),
            }[state]
          }
          {value !== initialValue && (
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
                aria-label="reset"
                onClick={(event) => {
                  setValue(initialValue)
                  const target = event.currentTarget
                  setTimeout(() => target.blur()) // unfocus input in the next tick, when value is already reset
                }}
              />
              <Button
                size="small"
                color="text"
                iconName="IconCheck"
                aria-label="save"
                onClick={() => onSave?.(value)}
              />
            </div>
          )}
        </div>
        {helperText && (
          <div
            sx={{
              px: 3,
              py: 2,
              variant: "text.body1",
              ...{
                default: {},
                loading: {},
                success: {
                  color: "success.0",
                },
                error: {
                  color: "primary.0",
                },
              }[state],
            }}
          >
            {helperText}
          </div>
        )}
      </div>
    )
  }
)

export default EditableText
