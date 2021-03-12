import {
  useMultipleSelection,
  useSelect,
  UseSelectStateChange,
} from "downshift"

import { SelectorProps, SelectedItems, SelectorValue } from "../Selector"

export enum SELECTOR_BULK_ACTIONS {
  DESELECT_ALL,
  SELECT_ALL,
}

export function useSelector({
  options,
  multi,
  value,
  selectedItems = [],
  onChange,
  onSelectedItemsChange,
}: SelectorProps) {
  const handleRemoveSelectedItems = (selectedItem: SelectorValue[]) => {
    const newSelected: SelectedItems = selectedItems.filter(
      (previousSelected) => !selectedItem.includes(previousSelected)
    )
    onSelectedItemsChange?.(newSelected)
  }

  const handleAddSelectedItems = (selectedItem: SelectorValue[]) => {
    const newSelected: SelectedItems = selectedItems.concat(selectedItem)
    onSelectedItemsChange?.(newSelected)
  }

  const handleBulkAction = (type = SELECTOR_BULK_ACTIONS.SELECT_ALL) => {
    if (type === SELECTOR_BULK_ACTIONS.SELECT_ALL) {
      handleAddSelectedItems(options.map(({ value }) => value))
    } else {
      handleRemoveSelectedItems(selectedItems)
    }
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
                    handleRemoveSelectedItems([selectedItem])
                  } else {
                    handleAddSelectedItems([selectedItem])
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
    handleBulkAction,
  }
}
