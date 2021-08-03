import React from "react"
import Typography from "./Typography"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Typography",
  component: Typography,
} as Meta

const Template: Story = () => {
  return <Typography />
}

export const Default = Template.bind({})
Default.args = {}
