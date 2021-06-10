/** @jsxImportSource theme-ui */
import React, { useContext, useMemo } from "react"
import { get, ThemeUICSSObject } from "theme-ui"

import {
  useSelect,
  SELECT_BULK_ACTIONS,
  UseSelectProps,
} from "./hooks/useSelect"
import { Button, Popover, Icon } from ".."
import { InputGroupContext } from "../InputGroup/Context"
import { getDataFromChildren, isArrayEqual } from "./utils"
import { SelectOption } from "./SelectOption"
import { SelectContext } from "./context"

export type SelectValue = string | number | Record<string, unknown>
export type SelectedItems = Array<SelectValue>

export type SelectOptionType = {
  value: SelectValue
  label: React.ReactNode
  isCustom?: boolean
}

export interface SelectProps {
  /** The id of the Select. Use this prop to make label and `helperText` accessible for screen readers */
  id?: string
  /** Label text to be placed before the element */
  label?: string
  /** The placeholder text, shown when there is no selected value */
  placeholder?: string
  /** The value of the `select` element, required for a controlled component */
  value?: SelectValue
  /** Default value which will not trigger the `filled` select state */
  defaultValue?: SelectValue
  /** Whether the component is disabled or not */
  disabled?: boolean
  /** Whether the user can select multiple options or not */
  multi?: boolean
  /** Current selected items for multiple selection */
  selectedItems?: SelectedItems
  /** Default array of selected items which will not trigger the `filled` select state */
  defaultSelectedItems?: SelectedItems
  /** Callback fired when the value is changed */
  onChange?: (changes: SelectValue) => void
  /** Callback fired when the selected items change for multiple selection */
  onSelectedItemsChange?: (changes: SelectedItems) => void
  /** Highlight the select when it's in a `filled` state */
  highlightFilled?: boolean
  /** Select grows to fill the width of the parent */
  fullWidth?: boolean
  children: React.ReactNode
  renderButtonLabel?: ({
    value,
    selectedOption,
    selectedItems,
  }: {
    value?: SelectValue
    selectedOption?: SelectOptionType
    selectedItems?: SelectedItems
  }) => React.ReactNode
  styles?: {
    root?: ThemeUICSSObject
    popoverContent?: ThemeUICSSObject
    button?: ThemeUICSSObject
  }
  isOpen?: UseSelectProps["isOpen"]
  onIsOpenChange?: (value: boolean) => void
}

/**
 * Component responsible for rendering a select dropdown from given options
 */
const Select = ({
  id,
  label,
  value,
  defaultValue,
  disabled = false,
  multi = false,
  placeholder,
  selectedItems = [],
  defaultSelectedItems,
  onChange,
  onSelectedItemsChange,
  highlightFilled = true,
  fullWidth = false,
  children,
  renderButtonLabel,
  styles,
  isOpen: isOpenProp,
  onIsOpenChange,
}: SelectProps) => {
  const inputGroupContext = useContext(InputGroupContext)
  const isGrouped = !!inputGroupContext

  const options = useMemo(() => {
    return getDataFromChildren(children)
  }, [children])

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getDropdownProps,
    handleBulkAction,
    selectItem,
    closeMenu,
    openMenu,
  } = useSelect({
    isOpen: isOpenProp,
    onIsOpenChange: onIsOpenChange
      ? ({ isOpen }) => onIsOpenChange(isOpen || false)
      : undefined,
    value,
    options,
    multi,
    selectedItems,
    onChange,
    onSelectedItemsChange,
  })

  const stateStyles: Record<string, ThemeUICSSObject> = {
    resting: {
      backgroundColor: "text.alpha.95",
      color: "text.40",
      boxShadow: "unset",
      borderColor: "transparent",
    },
    hover: {
      backgroundColor: "text.alpha.90",
      color: "text",
      boxShadow: "unset",
      borderColor: "transparent",
    },
    active: {
      backgroundColor: "#fff",
      color: "text",
      boxShadow: (t) =>
        `0px 0px 0px 4px ${get(t, "colors.secondary.alpha.95")}`,
      borderColor: "secondary",
      fontWeight: "semibold",
    },
    filled: {
      backgroundColor: "secondary.alpha.90",
      color: "text",
      boxShadow: "unset",
      ...(highlightFilled
        ? {
            borderColor: "secondary",
            fontWeight: "semibold",
          }
        : {}),
    },
    filledHover: {
      backgroundColor: "secondary.alpha.85",
    },
  }

  const getMultiSelectLabel = () => {
    if (selectedItems.length > 0) {
      if (selectedItems.length === options.length) {
        return "All"
      }
      if (selectedItems.length === 1) {
        return options.find(
          ({ value }) =>
            JSON.stringify(selectedItems[0]) === JSON.stringify(value)
        )?.label
      }
      return selectedItems.length + " selected"
    }

    return placeholder || "Select one or more options"
  }

  const selectedOption = useMemo(() => {
    return (
      (selectedItem &&
        options.find(
          ({ value }) => JSON.stringify(selectedItem) === JSON.stringify(value)
        )) ||
      undefined
    )
  }, [options, selectedItem])

  const areInitialItemsSelected = useMemo(() => {
    return (
      defaultSelectedItems && isArrayEqual(defaultSelectedItems, selectedItems)
    )
  }, [defaultSelectedItems, selectedItems])

  const isInitialValueSelected =
    defaultValue &&
    JSON.stringify(defaultValue) === JSON.stringify(selectedItem)

  const isSelectFilled =
    !areInitialItemsSelected &&
    !isInitialValueSelected &&
    (selectedItem || selectedItems.length > 0)

  const hoverStyles = useMemo(() => {
    if (disabled) return {}
    if (isOpen) return stateStyles.active
    if (isSelectFilled) return stateStyles.filledHover
    return stateStyles.hover
  }, [
    disabled,
    isOpen,
    isSelectFilled,
    stateStyles.active,
    stateStyles.filledHover,
    stateStyles.hover,
  ])

  function defaultRenderButtonLabel() {
    return multi
      ? getMultiSelectLabel()
      : (selectedItem && selectedOption?.label) ||
          (placeholder !== undefined && placeholder) ||
          "Select an option"
  }

  return (
    <div
      sx={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        opacity: disabled ? 0.3 : 1,
        variant: "text.body1",
        ...(isGrouped && {
          ...(!inputGroupContext?.isLast && {
            borderRight: "1px solid",
            borderColor: "text.90",
            flexGrow: 0,
          }),
        }),
        ...styles?.root,
      }}
    >
      {label && (
        <label
          sx={{
            marginRight: 2,
            fontSize: 14,
            color: "text.40",
            ...(!disabled ? { cursor: "pointer" } : {}),
          }}
          {...getLabelProps({ disabled, htmlFor: id })}
        >
          {label}
        </label>
      )}

      <Popover
        isVisible={isOpen}
        isInteractive
        placement="bottom-start"
        noPadding
        content={
          <div
            {...getMenuProps(
              {
                disabled,
              },
              {
                suppressRefError: true,
              }
            )}
            onBlur={null}
            sx={{
              maxHeight: 350,
              overflowY: "auto",
              padding: 4,
              outline: 0,
              margin: 0,
              marginTop: 1,
              ...styles?.popoverContent,
            }}
          >
            {React.Children.map(children, (child, index) => {
              if (!React.isValidElement(child)) return null

              return (
                <SelectContext.Provider
                  value={{
                    index,
                    highlightedIndex,
                    selectItem,
                    selectedItem,
                    selectedItems,
                    multi,
                    getItemProps,
                    closeMenu,
                    openMenu,
                  }}
                >
                  {child}
                </SelectContext.Provider>
              )
            })}

            {multi && (
              <Button
                variant="plain"
                color="secondary"
                sx={{
                  cursor: "pointer",
                  width: "100%",
                  justifyContent: "start",
                }}
                onClick={() => {
                  if (selectedItems.length > 0) {
                    handleBulkAction(SELECT_BULK_ACTIONS.DESELECT_ALL)
                    return true
                  }

                  handleBulkAction(SELECT_BULK_ACTIONS.SELECT_ALL)
                }}
              >
                {selectedItems.length > 0 ? "Deselect all" : "Select all"}
              </Button>
            )}
          </div>
        }
      >
        <button
          sx={{
            display: "flex",
            gap: 2,
            borderRadius: 2,
            height: [40, 36],
            paddingX: 3,
            justifyContent: "space-between",
            alignItems: "center",
            outline: 0,
            border: "2px solid transparent",
            transition: "all .2s linear",

            ...(isGrouped && {
              ...(!inputGroupContext?.isFirst && {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }),
              ...(!inputGroupContext?.isLast && {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }),
            }),

            ...(fullWidth ? { flexGrow: 1 } : {}),
            ...(isSelectFilled ? stateStyles.filled : stateStyles.resting),
            ...(!disabled && { cursor: "pointer" }),

            "&:hover": hoverStyles,
            ...(isOpen && stateStyles.active),
            ...styles?.button,
          }}
          type="button"
          {...getToggleButtonProps({
            id,
            "aria-labelledby": "",
            ...getDropdownProps({ preventKeyAction: isOpen }),
            disabled,
          })}
        >
          <span>
            {renderButtonLabel?.({ selectedItems, selectedOption, value }) ??
              defaultRenderButtonLabel()}
          </span>
          <Icon name="IconChevronDown" size={12} stroke={3} />
        </button>
      </Popover>
    </div>
  )
}

Select.Option = SelectOption
export default Select
