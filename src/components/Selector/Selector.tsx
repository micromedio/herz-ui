/** @jsxRuntime classic /*
/** @jsx jsx */
import React from "react"
import { Flex, HerzUITheme, jsx } from "theme-ui"
import { UseSelectStateChange } from "downshift"

import { useSelector } from "./hooks/useSelector"
import Checkbox from "../Checkbox/Checkbox"

export type SelectorValue = string | number
export type SelectedItems = Array<SelectorValue>

export type SelectorOption = {
  value: string | number
  label: string
}

export interface SelectorProps {
  /** Label text to be placed before the element */
  label?: string
  /** Options to be selected */
  options: Array<SelectorOption>
  /** The value of the `input` element, required for a controlled component */
  value?: SelectorValue
  /** Wether the component is disabled or not */
  disabled?: boolean
  multi?: boolean
  initialSelectedItems?: SelectedItems

  /** Callback fired when the value is changed */
  onChange?: (
    changes: UseSelectStateChange<SelectorValue> | SelectedItems
  ) => void
}

/** Component responsible for rendering a select dropdown from given options */
const Selector = ({
  label,
  options,
  value,
  disabled = false,
  multi = false,
  /** @TODO: add funtionality for initialSelectedITems */
  initialSelectedItems = [1, 2],
  onChange,
}: SelectorProps) => {
  const {
    isOpen,
    selectedItem,
    selectedItems,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getDropdownProps,
  } = useSelector({ value, options, multi, initialSelectedItems, onChange })

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

  const selectedOption =
    (selectedItem && options.find(({ value }) => value === selectedItem)) ||
    undefined

  return (
    <Flex
      sx={{
        alignItems: "center",
        position: "relative",
        opacity: disabled ? 0.3 : 1,
      }}
      data-testid="dropdown-select"
    >
      {label && (
        <label
          sx={{
            marginRight: 2,
            fontSize: 14,
            cursor: "pointer",
            color: "text.40",
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
            cursor: "pointer",
            paddingX: 3,
            paddingY: 2,
            justifyContent: "center",
            alignItems: "center",
            outline: 0,
            border: "2px solid transparent",
            transition: "all .2s linear",
            ...(selectedItem ? stateStyles.filled : stateStyles.resting),

            "&:hover": {
              /** If there's a selectedItem, it means the element is on the active state */
              ...(selectedItem ? stateStyles.filled : stateStyles.hover),
            },

            "&:focus": {
              ...(selectedItem ? stateStyles.filled : stateStyles.active),
            },
          }}
          data-testid="dropdown-select-button"
          type="button"
          {...getToggleButtonProps({
            ...getDropdownProps({ preventKeyAction: isOpen }),
            disabled,
          })}
        >
          {(selectedItem && selectedOption?.label) || "Select an option"}
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
            const isSelected = multi && selectedItems.includes(item.value)

            return (
              <li
                key={`${item}${index}`}
                sx={{
                  padding: 2,
                  cursor: "pointer",
                  borderRadius: 2,
                  color: "text.0",
                  backgroundColor: "#fff",

                  ...(highlightedIndex === index
                    ? {
                        color: "secondary.0",
                        backgroundColor: "secondary.alpha.95",
                      }
                    : {}),

                  ...(selectedItem === item.value
                    ? {
                        color: "#fff",
                        backgroundColor: "secondary.0",
                        fontWeight: "bold",
                      }
                    : {}),
                  transition: "all .2s linear",
                }}
                {...getItemProps({
                  item: item.value,
                  index,
                  disabled,
                })}
              >
                <Flex>
                  {multi ? (
                    <Checkbox checked={isSelected} label={item.label} />
                  ) : (
                    item.label
                  )}
                </Flex>
              </li>
            )
          })}
        </ul>
      </div>
    </Flex>
  )
}

export default Selector
