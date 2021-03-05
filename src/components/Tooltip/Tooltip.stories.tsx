import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import Tooltip, { TooltipProps } from "./Tooltip"

export default {
  title: "Design System/Tooltip",
  component: Tooltip,
} as Meta

const Template: Story<TooltipProps> = (props) => <Tooltip {...props} />

export const Default = Template.bind({})
Default.args = {
  children: <button>I am the reference</button>,
  title: "I'm the title",
}

export const TopPlacement = Template.bind({})
TopPlacement.args = {
  children: <button style={{ marginTop: 100 }}>I am the reference</button>,
  title: "I'm the title",
  placement: "top",
}

export const AlwaysVisible = Template.bind({})
AlwaysVisible.args = {
  children: <button>I am the reference</button>,
  title: "I'm the title",
  placement: "bottom",
  isVisible: true,
}
