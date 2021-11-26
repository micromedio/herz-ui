import React from "react"
import Radio, { RadioProps } from "./Radio"
import { Meta, Story } from "@storybook/react/types-6-0"
import { action } from "@storybook/addon-actions"

export default {
  title: "Design System/Radio",
  component: Radio,
  parameters: {
    creevey: {
      captureElement: "#root",
    },
  },
} as Meta

const Template: Story<RadioProps> = (props) => (
  <>
    <Radio {...props} />
    <Radio {...props} />
  </>
)

// Each story then reuses that template
export const Example = Template.bind({})

Example.args = {
  label: "Radio Option One",
  value: "opt1",
  onChange: action("chosen"),
  name: "Radio_opt1",
}
