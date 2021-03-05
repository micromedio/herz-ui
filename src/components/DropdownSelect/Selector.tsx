/** @jsxRuntime classic /*
/** @jsx jsx */
import React from "react"
import { Flex, HerzUITheme, jsx } from "theme-ui"
import {
  useSelect,
  UseSelectStateChange,
  UseMultipleSelectionSelectGetDropdownProps,
  UseSelectState,
  UseSelectStateChangeOptions,
  UseMultipleSelectionGetSelectedItemPropsOptions,
} from "downshift"

import { Option } from "./DropdownSelect"

export type StateReducer = (
  state: UseSelectState<Option>,
  actionAndChanges: UseSelectStateChangeOptions<Option>
) => Partial<UseSelectState<Option>>

export interface SelectorProps {
  /** Label text to be placed before the element */
  label?: string
  /** Options to be selected */
  options: Array<Option>
  /** The value of the `input` element, required for a controlled component */
  value?: Option
  /** Whether the component is disabled or not */
  disabled?: boolean
  onStateChange?(changes: UseSelectStateChange<Option>): void
  /** Callback fired when the value is changed */
  onChange?: (changes: Array<Option> | UseSelectStateChange<Option>) => void

  /** Props for multi-select controls */
  multi?: boolean
  selectedItems?: Array<Option>
  getDropdownProps?(
    options?: UseMultipleSelectionSelectGetDropdownProps
  ): Record<string, unknown>
  getSelectedItemProps?(
    props: UseMultipleSelectionGetSelectedItemPropsOptions<Option>
  ): Record<string, unknown>
  handleRemoveItem?: (item: Option) => void
  stateReducer?: StateReducer
}

const Selector = ({
  label,
  options,
  value,
  multi = false,
  disabled = false,
  selectedItems = [],
  onChange,
  onStateChange,
  /** Multi-select controls */
  getDropdownProps,
  getSelectedItemProps,
  handleRemoveItem,
  stateReducer,
}: SelectorProps) => {
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useSelect<Option>({
    items: options,
    selectedItem: multi ? null : value,
    defaultHighlightedIndex: 0,

    onStateChange,
    ...(multi
      ? {
          stateReducer,
        }
      : {
          onSelectedItemChange: onChange,
        }),
  })

  /** @TODO add colors to theme file */
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
    (selectedItem &&
      options.find(({ value }) => value === selectedItem.value)) ||
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
            color: "text.40",
            ...(!disabled ? { cursor: "pointer" } : {}),
          }}
          {...getLabelProps({ disabled })}
        >
          {label}
        </label>
      )}

      {multi &&
        selectedItems.map((selectedItem, index) => (
          <span
            key={`selected-item-${index}`}
            {...(getSelectedItemProps &&
              getSelectedItemProps({ selectedItem, index }))}
          >
            {selectedItem.label}
            <span
              onClick={() => handleRemoveItem && handleRemoveItem(selectedItem)}
            >
              &#10005;
            </span>
          </span>
        ))}

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
            ...(selectedItem ? stateStyles.filled : stateStyles.resting),
            ...(!disabled && { cursor: "pointer" }),

            "&:hover": {
              /** If there's a selectedItem, it means the element is on the active state */
              ...(selectedItem
                ? stateStyles.filled
                : !isOpen
                ? stateStyles.hover
                : {}),
            },

            ...(isOpen && {
              ...(selectedItem ? stateStyles.filled : stateStyles.active),
            }),
          }}
          data-testid="dropdown-select-button"
          type="button"
          {...getToggleButtonProps({
            disabled,
            ...(getDropdownProps &&
              getDropdownProps({ preventKeyAction: isOpen })),
          })}
        >
          {(selectedItem && selectedOption?.label) || "Select an option"}
        </button>
        <ul
          {...getMenuProps({ disabled })}
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
          {options.map((option, index) => {
            const { label, value } = option

            return (
              <li
                key={`${value}${index}`}
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

                  ...(selectedOption?.value === value
                    ? {
                        color: "#fff",
                        backgroundColor: "secondary.0",
                        fontWeight: "bold",
                      }
                    : {}),
                  transition: "all .2s linear",
                }}
                {...getItemProps({
                  item: option,
                  index,
                  disabled,
                })}
              >
                {label}
              </li>
            )
          })}
        </ul>
      </div>
    </Flex>
  )
}

export default Selector
