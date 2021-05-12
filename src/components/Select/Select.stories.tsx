import React, { useState } from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import Select, {
  SelectProps,
  SelectedItems,
  SelectOption,
  SelectValue,
} from "./Select"
import { mockedOptions } from "./__mocks__/options"
import { SelectOptionCustom } from "./SelectOptionCustom"

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
    props.value || props.defaultValue || ""
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
    <Select.Option key={200} value={200}>
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
  defaultValue: 200,
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

const TemplateObjectValues: Story<SelectProps> = (props: SelectProps) => {
  const [value, setValue] = useState<SelectProps["value"]>(
    props.value || props.defaultValue || ""
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
export const WithObjectValues = TemplateObjectValues.bind({})
WithObjectValues.args = {
  children: [
    <Select.Option key={1} value={{ from: "10/10/10", to: "12/12/12" }}>
      Today
    </Select.Option>,
    <Select.Option key={2} value={{ from: "13/13/13", to: "12/12/12" }}>
      A few days ago
    </Select.Option>,
    <SelectOptionCustom key={3} value={{ from: "11/11/11", to: "02/02/02" }}>
      {() => (
        <div>ggesrg serg sergsergse rgser gsergse rgse rgserg sergserg</div>
      )}
    </SelectOptionCustom>,
  ],
  renderButtonLabel({
    selectedOption,
    value,
  }: {
    selectedOption?: SelectOption
    value?: SelectValue
  }) {
    return <span>{selectedOption?.label ?? JSON.stringify(value)}</span>
  },
}
