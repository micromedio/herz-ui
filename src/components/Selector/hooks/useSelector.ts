import { useMultipleSelection, useSelect } from "downshift"
import { useState } from "react"

import { SelectorProps, SelectedItems, SelectorValue } from "../Selector"

export function useSelector({
  initialSelectedItems,
  options,
  multi,
  value,
  onChange,
}: SelectorProps) {
  const [selectedItems, setSelectedItems] = useState<SelectedItems>([])

  const handleRemoveSelectedItem = (selectedItem: SelectorValue) => {
    setSelectedItems((previous: SelectedItems) =>
      previous.filter((selectedOption) => selectedOption !== selectedItem)
    )
  }

  const handleAddSelectedItem = (selectedItem: SelectorValue) => {
    setSelectedItems((previous: SelectedItems) =>
      previous.concat([selectedItem])
    )
  }

  const { getDropdownProps } = useMultipleSelection({
    selectedItems,
    initialSelectedItems,
  })

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect<SelectorValue>({
    items: options.map((option) => option.value),
    selectedItem: multi ? null : value,
    defaultHighlightedIndex: 0,
    ...(multi
      ? {
          stateReducer: (state, actionAndChanges) => {
            const { changes, type } = actionAndChanges

            switch (type) {
              case useSelect.stateChangeTypes.MenuKeyDownEnter:
              case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
              case useSelect.stateChangeTypes.ItemClick:
              case useSelect.stateChangeTypes.FunctionSelectItem:
                return {
                  ...changes,
                  isOpen: true, // keep the menu open after selection.
                  // highlightedIndex: 5,
                }
            }
            return changes
          },
          onStateChange: ({ type, selectedItem }) => {
            switch (type) {
              case useSelect.stateChangeTypes.MenuKeyDownEnter:
              case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
              case useSelect.stateChangeTypes.ItemClick:
                if (selectedItem) {
                  const isSelected = selectedItems.includes(selectedItem)

                  if (isSelected) {
                    handleRemoveSelectedItem(selectedItem)
                  } else {
                    handleAddSelectedItem(selectedItem)
                  }
                }
                break
              default:
                break
            }
          },
        }
      : {
          onSelectedItemChange: onChange,
        }),
  })

  return {
    isOpen,
    selectedItem,
    selectedItems,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getDropdownProps,
  }
}
