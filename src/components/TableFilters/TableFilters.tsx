/** @jsxRuntime classic /
/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import Selector, { SelectorProps } from "../Selector/Selector"
import Button, { ButtonProps } from "../Button/Button"
import Input, { InputProps } from "../Input/Input"

export interface TableFiltersProps {
  /** Actions */
  actions?: Array<{
    /** Button label */
    label: string
    /** Button color */
    color?: ButtonProps["color"]
    /** Button variant */
    variant?: ButtonProps["variant"]
    /** Button disabled */
    disabled?: boolean
    /** Callback on action button click */
    onClick: () => void
    // icon?: string
  }>

  /** Search input options */
  search?: {
    /** Search input placeholder */
    placeholder?: InputProps["placeholder"]
    /** Search input value */
    value?: InputProps["value"]
    /** Search input min width. Input grows to fill remaining width, but shrinks when there are multiple filters, this prop sets the minimum width it can shrink to. Defaults to 200px */
    minWidth?: number
  }
  hideSearch?: boolean
  onSearchChange?: (value: string) => void

  /** Filters */
  filters?: Array<{
    /** Filter key */
    key: string
    /** Label for the filter Select component */
    label?: string
    /** Value for the filter Select component */
    value?: string
    /** Options for the filter Select component */
    options: SelectorProps["options"]
  }>
  onFilterChange?: ({ key, value }: { key: string; value?: string }) => void
}

const TableFilters = ({
  filters = [],
  actions = [],
  onFilterChange,
  hideSearch = false,
  search: {
    placeholder = "",
    value: searchValue,
    minWidth: searchMinWidth = 200,
  } = {},
  onSearchChange,
}: TableFiltersProps) => {
  return (
    <div
      sx={{
        display: "flex",
        gap: 5,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {actions &&
        actions.map(
          (
            {
              label,
              color = "primary",
              variant = "filled",
              disabled = false,
              onClick,
            },
            index
          ) => (
            <div
              key={index}
              sx={{
                flexShrink: 0,
              }}
            >
              <Button
                color={color}
                variant={variant}
                disabled={disabled}
                onClick={() => onClick()}
              >
                {label}
              </Button>
            </div>
          )
        )}

      <div
        sx={{
          flexGrow: 1,
          flexBasis: hideSearch ? 0 : searchMinWidth,
        }}
      >
        {!hideSearch && (
          <Input
            placeholder={placeholder}
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
          />
        )}
      </div>

      {filters &&
        filters.map(({ key, options, label, value }, index) => (
          <div
            key={`${key}-${index}`}
            sx={{
              flexShrink: 0,
              flexGrow: 0,
            }}
          >
            <Selector
              options={options}
              label={label}
              value={value}
              onChange={(selectedItem) =>
                onFilterChange?.({
                  key,
                  value: selectedItem?.toString() || undefined,
                })
              }
            />
          </div>
        ))}
    </div>
  )
}

export default TableFilters
