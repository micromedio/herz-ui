/** @jsxRuntime classic /
/** @jsx jsx */
import { HerzUITheme, jsx, SxStyleProp } from "theme-ui"
import {
  forwardRef,
  HTMLAttributes,
  useMemo,
  useRef,
  useImperativeHandle,
  useCallback,
  useEffect,
  RefObject,
} from "react"
import Icon from "../../Icon/Icon"
import useEditableFieldGroup from "../hooks/useEditableFieldGroup"
import ButtonControl from "../ButtonControl/ButtonControl"
import { autoExpander } from "../../Input/Input"

export interface EditableFieldTextProps {
  /** The text value and initial value of the `input` element */
  defaultValue: string
  value: string
  name?: string
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void

  status?: "error" | "success" | "loading"
  helperText?: string

  onSave?: (value: string) => void

  saveOnBlur?: boolean
  resetOnBlur?: boolean
  className?: HTMLAttributes<HTMLDivElement>["className"]
  controlsGroup?: boolean

  // When true renders a textarea instead of an input
  multiline?: boolean
  rows?: number
}

const EditableText = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  EditableFieldTextProps
>(function EditableText(
  {
    value,
    defaultValue,
    name,
    onChange,
    status,
    helperText = "",
    onSave,
    saveOnBlur = false,
    resetOnBlur = true,
    className,
    controlsGroup = false,
    multiline,
    rows = 1,
  }: EditableFieldTextProps,
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  useImperativeHandle<
    HTMLInputElement | HTMLTextAreaElement | null,
    HTMLInputElement | HTMLTextAreaElement | null
  >(ref, () => inputRef.current)

  const styles: Record<string, SxStyleProp> = {
    active: {
      borderColor: "secondary.0",
      boxShadow: (theme: HerzUITheme) =>
        `0px 0px 0px 4px ${theme.colors.secondary.alpha[90]}`,
      backgroundColor: "#FFF",
    },
  }

  const onReset = useCallback(
    (_event) => {
      const event = Object.create(_event)
      event.type = "change"
      event.target = inputRef.current
      event.currentTarget = inputRef.current
      if (inputRef.current) inputRef.current.value = defaultValue

      onChange?.(event)
    },
    [defaultValue, onChange]
  )

  const {
    hasChanged: hasGroupChanged,
    isFocused: isGroupFocused,
    onBlur: groupOnBlur,
    onFocus: groupOnFocus,
    onChange: groupOnChange,
    onSave: groupOnSave,
    onReset: groupOnReset,
    register,
    status: groupStatus,
  } = useEditableFieldGroup()

  const onResetRef = useRef(onReset)

  useEffect(() => {
    onResetRef.current = onReset
  }, [onReset])

  useEffect(() => {
    if (name) groupOnChange?.({ name, value, defaultValue })
  }, [defaultValue, groupOnChange, name, value])

  useEffect(() => {
    if (register) {
      if (name) {
        register?.({
          name,
          ref: containerRef,
          reset: () => onResetRef.current?.({}),
        })
      } else {
        throw "An <EditableText /> component wrapped in an <EditableField.Group /> needs to have a `name` prop"
      }
    }
  }, [name, register])

  useEffect(() => {
    // Responsible for resizing the textarea on the first render or value changes
    autoExpander(inputRef?.current as HTMLTextAreaElement)
  }, [value])

  const state = useMemo(() => {
    if (groupStatus) return groupStatus
    if (status) return status
    return "default"
  }, [groupStatus, status])

  const showButtons = useMemo(() => {
    return register
      ? controlsGroup && (hasGroupChanged || state === "loading")
      : value !== defaultValue || state === "loading"
  }, [controlsGroup, defaultValue, hasGroupChanged, register, state, value])

  return (
    <div
      ref={containerRef}
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
      onFocus={groupOnFocus}
      onBlur={(event) => {
        if (state === "loading") return

        if (groupOnBlur) return groupOnBlur(event)

        const blurredInside =
          containerRef.current?.contains(event.target) &&
          containerRef.current?.contains(event.relatedTarget as Element)
        if (blurredInside) return

        if (saveOnBlur) {
          if (value !== defaultValue) onSave?.(value)
        } else if (resetOnBlur) {
          onReset(event)
        }
      }}
      className={className}
    >
      <ButtonControl
        isLoading={state === "loading"}
        showButtons={showButtons}
        onSave={() => {
          if (groupOnSave) return groupOnSave()
          onSave?.(value)
        }}
        onReset={(_event) => {
          if (groupOnReset) return groupOnReset()
          onReset(_event)
          const target = _event.currentTarget
          setTimeout(() => target.blur()) // unfocus element in the next tick, when value is already reset
        }}
      >
        <div
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

            ...{
              default: {},
              loading: styles.active,
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
            ...(isGroupFocused ? styles.active : {}),
          }}
        >
          {multiline ? (
            <textarea
              aria-invalid={status === "error"}
              defaultValue={onChange ? undefined : value}
              disabled={status === "loading"}
              name={name}
              onChange={onChange}
              onInput={(event) => autoExpander(event.currentTarget)}
              placeholder={defaultValue}
              ref={inputRef as RefObject<HTMLTextAreaElement>}
              rows={rows}
              sx={{
                backgroundColor: "transparent",
                border: "none",
                color: "text.0",
                flexGrow: 1,
                outline: 0,
                p: 0,
                py: "2px", // the 2px border counts towards height, so we need 6px instead of 8px for the correct height
                resize: "none",
                variant: "text.body1",
                width: "100%",
              }}
              value={onChange ? value : undefined}
            />
          ) : (
            <input
              type="text"
              ref={inputRef as RefObject<HTMLInputElement>}
              name={name}
              value={onChange ? value : undefined}
              defaultValue={onChange ? undefined : value}
              placeholder={defaultValue}
              onChange={onChange}
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
          )}
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
              loading: "",
              success: (
                <Icon
                  name="IconCircleCheck"
                  size={16}
                  sx={{ color: "success.0" }}
                />
              ),
            }[state]
          }
        </div>
      </ButtonControl>
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
})

export default EditableText
