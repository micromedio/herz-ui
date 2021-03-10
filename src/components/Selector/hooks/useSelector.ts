import {
  useMultipleSelection,
  useSelect,
  UseSelectStateChange,
} from "downshift"

import { SelectorProps, SelectedItems, SelectorValue } from "../Selector"

export function useSelector({
  options,
  multi,
  value,
  selectedItems = [],
  onChange,
  onSelectedItemsChange,
}: SelectorProps) {
  const handleRemoveSelectedItem = (selectedItem: SelectorValue) => {
    const newSelected: SelectedItems = selectedItems.filter(
      (previousSelected) => previousSelected !== selectedItem
    )
    onSelectedItemsChange?.(newSelected)
  }

  const handleAddSelectedItem = (selectedItem: SelectorValue) => {
    const newSelected: SelectedItems = selectedItems.concat([selectedItem])
    onSelectedItemsChange?.(newSelected)
  }

  /** Handler for single selector item change */
  const handleSelectedItemChange = ({
    selectedItem,
  }: UseSelectStateChange<SelectorValue>) => {
    onChange?.(selectedItem || "")
  }

  const { getDropdownProps } = useMultipleSelection({
    selectedItems,
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
                  /** Keep the menu open after selection */
                  isOpen: true,
                  /** Prevent highlightedIndex from changing */
                  highlightedIndex: state.highlightedIndex,
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
          onSelectedItemChange: handleSelectedItemChange,
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
