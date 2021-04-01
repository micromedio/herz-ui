/** @jsxRuntime classic /*
/** @jsx jsx */
import React from "react"
import { Flex, HerzUITheme, jsx } from "theme-ui"

import { useSelector, SELECTOR_BULK_ACTIONS } from "./hooks/useSelector"
import Checkbox from "../Checkbox/Checkbox"
import { Button } from ".."

export type SelectorValue = string | number
export type SelectedItems = Array<SelectorValue>

export type SelectorOption = {
  value: string | number
  label: React.ReactNode
}

export interface SelectorProps {
  /** Label text to be placed before the element */
  label?: string
  /** Options to be selected */
  options: Array<SelectorOption>
  /** The value of the `input` element, required for a controlled component */
  value?: SelectorValue
  /** Value which will not trigger the `filled` select state */
  initialValue?: SelectorValue
  /** Whether the component is disabled or not */
  disabled?: boolean
  /** Whether the user can select multiple options or not */
  multi?: boolean
  /** Current selected items for multiple selection */
  selectedItems?: SelectedItems
  /** Items which will not trigger the `filled` select state */
  initialSelectedItems?: SelectedItems
  /** Callback fired when the value is changed */
  onChange?: (changes: SelectorValue) => void
  /** Callback fired when the selected items change for multiple selection */
  onSelectedItemsChange?: (changes: SelectedItems) => void
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
  initialValue,
  disabled = false,
  multi = false,
  selectedItems = [],
  initialSelectedItems,
  onChange,
  onSelectedItemsChange,
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
      borderColor: "secondary.0",
      fontWeight: "semibold",
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

    return "Select one or more options"
  }

  const selectedOption =
    (selectedItem && options.find(({ value }) => value === selectedItem)) ||
    undefined

  const areInitialItemsSelected =
    initialSelectedItems && isArrayEqual(initialSelectedItems, selectedItems)

  const isInitialValueSelected = initialValue && initialValue === selectedItem

  const isSelectorFilled =
    !areInitialItemsSelected &&
    !isInitialValueSelected &&
    (selectedItem || selectedItems.length > 0)

  return (
    <Flex
      sx={{
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

      <div
        sx={{
          position: "relative",
        }}
      >
        <button
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            paddingX: 3,
            paddingY: 2,
            justifyContent: "center",
            alignItems: "center",
            outline: 0,
            border: "2px solid transparent",
            transition: "all .2s linear",
            fontFamily: "body",
            ...(isSelectorFilled ? stateStyles.filled : stateStyles.resting),
            ...(!disabled && { cursor: "pointer" }),

            "&:hover": {
              /** If there's a selectedItem, it means the element is on the filled state */
              ...(!disabled &&
                (isSelectorFilled
                  ? stateStyles.filled
                  : !isOpen
                  ? stateStyles.hover
                  : {})),
            },

            ...(isOpen && {
              ...(isSelectorFilled ? stateStyles.filled : stateStyles.active),
            }),
          }}
          type="button"
          {...getToggleButtonProps({
            ...getDropdownProps({ preventKeyAction: isOpen }),
            disabled,
          })}
        >
          {multi
            ? getMultiSelectLabel()
            : (selectedItem && selectedOption?.label) || "Select an option"}
        </button>
        <ul
          {...getMenuProps({
            disabled,
          })}
          sx={{
            maxHeight: 350,
            maxWidth: 300,
            position: "absolute",
            overflowY: "scroll",
            display: isOpen ? "block" : "none",
            left: 0,
            top: 35,
            marginTop: 3,
            padding: 4,
            borderRadius: 4,
            outline: 0,
            listStyle: "none",
            border: (theme: HerzUITheme) =>
              `1px solid ${theme.colors.text[90]}`,
            backgroundColor: "#fff",
            boxShadow: "0px 1px 12px rgba(0, 0, 0, 0.16)",
            zIndex: 9,
            transition: "all .2s linear",
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
                <Flex>
                  {multi ? (
                    <Checkbox checked={isSelected} label={label} />
                  ) : (
                    label
                  )}
                </Flex>
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
      </div>
    </Flex>
  )
}

export default Selector
