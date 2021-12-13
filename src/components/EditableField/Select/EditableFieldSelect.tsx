/** @jsxImportSource theme-ui */
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { get, ThemeUICSSObject } from "theme-ui"
import Select, { SelectProps } from "../../Select/Select"
import { SelectOption } from "../../Select/SelectOption"
import useEditableFieldGroup from "../hooks/useEditableFieldGroup"
import ButtonControl from "../ButtonControl/ButtonControl"

export interface EditableFieldSelectProps extends Omit<SelectProps, "label"> {
  name?: string

  status?: "error" | "success" | "loading"
  helperText?: string

  onSave?: (value: SelectProps["value"] | SelectProps["selectedItems"]) => void

  saveOnBlur?: boolean
  resetOnBlur?: boolean
  controlsGroup?: boolean
}

const EditableFieldSelect = ({
  name,
  status,
  helperText,
  onSave,
  saveOnBlur = false,
  resetOnBlur = true,
  controlsGroup,
  children,
  ...selectProps
}: EditableFieldSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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

  const state = useMemo(() => {
    if (groupStatus) return groupStatus
    if (status) return status
    return "default"
  }, [groupStatus, status])

  const value = useMemo(() => {
    if (selectProps.multi) return selectProps.selectedItems
    return selectProps.value
  }, [selectProps.multi, selectProps.selectedItems, selectProps.value])

  const defaultValue = useMemo(() => {
    if (selectProps.multi) return selectProps.defaultSelectedItems
    return selectProps.defaultValue
  }, [
    selectProps.defaultSelectedItems,
    selectProps.defaultValue,
    selectProps.multi,
  ])

  const showButtons = useMemo(() => {
    return register
      ? controlsGroup && (hasGroupChanged || state === "loading")
      : JSON.stringify(value) !== JSON.stringify(defaultValue) ||
          state === "loading"
  }, [controlsGroup, defaultValue, hasGroupChanged, register, state, value])

  const isSelectFocused = useMemo(() => {
    return register ? isGroupFocused : isFocused
  }, [isFocused, isGroupFocused, register])

  const resetValues = useCallback(() => {
    if (selectProps.multi) {
      if (selectProps.defaultSelectedItems) {
        selectProps.onSelectedItemsChange?.(selectProps.defaultSelectedItems)
      }
    } else {
      if (selectProps.defaultValue) {
        selectProps.onChange?.(selectProps.defaultValue)
      }
    }
  }, [selectProps])

  const saveValues = useCallback(() => {
    if (selectProps.multi) {
      onSave?.(selectProps.selectedItems)
    } else {
      onSave?.(selectProps.value)
    }
  }, [onSave, selectProps.multi, selectProps.selectedItems, selectProps.value])

  const onResetRef = useRef(resetValues)

  useEffect(() => {
    onResetRef.current = resetValues
  }, [resetValues])

  useEffect(() => {
    if (name)
      groupOnChange?.({
        name,
        value,
        defaultValue,
      })
  }, [defaultValue, groupOnChange, name, value])

  useEffect(() => {
    if (register) {
      if (name) {
        register?.({
          name,
          ref: containerRef,
          reset: () => onResetRef.current?.(),
        })
      } else {
        throw "An <EditableField.Select /> component wrapped in an <EditableField.Group /> needs to have a `name` prop"
      }
    }
  }, [name, register])

  const stateStyles: Record<string, ThemeUICSSObject> = {
    active: {
      backgroundColor: "#fff",
      color: "text",
      boxShadow: (theme) =>
        `0px 0px 0px 4px ${get(theme, "colors.secondary.alpha.95")}`,
      borderColor: "secondary",
      fontWeight: "semibold",
    },
  }

  return (
    <div
      ref={containerRef}
      onFocus={(event) => {
        groupOnFocus?.(event)
        setIsFocused(true)
      }}
      onBlur={(event) => {
        groupOnBlur?.(event)
        setIsFocused(false)
        const toElement = event.relatedTarget

        const blurredInside =
          containerRef.current?.contains(toElement as Element) ||
          (toElement as Element)?.id?.startsWith("downshift")

        if (!blurredInside) {
          setIsOpen(false)

          if (!register) {
            if (saveOnBlur) saveValues()
            else if (resetOnBlur) resetValues()
          }
        }
      }}
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
      <ButtonControl
        isLoading={state === "loading"}
        showButtons={showButtons}
        onSave={() => {
          if (groupOnSave) groupOnSave()
          else saveValues()
          setIsFocused(false)
        }}
        onReset={() => {
          if (groupOnReset) groupOnReset()
          else resetValues()
          setIsFocused(false)
        }}
      >
        <Select
          {...selectProps}
          fullWidth
          isOpen={isOpen}
          onIsOpenChange={setIsOpen}
          defaultValue={undefined}
          defaultSelectedItems={undefined}
          styles={{
            root: {
              borderRadius: 2,
              "&:hover": {
                ...(state === "default" && {
                  backgroundColor: "text.alpha.95",
                }),
              },
            },
            button: {
              display: "flex",
              width: "100%",
              alignItems: "center",
              gap: 2,

              paddingY: 1,
              paddingX: 3,
              backgroundColor: "transparent",
              outline: 0,
              borderRadius: 2,
              border: "2px solid",
              borderColor: "transparent",
              color: "text",

              ...{
                default: {},
                loading: stateStyles.active,
                success: {
                  borderColor: "success",
                },
                error: {
                  borderColor: "primary",
                },
              }[state],

              transition: "all 0.2s",
              "&:hover": {},
              ...(isOpen && stateStyles.active),
              ...(isSelectFocused && stateStyles.active),
              "> span": {
                variant: "text.body1",
              },
            },
          }}
        >
          {children}
        </Select>
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
                color: "success",
              },
              error: {
                color: "primary",
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

EditableFieldSelect.Option = SelectOption
export default EditableFieldSelect
