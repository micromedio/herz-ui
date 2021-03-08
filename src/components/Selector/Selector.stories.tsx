import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import Selector, { SelectorProps } from "./Selector"
import { mockedOptions } from "./__mocks__/options"

export default {
  title: "Design System/Selector",
  component: Selector,
} as Meta

const Template: Story<SelectorProps> = (props) => <Selector {...props} />

export const Default = Template.bind({})

Default.args = {
  options: mockedOptions,
}

export const WithLabel = Template.bind({})

WithLabel.args = {
  options: mockedOptions,
  label: "Select an element: ",
}

export const Multiple = Template.bind({})

Multiple.args = {
  options: mockedOptions,
  label: "Select one or multiple elements: ",
  multi: true,
}

export const Disabled = Template.bind({})

Disabled.args = {
  options: mockedOptions,
  label: "Select an element: ",
  disabled: true,
}
