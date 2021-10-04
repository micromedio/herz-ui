import React, { useState } from "react"
import TextField, { TextFieldProps } from "./TextField"
import { Meta, Story } from "@storybook/react/types-6-0"
import SelectComponent, { SelectProps } from "../Select/Select"

export default {
  title: "Design System/TextField",
  component: TextField,
} as Meta

const Template: Story<TextFieldProps> = (props: TextFieldProps) => {
  const [value, setValue] = useState(!props.select ? props.value : "")

  return (
    <TextField
      {...props}
      {...(!props.select
        ? {
            value,
            onChange: (event) => {
              if (props.onChange) props.onChange(event)
              setValue(event.target.value)
            },
          }
        : {})}
    />
  )
}

const SelectTemplate: Story<TextFieldProps> = (props: TextFieldProps) => {
  const [value, setValue] = useState<SelectProps["value"]>()

  return (
    <TextField
      select
      {...props}
      selectProps={
        props.select
          ? {
              ...props.selectProps,
              value,
              onChange: setValue,
            }
          : {}
      }
    >
      {props.select ? props.children : null}
    </TextField>
  )
}

export const Example = Template.bind({})
Example.args = {
  select: false,
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
  select: false,
  value: "Filled input",
}

export const Select = SelectTemplate.bind({})
Select.args = {
  id: "field-id",
  label: "Label",
  helperText: "Text to help explain the input",
  placeholder: " ",
  select: true,
  children: [
    <SelectComponent.Option key="CPF" value="CPF">
      CPF
    </SelectComponent.Option>,
    <SelectComponent.Option key="CNPJ" value="CNPJ">
      CNPJ
    </SelectComponent.Option>,
  ],
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

export const TextArea = Template.bind({})
TextArea.args = {
  select: false,
  id: "field-id",
  label: "Label",
  helperText: "Text to help explain the input",
  iconName: "IconSearch",
  multiline: true,
}

export const TextAreaWithoutLabels = Template.bind({})
TextAreaWithoutLabels.args = {
  multiline: true,
  rows: 2,
}

export const TextAreaFilled = Template.bind({})
TextAreaFilled.args = {
  ...TextArea.args,
  value: "Filled input",
  rows: 2,
}

export const TextAreaError = Template.bind({})
TextAreaError.args = {
  ...TextArea.args,
  value: "Filled input",
  state: "error",
  helperText: "Text to explain the input error",
}

export const TextAreaSuccess = Template.bind({})
TextAreaSuccess.args = {
  ...TextArea.args,
  value: "Filled input",
  state: "success",
  helperText: "Text to explain the success",
}
