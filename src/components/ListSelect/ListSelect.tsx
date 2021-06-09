/** @jsxImportSource theme-ui */
import { Fragment, ReactNode, useMemo } from "react"

import Divider from "../Divider/Divider"
import Icon from "../Icon/Icon"

type SelectOption = {
  label: ReactNode
  value: string | number
  affix?: ReactNode
  suffix?: ReactNode
}

export interface ListSelectProps {
  options: Array<SelectOption>
  selected?: SelectOption["value"] | Array<SelectOption["value"]>
  onSelect?: (value: SelectOption["value"]) => void
  onDeselect?: (value: SelectOption["value"]) => void
}

const ListSelect = ({
  options,
  selected = [],
  onSelect,
  onDeselect,
}: ListSelectProps) => {
  const selectedArray = useMemo(() => {
    return Array.isArray(selected) ? selected : [selected]
  }, [selected])

  return (
    <div
      sx={{
        display: "grid",
        gap: 2,
      }}
    >
      {options.map(({ label, value, suffix, affix = "" }, index) => {
        const isSelected = selectedArray.includes(value)
        return (
          <Fragment key={value}>
            {index !== 0 && <Divider />}
            <button
              onClick={() => {
                if (isSelected) {
                  onDeselect?.(value)
                } else {
                  onSelect?.(value)
                }
              }}
              sx={{
                display: "flex",
                gap: 3,
                outline: "none",
                border: "none",
                cursor: "pointer",
                alignItems: "center",
                px: 3,
                py: 2,
                borderRadius: 2,
                backgroundColor: isSelected
                  ? "secondary.alpha.90"
                  : "transparent",
                variant: "text.body1",
                fontWeight: isSelected ? "semibold" : "medium",
                color: isSelected ? "secondary.0" : "text.0",
                ":focus": {
                  backgroundColor: isSelected
                    ? "secondary.alpha.90"
                    : "secondary.alpha.85",
                },
                ":hover": {
                  backgroundColor: isSelected
                    ? "secondary.alpha.85"
                    : "text.alpha.95",
                },
                transition: "all .2s linear",
              }}
            >
              {suffix}
              <span sx={{ flexGrow: 1, textAlign: "start" }}>{label}</span>
              {isSelected ? (
                <span
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1,
                  }}
                >
                  <Icon name="IconCheck" size={12} stroke={4} />
                </span>
              ) : (
                <span
                  sx={{
                    fontWeight: "semibold",
                    color: "text.40",
                  }}
                >
                  {affix}
                </span>
              )}
            </button>
          </Fragment>
        )
      })}
    </div>
  )
}

export default ListSelect
