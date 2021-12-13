/** @jsxImportSource theme-ui */
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { get, ThemeUICSSObject } from "theme-ui"
import Autocomplete, {
  AutocompleteProps,
} from "../../Autocomplete/Autocomplete"
import useEditableFieldGroup from "../hooks/useEditableFieldGroup"
import ButtonControl from "../ButtonControl/ButtonControl"

export type EditableFieldAutocompleteProps<T> = AutocompleteProps<T> & {
  name?: string

  status?: "error" | "success" | "loading"
  helperText?: string

  onSave?: (value: AutocompleteProps<T>["selectedOption"]) => void

  controlsGroup?: boolean
}

const EditableFieldAutocomplete = <T extends unknown>({
  name,
  status,
  helperText,
  onSave,
  controlsGroup,
  ...autocompleteProps
}: EditableFieldAutocompleteProps<T>) => {
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
    return autocompleteProps.selectedOption
  }, [autocompleteProps.selectedOption])

  const showButtons = useMemo(() => {
    return register
      ? controlsGroup && (hasGroupChanged || state === "loading")
      : JSON.stringify(value) !==
          JSON.stringify(autocompleteProps.defaultSelectedOption) ||
          state === "loading"
  }, [
    autocompleteProps.defaultSelectedOption,
    controlsGroup,
    hasGroupChanged,
    register,
    state,
    value,
  ])

  const isAutocompleteFocused = useMemo(() => {
    return register ? isGroupFocused : isFocused
  }, [isFocused, isGroupFocused, register])

  const resetValues = useCallback(() => {
    if (autocompleteProps.multiSelect) {
      if (autocompleteProps.defaultSelectedOption) {
        autocompleteProps.onSelectedItemsChange(
          autocompleteProps.defaultSelectedOption
        )
      }
    } else {
      if (autocompleteProps.defaultSelectedOption) {
        autocompleteProps.onSelectedItemChange(
          autocompleteProps.defaultSelectedOption
        )
      }
    }
  }, [autocompleteProps])

  const saveValues = useCallback(() => {
    onSave?.(autocompleteProps.selectedOption)
  }, [autocompleteProps.selectedOption, onSave])

  const onResetRef = useRef(resetValues)

  useEffect(() => {
    onResetRef.current = resetValues
  }, [resetValues])

  useEffect(() => {
    if (name)
      groupOnChange?.({
        name,
        value,
        defaultValue: autocompleteProps.defaultSelectedOption,
      })
  }, [autocompleteProps.defaultSelectedOption, groupOnChange, name, value])

  useEffect(() => {
    if (register) {
      if (name) {
        register?.({
          disableActionsOnBlur: true,
          name,
          ref: containerRef,
          reset: () => onResetRef.current?.(),
        })
      } else {
        throw "An <EditableField.Autocomplete /> component wrapped in an <EditableField.Group /> needs to have a `name` prop"
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
        event.persist()
        groupOnBlur?.(event)
        const toElement = event.relatedTarget

        const blurredInside = containerRef.current?.contains(
          toElement as Element
        )

        if (!blurredInside && !register && !showButtons) {
          setIsFocused(false)
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
        <Autocomplete
          {...autocompleteProps}
          defaultSelectedOption={undefined}
          onIsOpenChange={(open) => setIsOpen(!!open)}
          styles={{
            ...autocompleteProps?.styles,
            root: {
              borderRadius: 2,
              "&:hover": {
                ...(state === "default" && {
                  backgroundColor: "text.alpha.95",
                }),
              },
              ...autocompleteProps?.styles?.root,
            },
            inputRoot: {
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
              ...((isOpen || isAutocompleteFocused || showButtons) &&
                stateStyles.active),
              "> span": {
                variant: "text.body1",
              },
              ...autocompleteProps?.styles?.inputRoot,
            },
          }}
        />
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

export default EditableFieldAutocomplete
