import React, { useState } from "react"
import TextField, { TextFieldProps } from "./TextField"
import { Meta, Story } from "@storybook/react/types-6-0"
import { SelectorProps } from "../Selector/Selector"

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

const SelectTemplate: Story<TextFieldProps> = (props: TextFieldProps) => {
  const [value, setValue] = useState<SelectorProps["value"]>()

  return (
    <TextField
      {...props}
      selectProps={{
        ...props.selectProps,
        value: value,
        options: [
          {
            label: "CPF",
            value: "CPF",
          },
          {
            label: "CNPJ",
            value: "CNPJ",
          },
        ],
        onChange: (newValue) => setValue(newValue),
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

export const Select = SelectTemplate.bind({})
Select.args = {
  id: "field-id",
  label: "Label",
  helperText: "Text to help explain the input",
  placeholder: " ",
  select: true,
  selectProps: {
    options: [
      {
        label: "CPF",
        value: "CPF",
      },
      {
        label: "CNPJ",
        value: "CNPJ",
      },
    ],
  },
}

export const Error = Template.bind({})
Error.args = {
  ...Example.args,
  value: "Filled input",
  state: "error",
  helperText: "Text to explain the input error",
}

export const Success = Template.bind({})
Success.args = {
  ...Example.args,
  value: "Filled input",
  state: "success",
  helperText: "Text to explain the success",
}
