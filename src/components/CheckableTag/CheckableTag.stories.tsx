import React, { useState } from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import CheckableTag, { CheckableTagProps } from "./CheckableTag"

export default {
  title: "Design System/CheckableTag",
  component: CheckableTag,
} as Meta

const Template: Story<CheckableTagProps> = (props) => {
  const [checked, setChecked] = useState(false)

  return (
    <CheckableTag
      {...props}
      id="checkbox"
      name="checkbox"
      checked={checked}
      onChange={() => setChecked((previousState) => !previousState)}
    />
  )
}

export const Default = Template.bind({})

Default.args = {}

export const Labeled = Template.bind({})

Labeled.args = {
  label: "Check me",
}

export const Disabled = Template.bind({})

Disabled.args = {
  label: "I'm disabled",
  disabled: true,
}
