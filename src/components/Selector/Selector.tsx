/** @jsxRuntime classic /*
/** @jsx jsx */
import React, { useMemo } from "react"
import { Flex as div, HerzUITheme, jsx } from "theme-ui"

import { useSelector, SELECTOR_BULK_ACTIONS } from "./hooks/useSelector"
import Checkbox from "../Checkbox/Checkbox"
import { Button, Popover } from ".."
import Icon from "../Icon/Icon"

export type SelectorValue = string | number
export type SelectedItems = Array<SelectorValue>

export type SelectorOption = {
  value: string | number
  label: React.ReactNode
}

export interface SelectorProps {
  /** Label text to be placed before the element */
  label?: string
  /** The placeholder text, shown when there is no selected value */
  placeholder?: string
  /** Options to be selected */
  options: Array<SelectorOption>
  /** The value of the `select` element, required for a controlled component */
  value?: SelectorValue
  /** Default value which will not trigger the `filled` select state */
  defaultValue?: SelectorValue
  /** Whether the component is disabled or not */
  disabled?: boolean
  /** Whether the user can select multiple options or not */
  multi?: boolean
  /** Current selected items for multiple selection */
  selectedItems?: SelectedItems
  /** Default array of selected items which will not trigger the `filled` select state */
  defaultSelectedItems?: SelectedItems
  /** Callback fired when the value is changed */
  onChange?: (changes: SelectorValue) => void
  /** Callback fired when the selected items change for multiple selection */
  onSelectedItemsChange?: (changes: SelectedItems) => void
  /** Highlight the select when it's in a `filled` state */
  hightlightFilled?: boolean
  /** Select fills the width of  */
  fullWidth?: boolean
}

function isArrayEqual(
  value: Array<number | string>,
  other: Array<number | string>
): boolean {
  const otherSorted = other.slice().sort()

  const isEqual =
    value.length === other.length &&
    value
      .slice()
      .sort()
      .every(function (value, index) {
        return value === otherSorted[index]
      })

  return isEqual
}

/** Component responsible for rendering a select dropdown from given options */
const Selector = ({
  label,
  options = [],
  value,
  defaultValue,
  disabled = false,
  multi = false,
  placeholder,
  selectedItems = [],
  defaultSelectedItems,
  onChange,
  onSelectedItemsChange,
  hightlightFilled = true,
  fullWidth,
}: SelectorProps) => {
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
  } = useSelector({
    value,
    options,
    multi,
    selectedItems,
    onChange,
    onSelectedItemsChange,
  })

  const stateStyles = {
    resting: {
      backgroundColor: "text.alpha.95",
      color: "text.40",
      boxShadow: "unset",
      borderColor: "transparent",
    },
    hover: {
      backgroundColor: "text.alpha.90",
      color: "text.0",
      boxShadow: "unset",
      borderColor: "transparent",
    },
    active: {
      backgroundColor: "#fff",
      color: "text.0",
      boxShadow: (theme: HerzUITheme) =>
        `0px 0px 0px 4px ${theme.colors.secondary.alpha[95]}`,
      borderColor: "secondary.0",
      fontWeight: "semibold",
    },
    filled: {
      backgroundColor: "secondary.alpha.95",
      color: "text.0",
      boxShadow: "unset",
      ...(hightlightFilled
        ? {
            borderColor: "secondary.0",
            fontWeight: "semibold",
          }
        : {}),
    },
  }

  const getMultiSelectLabel = () => {
    if (selectedItems.length > 0) {
      if (selectedItems.length === options.length) {
        return "All"
      }
      if (selectedItems.length === 1) {
        return options.find(({ value }) => value === selectedItems[0])?.label
      }
      return selectedItems.length + " selected"
    }

    return placeholder || "Select one or more options"
  }

  const selectedOption = useMemo(() => {
    return (
      (selectedItem && options.find(({ value }) => value === selectedItem)) ||
      undefined
    )
  }, [options, selectedItem])

  const areInitialItemsSelected = useMemo(() => {
    return (
      defaultSelectedItems && isArrayEqual(defaultSelectedItems, selectedItems)
    )
  }, [defaultSelectedItems, selectedItems])

  const isInitialValueSelected = defaultValue && defaultValue === selectedItem

  const isSelectorFilled =
    !areInitialItemsSelected &&
    !isInitialValueSelected &&
    (selectedItem || selectedItems.length > 0)

  const hoverStyles = useMemo(() => {
    if (disabled) return {}
    if (isOpen) return stateStyles.active
    if (isSelectorFilled) return stateStyles.filled
    return stateStyles.hover
  }, [
    disabled,
    isOpen,
    isSelectorFilled,
    stateStyles.active,
    stateStyles.filled,
    stateStyles.hover,
  ])

  return (
    <div
      sx={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        opacity: disabled ? 0.3 : 1,
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
          {...getLabelProps({ disabled })}
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
          <ul
            {...getMenuProps(
              {
                disabled,
              },
              {
                suppressRefError: true,
              }
            )}
            sx={{
              maxHeight: 350,
              overflowY: "auto",
              padding: 4,
              outline: 0,
              margin: 0,
              marginTop: 1,
              listStyle: "none",
            }}
          >
            {options.map((item, index) => {
              const { label, value } = item
              const isSelected = multi && selectedItems.includes(value)

              return (
                <li
                  key={`${value}${index}`}
                  sx={{
                    padding: 2,
                    cursor: "pointer",
                    borderRadius: 2,
                    color: isSelected ? "text.0" : "text.40",
                    backgroundColor: "#fff",
                    whiteSpace: "nowrap",

                    ...(highlightedIndex === index
                      ? {
                          color: "text.0",
                          backgroundColor: "text.alpha.95",
                        }
                      : {}),

                    ...(selectedItem === value
                      ? {
                          color: "#fff",
                          backgroundColor: "secondary.0",
                          fontWeight: "bold",
                        }
                      : {}),
                    transition: "all .2s linear",
                  }}
                  {...getItemProps({
                    item: value,
                    index,
                    disabled,
                  })}
                >
                  <div>
                    {multi ? (
                      <Checkbox checked={isSelected} label={label} />
                    ) : (
                      label
                    )}
                  </div>
                </li>
              )
            })}
            {multi && (
              <li>
                <Button
                  variant="plain"
                  color="secondary"
                  sx={{
                    cursor: "pointer",
                    width: "100%",
                    justifyContent: "start",
                  }}
                  onClick={() => {
                    if (isSelectorFilled) {
                      handleBulkAction(SELECTOR_BULK_ACTIONS.DESELECT_ALL)
                      return true
                    }

                    handleBulkAction(SELECTOR_BULK_ACTIONS.SELECT_ALL)
                  }}
                >
                  {isSelectorFilled ? "Deselect all" : "Select all"}
                </Button>
              </li>
            )}
          </ul>
        }
      >
        <button
          sx={{
            display: "flex",
            gap: 2,
            borderRadius: 2,
            paddingX: 3,
            paddingY: 2,
            justifyContent: "space-between",
            alignItems: "center",
            outline: 0,
            border: "2px solid transparent",
            transition: "all .2s linear",
            fontFamily: "body",
            ...(fullWidth ? { flexGrow: 1 } : {}),
            ...(isSelectorFilled ? stateStyles.filled : stateStyles.resting),
            ...(!disabled && { cursor: "pointer" }),

            "&:hover": hoverStyles,
            ...(isOpen && stateStyles.active),
          }}
          type="button"
          {...getToggleButtonProps({
            ...getDropdownProps({ preventKeyAction: isOpen }),
            disabled,
          })}
        >
          {multi
            ? getMultiSelectLabel()
            : (selectedItem && selectedOption?.label) ||
              placeholder ||
              "Select an option"}
          <Icon name="IconChevronDown" size={12} stroke={3} />
        </button>
      </Popover>
    </div>
  )
}

export default Selector
