/** @jsxRuntime classic /*
/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { useSelect } from "downshift"

interface DropdownSelectProps {
  label?: string
  options: Array<string>
}

/** Component responsible for rendering a select dropdown from given options */
const DropdownSelect = ({ label, options }: DropdownSelectProps) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items: options })
  return (
    <div>
      {label && <label {...getLabelProps()}>{label}</label>}
      <button type="button" {...getToggleButtonProps()}>
        {selectedItem || "Elements"}
      </button>
      <ul
        {...getMenuProps()}
        sx={{
          maxHeight: 80,
          maxWidth: 300,
          overflowY: "scroll",
          backgroundColor: "#eee",
          padding: 0,
          listStyle: "none",
          position: "relative",
        }}
      >
        {isOpen &&
          options.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: "#bde4ff" } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default DropdownSelect
