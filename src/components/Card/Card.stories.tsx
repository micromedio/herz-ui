/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import Card, { CardProps } from "./Card"
import { Meta, Story } from "@storybook/react/types-6-0"
import { action } from "@storybook/addon-actions"

export default {
  title: "Design System/Card",
  component: Card,
} as Meta

const Template: Story<CardProps> = (props) => <Card {...props} />

// Each story then reuses that template
export const Default = Template.bind({})

Default.args = {
  title: "Capture interval",
  children: "Capturing every hour",
  actions: [
    {
      label: "Change interval",
      onClick: action("change-interval"),
    },
  ],
}
