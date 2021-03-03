/** @jsxRuntime classic /*
/** @jsx jsx */
import React from "react"
import { Flex, HerzUITheme, jsx } from "theme-ui"
import { useSelect, UseSelectStateChange } from "downshift"
import Icon from "../Icon/Icon"

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
            gap: 2,
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
          {...getToggleButtonProps({ disabled })}
        >
          <span>
            {(selectedItem && selectedOption?.label) || "Select an option"}
          </span>
          <Icon name="IconChevronDown" size={12} stroke={3} />
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
          {options.map((item, index) => (
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
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </Flex>
  )
}

export default DropdownSelect
