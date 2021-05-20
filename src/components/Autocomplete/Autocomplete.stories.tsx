/** @jsxRuntime classic /*
/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { useState } from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import Autocomplete, { AutocompleteProps } from "./Autocomplete"
import { mockedOptions } from "./__mocks__/options"
import Highlight from "../Highlight/Highlight"

type AutocompleteItem = typeof mockedOptions[0]

export default {
  title: "Design System/Autocomplete",
  component: Autocomplete,
} as Meta

const Template: Story<AutocompleteProps<AutocompleteItem>> = (
  props: Partial<AutocompleteProps<AutocompleteItem>>
) => {
  const [items, setItems] = useState<AutocompleteItem[]>(mockedOptions)
  const [value, setValue] = useState<AutocompleteItem | null | undefined>(
    props.buttons ? mockedOptions[0] : null
  )

  return (
    <Autocomplete<AutocompleteItem>
      {...props}
      buttons={
        props.buttons
          ? [
              {
                color: "secondary",
                children: "More info",
                onClick: () => {
                  alert("Clicked on more info!")
                },
                variant: "plain",
              },
              {
                color: "secondary",
                children: "Clear",
                onClick: () => {
                  setValue(null)
                },
                variant: "plain",
              },
            ]
          : undefined
      }
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
      optionToString={(option) => (option ? option.label : "")}
      placeholder="Search by organization's name or handle"
      renderOption={({ defaultStyles, option }) => (
        <div
          sx={{
            ...defaultStyles,
            alignContent: "center",
            alignItems: "center",
            display: "flex",
            padding: 2,
          }}
        >
          {option.label}
        </div>
      )}
      onSelectedItemChange={({ selectedItem: selectedOption }) => {
        setValue(selectedOption)
      }}
      selectedOption={value}
      totalCount={items.length}
    />
  )
}

const RenderSelectedTemplate: Story<AutocompleteProps<AutocompleteItem>> = (
  props: Partial<AutocompleteProps<AutocompleteItem>>
) => {
  const [items, setItems] = useState<AutocompleteItem[]>(mockedOptions)
  const [value, setValue] = useState<AutocompleteItem | null | undefined>(
    mockedOptions[0]
  )

  return (
    <Autocomplete<AutocompleteItem>
      {...props}
      buttons={[
        {
          color: "secondary",
          children: "More info",
          onClick: () => {
            alert("Clicked on more info!")
          },
          variant: "plain",
        },
        {
          color: "secondary",
          children: "Clear",
          onClick: () => {
            setValue(null)
          },
          variant: "plain",
        },
      ]}
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
      optionToString={(option) => (option ? option.label : "")}
      placeholder="Search by organization's name or handle"
      renderOption={({ defaultStyles, option }) => (
        <div
          sx={{
            ...defaultStyles,
            alignContent: "center",
            alignItems: "center",
            display: "flex",
            padding: 2,
          }}
        >
          {option.label}
        </div>
      )}
      renderSelectedItem={(selectedOption) => {
        return (
          <span>
            {selectedOption.label}{" "}
            <strong>
              <sup sx={{ position: "relative", left: 3, top: "-5px" }}>
                {selectedOption.A}
              </sup>
              <sub
                sx={{
                  position: "relative",
                  top: "5px",
                }}
              >
                {selectedOption.Z}
              </sub>
              {selectedOption.symbol}
            </strong>
          </span>
        )
      }}
      onSelectedItemChange={({ selectedItem: selectedOption }) => {
        setValue(selectedOption)
      }}
      selectedOption={value}
      totalCount={items.length}
    />
  )
}

const WithHighlightTemplate: Story<AutocompleteProps<AutocompleteItem>> = (
  props: Partial<AutocompleteProps<AutocompleteItem>>
) => {
  const [items, setItems] = useState<AutocompleteItem[]>(mockedOptions)
  const [value, setValue] = useState<AutocompleteItem | null | undefined>(null)

  return (
    <Autocomplete<AutocompleteItem>
      {...props}
      buttons={[
        {
          color: "secondary",
          children: "More info",
          onClick: () => {
            alert("Clicked on more info!")
          },
          variant: "plain",
        },
        {
          color: "secondary",
          children: "Clear",
          onClick: () => {
            setValue(null)
          },
          variant: "plain",
        },
      ]}
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
      optionToString={(option) => (option ? option.label : "")}
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
      renderSelectedItem={(selectedOption) => {
        return (
          <span>
            {selectedOption.label}{" "}
            <strong>
              <sup sx={{ position: "relative", left: 3, top: "-5px" }}>
                {selectedOption.A}
              </sup>
              <sub
                sx={{
                  position: "relative",
                  top: "5px",
                }}
              >
                {selectedOption.Z}
              </sub>
              {selectedOption.symbol}
            </strong>
          </span>
        )
      }}
      onSelectedItemChange={({ selectedItem: selectedOption }) => {
        setValue(selectedOption)
      }}
      selectedOption={value}
      totalCount={items.length}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  buttons: undefined,
}

export const WithLabelAndHelperText = Template.bind({})
WithLabelAndHelperText.args = {
  helperText: "This is a helper text",
  label: "Label",
  optionalText: "optional",
}

export const WithActionButtons = Template.bind({})
WithActionButtons.args = {
  buttons: [],
  helperText: "This is a helper text",
  label: "Label",
  optionalText: "optional",
}

export const CustomSelectedRender = RenderSelectedTemplate.bind({})

export const WithHighlight = WithHighlightTemplate.bind({})
