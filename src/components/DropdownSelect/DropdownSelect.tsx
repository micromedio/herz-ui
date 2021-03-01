/** @jsxRuntime classic /*
/** @jsx jsx */
import React from "react"
import { Flex, jsx } from "theme-ui"
import { useSelect, UseSelectStateChange } from "downshift"

export interface DropdownSelectProps {
  /** Label text to be placed before the element */
  label?: string
  /** Options to be selected */
  options: Array<{
    value: string | number
    label: string
  }>
  /** The value of the `input` element, required for a controlled component */
  value?: string | number
  /** Wether the component is disabled or not */
  disabled?: boolean
  /** Callback fired when the value is changed */
  onChange?: (changes: UseSelectStateChange<string | number>) => void
}

/** Component responsible for rendering a select dropdown from given options */
const DropdownSelect = ({
  label,
  options,
  value,
  disabled = false,
  onChange,
}: DropdownSelectProps) => {
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useSelect<string | number>({
    items: options.map((option) => option.value),
    selectedItem: value,
    onSelectedItemChange: onChange,
  })

  /** @TODO add colors to theme file */
  const stateStyles = {
    resting: {
      backgroundColor: "#F4F4F4",
      color: "#777779",
      boxShadow: "unset",
      borderColor: "transparent",
    },
    hover: {
      backgroundColor: "#E8E8E9",
      color: "text",
      boxShadow: "unset",
      borderColor: "transparent",
    },
    active: {
      backgroundColor: "#fff",
      color: "text",
      boxShadow: "0px 0px 0px 4px rgba(0, 130, 252, 0.06)",
      borderColor: "#0082FC",
      fontWeight: 600,
    },
    filled: {
      backgroundColor: "rgba(0, 130, 252, 0.06)",
      color: "text",
      boxShadow: "unset",
      borderColor: "#0082FC",
      fontWeight: 600,
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
            color: "muted",
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
          {...getToggleButtonProps({ disabled })}
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
            border: "1px solid #E9EBED",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
            zIndex: 9,
            transition: "all .2s linear",
          }}
        >
          {options.map((item, index) => (
            <li
              key={`${item}${index}`}
              sx={{
                padding: 2,
                cursor: "pointer",
                borderRadius: 2,
                color:
                  selectedItem === item.value
                    ? "#fff"
                    : highlightedIndex === index
                    ? "#0082FC" // @TODO move color to theme
                    : "text",
                backgroundColor:
                  selectedItem === item.value
                    ? "highlight"
                    : highlightedIndex === index
                    ? "medium_emphasis"
                    : "#fff",
                transition: "all .2s linear",
              }}
              {...getItemProps({
                item: item.value,
                index,
                disabled,
              })}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </Flex>
  )
}

export default DropdownSelect
