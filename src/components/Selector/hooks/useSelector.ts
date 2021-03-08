import { useMultipleSelection, useSelect } from "downshift"
import { useState } from "react"

import { SelectorOption, SelectorProps } from "../Selector"

export function useSelector({
  initialSelectedItems,
  options,
  multi,
  value,
  onChange,
}: SelectorProps) {
  const [selectedItems, setSelectedItems] = useState<Array<SelectorOption>>([])

  const handleRemoveSelectedItem = (selectedItem: SelectorOption) => {
    setSelectedItems((previous: SelectorOption[]) =>
      previous.filter((option) => option.value !== selectedItem?.value)
    )
  }

  const handleAddSelectedItem = (selectedItem: SelectorOption) => {
    setSelectedItems((previous: SelectorOption[]) =>
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
  } = useSelect<SelectorOption>({
    items: options,
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
