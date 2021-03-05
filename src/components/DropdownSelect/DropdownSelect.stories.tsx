import React, { useState } from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import DropdownSelect, { DropdownSelectProps, Option } from "./DropdownSelect"
import { mockedOptions } from "./__mocks__/options"

export default {
  title: "Design System/DropdownSelect",
  component: DropdownSelect,
} as Meta

const Template: Story<DropdownSelectProps> = (props) => (
  <DropdownSelect {...props} />
)

const MultiSelect: Story<DropdownSelectProps> = (props) => {
  const [selectedItems, setSelectedItems] = useState<Array<Option>>([])

  return (
    <DropdownSelect
      {...props}
      selectedItems={selectedItems}
      onChange={(newSelectedItems) => {
        console.log(newSelectedItems)
        setSelectedItems(newSelectedItems)
      }}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  options: mockedOptions,
}

export const WithLabel = Template.bind({})

WithLabel.args = {
  options: mockedOptions,
  label: "Select an element: ",
}

export const MultipleSelection = MultiSelect.bind({})

MultipleSelection.args = {
  multi: true,
  options: mockedOptions,
}

export const Disabled = Template.bind({})

Disabled.args = {
  options: mockedOptions,
  label: "Select an element: ",
  disabled: true,
}
