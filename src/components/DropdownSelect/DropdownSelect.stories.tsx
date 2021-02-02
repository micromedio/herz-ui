import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import DropdownSelect, { DropdownSelectProps } from "./DropdownSelect"
import { mockedOptions } from "./__mocks__/options"

export default {
  title: "Design System/DropdownSelect",
  component: DropdownSelect,
} as Meta

const Template: Story<DropdownSelectProps> = (props) => (
  <DropdownSelect {...props} />
)

export const Default = Template.bind({})

Default.args = {
  options: mockedOptions,
}

export const WithLabel = Template.bind({})

WithLabel.args = {
  options: mockedOptions,
  label: "Select an element: ",
}

export const WithOnChange = Template.bind({})

WithOnChange.args = {
  options: mockedOptions,
  onChange: ({ selectedItem }) => alert(selectedItem),
}
