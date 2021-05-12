/** @jsxRuntime classic /
/** @jsx jsx */
import { useContext } from "react"
import { jsx } from "theme-ui"
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
}

export const SelectOptionCustom = ({
  value,
  children,
  disabled = false,
}: SelectOptionCustomProps) => {
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

  return (
    <Popover
      isInteractive
      placement="right-end"
      noPadding
      boxStyle={{
        mx: 6,
        mb: -4,
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

          ...(isSelected
            ? {
                color: "secondary.0",
                backgroundColor: "secondary.90",
                fontWeight: "bold",
                ...(highlightedIndex === index
                  ? {
                      backgroundColor: "secondary.alpha.85",
                    }
                  : {}),
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
        onClick={() => {
          selectItem(value)
          setTimeout(() => closeMenu())
        }}
      >
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <span>Custom...</span>
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
