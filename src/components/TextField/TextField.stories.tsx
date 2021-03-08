import React, { useState } from "react"
import TextField, { TextFieldProps } from "./TextField"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/TextField",
  component: TextField,
} as Meta

const Template: Story<TextFieldProps> = (props: TextFieldProps) => {
  const [value, setValue] = useState(props.value)

  return (
    <TextField
      {...props}
      value={value}
      onChange={(event) => {
        if (props.onChange) props.onChange(event)
        setValue(event.target.value)
      }}
    />
  )
}

export const Example = Template.bind({})
Example.args = {
  id: "field-id",
  label: "Label",
  helperText: "Text to help explain the input",
  iconName: "IconSearch",
}

export const WithoutLabels = Template.bind({})
WithoutLabels.args = {}

export const Filled = Template.bind({})
Filled.args = {
  ...Example.args,
  value: "Filled input",
}
