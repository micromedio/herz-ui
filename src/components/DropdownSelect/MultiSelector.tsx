/** @jsxRuntime classic /*
/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import {
  useMultipleSelection,
  useSelect,
  UseSelectStateChange,
} from "downshift"

import Selector, { StateReducer } from "./Selector"
import { Option } from "./DropdownSelect"

export interface MultiSelectorProps {
  /** Label text to be placed before the element */
  label?: string
  /** Options to be selected */
  options: Array<Option>
  /** Whether the component is disabled or not */
  disabled?: boolean
  /** Enable it if the user should be able to select multiple options */
  multi?: boolean
  /** Callback fired when the value is changed */
  onChange?: (selectedItems: Array<Option>) => void
}

const stateReducer: StateReducer = (state, actionAndChanges) => {
  const { changes, type } = actionAndChanges

  switch (type) {
    case useSelect.stateChangeTypes.MenuKeyDownEnter:
    case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
    case useSelect.stateChangeTypes.ItemClick:
      return {
        ...changes,
        isOpen: true, // keep the menu open after selection.
      }
  }
  return changes
}

const MultiSelector = ({
  label,
  options,
  disabled = false,
  onChange,
}: MultiSelectorProps) => {
  const {
    getSelectedItemProps,
    getDropdownProps,
    removeSelectedItem,
    addSelectedItem,
    selectedItems,
  } = useMultipleSelection<Option>()

  const onStateChange = ({
    type,
    selectedItem,
  }: UseSelectStateChange<Option>) => {
    switch (type) {
      case useSelect.stateChangeTypes.MenuKeyDownEnter:
      case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
      case useSelect.stateChangeTypes.ItemClick:
        if (selectedItem && onChange) {
          addSelectedItem(selectedItem)

          const newArray: Array<Option> = []
          const updated = newArray.concat(selectedItems, selectedItem)
          onChange(updated)
        }
        break
      default:
        break
    }
  }

  const handleRemoveItem = (selectedItem: Option) => {
    if (removeSelectedItem) removeSelectedItem(selectedItem)

    const selectedIndex = selectedItems.indexOf(selectedItem)
    const updated = selectedItems.filter(
      (item, index) => index !== selectedIndex
    )

    if (onChange) onChange(updated)
  }

  const availableOptions = options.filter(
    (option) => !selectedItems.includes(option)
  )

  return (
    <Selector
      label={label}
      disabled={disabled}
      options={availableOptions}
      /** Props for multi-select */
      multi={true}
      selectedItems={selectedItems}
      onStateChange={onStateChange}
      getDropdownProps={getDropdownProps}
      stateReducer={stateReducer}
      getSelectedItemProps={getSelectedItemProps}
      handleRemoveItem={handleRemoveItem}
    />
  )
}

export default MultiSelector
