import React, { useState } from "react"
import Input, { InputProps } from "./Input"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Input",
  component: Input,
} as Meta

const Template: Story<InputProps> = (props: InputProps) => {
  const [value, setValue] = useState(props.value)

  return (
    <Input
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
  placeholder: "Placeholder text",
  iconName: "IconSearch",
}

export const Password = Template.bind({})
Password.args = {
  placeholder: "Insert your password",
  type: "password",
}

export const Filled = Template.bind({})
Filled.args = {
  value: "Filled input",
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const WithError = Template.bind({})
WithError.args = {
  error: true,
}

export const Required = Template.bind({})
Required.args = {
  required: true,
}
