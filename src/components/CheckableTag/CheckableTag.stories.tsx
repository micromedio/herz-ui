import React, { useState } from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import CheckableTag, { CheckableTagProps } from "./CheckableTag"

export default {
  title: "Design System/CheckableTag",
  component: CheckableTag,
} as Meta

const Template: Story<CheckableTagProps> = (props: CheckableTagProps) => {
  const [checked, setChecked] = useState(props?.checked || false)

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

export const DefaultChecked = Template.bind({})

DefaultChecked.args = {
  checked: true,
}

export const Labeled = Template.bind({})

Labeled.args = {
  label: "Check me",
}

export const LabeledChecked = Template.bind({})

LabeledChecked.args = {
  checked: true,
  label: "Check me",
}

export const Disabled = Template.bind({})

Disabled.args = {
  label: "I'm disabled",
  disabled: true,
}
