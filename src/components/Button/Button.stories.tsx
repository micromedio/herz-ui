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
  iconName: "IconPlus",
  size: "large",
}

export const Filled = Template.bind({})
Filled.args = {
  ...Example.args,
  variant: "filled",
  color: "text",
}

const children = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
    >
      <title>MS-SymbolLockup</title>
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  </>
)
export const FilledReactNode = Template.bind({})
FilledReactNode.args = {
  ...Example.args,
  variant: "filled",
  color: "text",
  children: children,
  iconName: undefined,
}

export const Plain = Template.bind({})
Plain.args = {
  ...Example.args,
  variant: "plain",
  color: "secondary",
}

export const PlainSmall = Template.bind({})
PlainSmall.args = {
  ...Example.args,
  variant: "plain",
  size: "small",
  color: "primary",
  iconName: undefined,
  children: "children",
}

export const Icon = Template.bind({})
Icon.args = {
  color: "text",
  iconName: "IconPlus",
}
