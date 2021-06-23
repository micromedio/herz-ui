/** @jsxImportSource theme-ui */
import React, { useState } from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import Autocomplete, { AutocompleteProps } from "./Autocomplete"
import { mockedOptions } from "./__mocks__/options"
import Highlight from "../Highlight/Highlight"

type AutocompleteItem = typeof mockedOptions[0]

export default {
  title: "Design System/Autocomplete/MultiSelect",
  component: Autocomplete,
} as Meta

const MultiAutocompleteTemplate: Story<AutocompleteProps<AutocompleteItem>> = (
  props: Omit<
    Partial<AutocompleteProps<AutocompleteItem>>,
    "defaultSelectedOption"
  >
) => {
  const [items, setItems] = useState<AutocompleteItem[]>(mockedOptions)
  const [value, setValue] = useState<AutocompleteItem[]>(
    props.selectedOption && Array.isArray(props.selectedOption)
      ? props.selectedOption
      : []
  )

  return (
    <Autocomplete<AutocompleteItem>
      {...props}
      getOptionLabel={(option) => option.label}
      multiSelect
      onInputValueChange={({ inputValue }) => {
        setItems(
          mockedOptions.filter((option) =>
            inputValue
              ? option.label
                  .toLocaleLowerCase()
                  .startsWith(inputValue.toLocaleLowerCase())
              : true
          )
        )
      }}
      options={items.slice(0, 5)}
      placeholder="Search by organization's name or handle"
      renderOption={({ defaultStyles, option, inputValue }) => (
        <div
          sx={{
            ...defaultStyles,
            alignContent: "center",
            alignItems: "center",
            display: "flex",
            padding: 2,
          }}
        >
          <Highlight search={inputValue} text={option.label} />
        </div>
      )}
      onSelectedItemsChange={(selectedOptions) => {
        setValue(selectedOptions)
      }}
      selectedOption={value}
      totalCount={items.length}
    />
  )
}

const MultiAutocompleteTemplateWithRemove: Story<
  AutocompleteProps<AutocompleteItem>
> = (
  props: Omit<
    Partial<AutocompleteProps<AutocompleteItem>>,
    "defaultSelectedOption"
  >
) => {
  const [items, setItems] = useState<AutocompleteItem[]>(mockedOptions)
  const [value, setValue] = useState<AutocompleteItem[]>(
    props.selectedOption && Array.isArray(props.selectedOption)
      ? props.selectedOption
      : []
  )

  return (
    <Autocomplete<AutocompleteItem>
      {...props}
      getOptionLabel={(option) => option.label}
      multiSelect
      onInputValueChange={({ inputValue }) => {
        setItems(
          mockedOptions.filter((option) =>
            inputValue
              ? option.label
                  .toLocaleLowerCase()
                  .startsWith(inputValue.toLocaleLowerCase())
              : true
          )
        )
      }}
      onRemove={(option) => {
        setValue(value.filter((selected) => selected.value !== option.value))
      }}
      options={items.slice(0, 5)}
      placeholder="Search by organization's name or handle"
      renderOption={({ defaultStyles, option, inputValue }) => (
        <div
          sx={{
            ...defaultStyles,
            alignContent: "center",
            alignItems: "center",
            display: "flex",
            padding: 2,
          }}
        >
          <Highlight search={inputValue} text={option.label} />
        </div>
      )}
      onSelectedItemsChange={(selectedOptions) => {
        setValue(selectedOptions)
      }}
      selectedOption={value}
      totalCount={items.length}
    />
  )
}

export const MultiWithTags = MultiAutocompleteTemplate.bind({})

export const MultiWithRemoveTags = MultiAutocompleteTemplateWithRemove.bind({})
MultiWithRemoveTags.args = {
  selectedOption: [mockedOptions[0], mockedOptions[1]],
}

export const MultiWithCustomRender = MultiAutocompleteTemplate.bind({})
MultiWithCustomRender.args = {
  renderSelectedItems(options) {
    return options.map((option) => (
      <span key={option.value}>
        {option.label}{" "}
        <strong>
          <sup sx={{ position: "relative", left: 3, top: "-5px" }}>
            {option.A}
          </sup>
          <sub
            sx={{
              position: "relative",
              top: "5px",
            }}
          >
            {option.Z}
          </sub>
          {option.symbol}
        </strong>
      </span>
    ))
  },
  selectedOption: [mockedOptions[0]],
}

export const KeepSearchAfterSelect = MultiAutocompleteTemplate.bind({})
KeepSearchAfterSelect.args = {
  keepSearchAfterSelect: true,
  selectedOption: [mockedOptions[0], mockedOptions[1]],
}
