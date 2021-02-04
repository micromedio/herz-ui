import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import Tooltip, { ITooltipProps } from "./Tooltip"

export default {
  title: "Design System/Tooltip",
  component: Tooltip,
} as Meta

const Template: Story<ITooltipProps> = (props) => <Tooltip {...props} />

export const Default = Template.bind({})

Default.args = {}
