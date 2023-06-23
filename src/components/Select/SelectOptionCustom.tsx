/** @jsxImportSource theme-ui */
import { useContext, useEffect, useState } from "react"

import Button from "../Button/Button"
import Icon from "../Icon/Icon"
import Popover from "../Popover/Popover"
import { SelectContext } from "./context"
import { SelectValue } from "./Select"

export interface SelectOptionCustomProps {
  value: SelectValue
  children: ({
    closeMenu,
    selectItem,
  }: Pick<SelectContext, "closeMenu" | "selectItem">) => React.ReactNode
  label?: React.ReactNode
  disabled?: boolean
  onHide?: () => void
}

export const SelectOptionCustom = ({
  value,
  children,
  disabled = false,
  onHide,
}: SelectOptionCustomProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const context = useContext(SelectContext)
  if (context === null) {
    throw "<SelectOptionCustom> needs to be inside a <Select> component"
  }

  const {
    highlightedIndex,
    index,
    selectItem,
    selectedItem,
    closeMenu,
    getItemProps,
  } = context

  const isSelected = JSON.stringify(selectedItem) === JSON.stringify(value)

  useEffect(() => {
    if (highlightedIndex === index) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [highlightedIndex, index])

  return (
    <Popover
      isVisible={isOpen}
      isInteractive
      placement="right-end"
      noPadding
      boxStyle={{
        mx: 6,
        mb: -4,
      }}
      onHide={() => {
        setIsOpen(false)
        onHide?.()
      }}
      content={
        <div
          sx={{
            p: 4,
          }}
        >
          {children({ closeMenu, selectItem })}
        </div>
      }
    >
      <Button
        disabled={disabled}
        variant="plain"
        color="secondary"
        sx={{
          display: "flex",
          width: "100%",
          p: 2,
          ...(highlightedIndex === index
            ? {
                backgroundColor: "secondary.alpha.85",
              }
            : {}),
          ...(isSelected
            ? {
                color: "secondary",
                backgroundColor: "secondary.90",
                fontWeight: "bold",

                "&&:hover": {
                  backgroundColor: "secondary.alpha.85",
                },
              }
            : {}),
          "> *:first-of-type": {
            flexGrow: 1,
          },
        }}
        {...getItemProps({
          item: value,
          index,
          disabled,
        })}
      >
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <span>Customizar...</span>
          <div
            sx={{
              display: "flex",
              alignItems: "center",
              width: 20,
              height: 20,
              p: 1,
            }}
          >
            {isSelected && <Icon name="IconCheck" size={12} stroke={4} />}
          </div>
        </div>
      </Button>
    </Popover>
  )
}

SelectOptionCustom.isSelectOptionCustom = true
