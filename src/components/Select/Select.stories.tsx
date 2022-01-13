import React, { useState } from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import Select, { SelectProps, SelectedItems } from "./Select"
import { mockedOptions } from "./__mocks__/options"

const mockedChildrenOptions = mockedOptions.map(({ label, value }) => (
  <Select.Option key={value} value={value}>
    {label}
  </Select.Option>
))

export default {
  title: "Design System/Select",
  component: Select,
} as Meta

const Template: Story<SelectProps> = (props: SelectProps) => {
  const [value, setValue] = useState<SelectProps["value"]>(
    props.value || props.defaultValue
  )

  return (
    <Select
      {...props}
      value={value}
      onChange={(newValue) => {
        props.onChange?.(newValue)
        setValue(newValue)
      }}
    />
  )
}

/** Multi selector controlled to make sure the selected items become persistent through state changes */
const MultiTemplate: Story<SelectProps> = (props: SelectProps) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItems>(
    props.defaultSelectedItems || props.selectedItems || []
  )

  return (
    <Select
      {...props}
      selectedItems={selectedItems}
      onSelectedItemsChange={(newSelectedItems) => {
        setSelectedItems(newSelectedItems)
      }}
    >
      {mockedOptions.map(({ label, value }) => (
        <Select.Option key={value} value={value}>
          {label}
        </Select.Option>
      ))}
    </Select>
  )
}

export const Default = Template.bind({})
Default.args = {
  children: mockedChildrenOptions.slice(0, 5),
  id: "default",
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  children: mockedChildrenOptions,
  label: "Select an element: ",
}

export const WithDefaultValue = Template.bind({})
WithDefaultValue.args = {
  children: [
    <Select.Option key={0} value={0}>
      <span
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            marginRight: "8px",
            borderRadius: "50%",
            background: "#30D158",
            width: "8px",
            height: "8px",
          }}
        />
        Active
      </span>
    </Select.Option>,
    ...mockedChildrenOptions,
  ],
  defaultValue: 0,
}

export const MultipleSelection = MultiTemplate.bind({})
MultipleSelection.args = {
  children: mockedChildrenOptions,
  label: "Select one or multiple elements: ",
  multi: true,
}

export const WithDefaultSelectedItems = MultiTemplate.bind({})
WithDefaultSelectedItems.args = {
  children: mockedChildrenOptions,
  label: "Select one or multiple elements: ",
  multi: true,
  defaultSelectedItems: mockedOptions.map(({ value }) => value),
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: mockedChildrenOptions,
  label: "Select an element: ",
  disabled: true,
}

export const WithoutPlaceholder = Template.bind({})
WithoutPlaceholder.args = {
  children: mockedChildrenOptions.slice(0, 5),
  placeholder: " ",
  fullWidth: true,
}
