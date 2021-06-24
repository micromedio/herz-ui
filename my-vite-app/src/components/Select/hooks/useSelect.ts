import {
  useMultipleSelection,
  useSelect as useDownshiftSelect,
  UseSelectProps as UseDownshiftSelectProps,
  UseSelectStateChange,
} from "downshift"

import {
  SelectProps,
  SelectedItems,
  SelectValue,
  SelectOptionType,
} from "../Select"

export enum SELECT_BULK_ACTIONS {
  DESELECT_ALL,
  SELECT_ALL,
}

export interface UseSelectProps {
  options: Array<SelectOptionType>
  multi: SelectProps["multi"]
  value: SelectProps["value"]
  selectedItems: SelectProps["selectedItems"]
  onChange: SelectProps["onChange"]
  onSelectedItemsChange: SelectProps["onSelectedItemsChange"]
  isOpen: UseDownshiftSelectProps<SelectValue>["isOpen"]
  onIsOpenChange: UseDownshiftSelectProps<SelectValue>["onIsOpenChange"]
}

export function useSelect({
  options = [],
  multi,
  value,
  selectedItems = [],
  onChange,
  onSelectedItemsChange,
  isOpen,
  onIsOpenChange,
}: UseSelectProps) {
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
    isOpen: downshiftIsOpen,
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
    isOpen,
    onIsOpenChange,
    items: options.map((option) => option.value),
    selectedItem: multi ? null : value,

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
          stateReducer: (state, actionsAndChanges) => {
            const { changes, type } = actionsAndChanges

            switch (type) {
              case useDownshiftSelect.stateChangeTypes.MenuKeyDownEnter:
              case useDownshiftSelect.stateChangeTypes.MenuKeyDownSpaceButton:
                const index = options.findIndex(({ value }) => {
                  return (
                    JSON.stringify(value) ===
                    JSON.stringify(changes.selectedItem)
                  )
                })
                if (options[index]?.isCustom) return state
                break
            }
            return changes
          },
          onSelectedItemChange: handleSelectedItemChange,
        }),
  })

  return {
    isOpen: downshiftIsOpen,
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
