import React from "react"
import Button, { ButtonProps } from "./Button"
import { action } from "@storybook/addon-actions"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Button",
  component: Button,
} as Meta

const Template: Story<ButtonProps> = (props: ButtonProps) => {
  return <Button {...props} />
}

export const Example = Template.bind({})
Example.args = {
  children: "Submit",
  disabled: false,
  variant: "filled",
  color: "primary",
  onClick: action("clicked"),
}

export const Filled = Template.bind({})
Filled.args = {
  ...Example.args,
  variant: "filled",
  color: "text",
}

export const Plain = Template.bind({})
Plain.args = {
  ...Example.args,
  variant: "plain",
  color: "secondary",
}
