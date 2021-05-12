import {
  useMultipleSelection,
  useSelect as useDownshiftSelect,
  UseSelectStateChange,
} from "downshift"

import {
  SelectProps,
  SelectedItems,
  SelectValue,
  SelectOption,
} from "../Select"

export enum SELECT_BULK_ACTIONS {
  DESELECT_ALL,
  SELECT_ALL,
}

export function useSelect({
  options = [],
  multi,
  value,
  selectedItems = [],
  onChange,
  onSelectedItemsChange,
}: {
  options: Array<SelectOption>
  multi: SelectProps["multi"]
  value: SelectProps["value"]
  selectedItems: SelectProps["selectedItems"]
  onChange: SelectProps["onChange"]
  onSelectedItemsChange: SelectProps["onSelectedItemsChange"]
}) {
  const handleRemoveSelectedItems = (selectedItem: SelectValue[]) => {
    const newSelected: SelectedItems = selectedItems.filter(
      (previousSelected) => !selectedItem.includes(previousSelected)
    )
    onSelectedItemsChange?.(newSelected)
  }

  const handleAddSelectedItems = (selectedItem: SelectValue[]) => {
    const newSelected: SelectedItems = selectedItems.concat(selectedItem)
    onSelectedItemsChange?.(newSelected)
  }

  const handleBulkAction = (type = SELECT_BULK_ACTIONS.SELECT_ALL) => {
    if (type === SELECT_BULK_ACTIONS.SELECT_ALL) {
      handleAddSelectedItems(options.map(({ value }) => value))
    } else {
      handleRemoveSelectedItems(selectedItems)
    }
  }

  /** Handler for single selector item change */
  const handleSelectedItemChange = ({
    selectedItem,
  }: UseSelectStateChange<SelectValue>) => {
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
    selectItem,
    closeMenu,
    openMenu,
  } = useDownshiftSelect<SelectValue>({
    items: options.map((option) => option.value),
    selectedItem: multi ? null : value,
    defaultHighlightedIndex: 0,
    ...(multi
      ? {
          stateReducer: (state, actionAndChanges) => {
            const { changes, type } = actionAndChanges

            switch (type) {
              case useDownshiftSelect.stateChangeTypes.MenuKeyDownEnter:
              case useDownshiftSelect.stateChangeTypes.MenuKeyDownSpaceButton:
              case useDownshiftSelect.stateChangeTypes.ItemClick:
              case useDownshiftSelect.stateChangeTypes.FunctionSelectItem:
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
              case useDownshiftSelect.stateChangeTypes.MenuKeyDownEnter:
              case useDownshiftSelect.stateChangeTypes.MenuKeyDownSpaceButton:
              case useDownshiftSelect.stateChangeTypes.ItemClick:
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
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getDropdownProps,
    handleBulkAction,
    selectItem,
    closeMenu,
    openMenu,
  }
}
