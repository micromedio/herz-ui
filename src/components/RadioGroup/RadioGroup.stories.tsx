import React from "react"
import Radio from "../Radio/Radio"
import { RadioGroupProps } from "./RadioGroup"
import { Meta, Story } from "@storybook/react/types-6-0"
import { action } from "@storybook/addon-actions"
import { radioChildrensMock } from "./__mocks__/radioChildren"

const mockedChildrenOptions = radioChildrensMock.map(({ value, label }) => (
  <>
    <Radio value={value} label={label} />
  </>
))

export default {
  title: "Design System/RadioGroup",
  component: Radio.Group,
} as Meta

const Template: Story<RadioGroupProps> = (props: RadioGroupProps) => (
  <Radio.Group {...props}>{props.children}</Radio.Group>
)

// Each story then reuses that template
export const Example = Template.bind({})

Example.args = {
  onChange: action("chosen"),
  children: mockedChildrenOptions,
}
