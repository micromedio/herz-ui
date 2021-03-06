import React, { useState } from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import Selector, {
  SelectedItems,
  SelectorProps,
  SelectorValue,
} from "./Selector"
import { mockedOptions } from "./__mocks__/options"

export default {
  title: "Design System/Selector",
  component: Selector,
} as Meta

const Template: Story<SelectorProps> = (props: SelectorProps) => {
  const [value, setValue] = useState<SelectorValue>(
    props.value || props.defaultValue || ""
  )

  return (
    <Selector
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
const MultiTemplate: Story<SelectorProps> = (props: SelectorProps) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItems>(
    props.selectedItems || props.defaultSelectedItems || []
  )

  return (
    <Selector
      {...props}
      selectedItems={selectedItems}
      onSelectedItemsChange={(newSelectedItems) => {
        setSelectedItems(newSelectedItems)
      }}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  id: "default",
  options: mockedOptions,
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  options: mockedOptions,
  label: "Select an element: ",
}

export const WithDefaultValue = Template.bind({})
WithDefaultValue.args = {
  options: [
    {
      value: 200,
      label: (
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
      ),
    },
    ...mockedOptions,
  ],
  defaultValue: 200,
}

export const MultipleSelection = MultiTemplate.bind({})
MultipleSelection.args = {
  options: mockedOptions,
  label: "Select one or multiple elements: ",
  multi: true,
}

export const WithDefaultSelectedItems = MultiTemplate.bind({})
WithDefaultSelectedItems.args = {
  options: mockedOptions,
  label: "Select one or multiple elements: ",
  multi: true,
  defaultSelectedItems: [1, 5],
}

export const Disabled = Template.bind({})
Disabled.args = {
  options: mockedOptions,
  label: "Select an element: ",
  disabled: true,
}

export const WithoutPlaceholder = Template.bind({})
WithoutPlaceholder.args = {
  options: mockedOptions.slice(0, 5),
  placeholder: " ",
  fullWidth: true,
}
