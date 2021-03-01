import React from "react"
import Icon, { IconProps } from "./Icon"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Icon",
  component: Icon,
} as Meta

const Template: Story<IconProps> = (props) => <Icon {...props} />

// Each story then reuses that template
export const Example = Template.bind({})

Example.args = {
  name: "IconMoodHappy",
  size: 20,
  color: "highlight",
  stroke: 2,
}

// Each story then reuses that template
export const ThickerIcon = Template.bind({})

ThickerIcon.args = {
  stroke: 4,
}

export const LargeIcon = Template.bind({})

LargeIcon.args = {
  size: 24,
}

export const RedIcon = Template.bind({})

RedIcon.args = {
  color: "primary",
}
