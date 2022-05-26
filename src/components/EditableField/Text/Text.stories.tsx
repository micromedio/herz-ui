import EditableText, { EditableFieldTextProps } from "./EditableFieldText"
import { Meta, Story } from "@storybook/react/types-6-0"
import { useState } from "react"

export default {
  title: "Design System/EditableField/Text",
  component: EditableText,
} as Meta

const Template: Story<EditableFieldTextProps> = (
  props: EditableFieldTextProps
) => {
  const [value, setValue] = useState(props.value)
  const [defaultValue, setDefaultValue] = useState(props.value)

  return (
    <EditableText
      {...props}
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => {
        props.onChange?.(event)
        setValue(event.target.value)
      }}
      onSave={(value) => {
        props.onSave?.(value)
        setDefaultValue(value)
      }}
    />
  )
}

// Each story then reuses that template
export const Default = Template.bind({})
Default.args = {
  value: "Handle 123",
}

export const WithUnit = Template.bind({})
WithUnit.args = {
  value: "123",
  unit: "cm",
}

export const Loading = Template.bind({})
Loading.args = {
  value: "Handle 123",
  status: "loading",
}

export const Error = Template.bind({})
Error.args = {
  value: "Handle 123",
  status: "error",
  helperText: "Something went wrong",
}

export const Success = Template.bind({})
Success.args = {
  value: "Handle 123",
  status: "success",
  helperText: "Changes have been saved",
}

export const TextArea = Template.bind({})
TextArea.args = {
  multiline: true,
  value: "Handle 123\nHandle 456\nHandle 789",
}

export const TextAreaLoading = Template.bind({})
TextAreaLoading.args = {
  multiline: true,
  status: "loading",
  value: "Handle 123\nHandle 456\nHandle 789",
}

export const TextAreaError = Template.bind({})
TextAreaError.args = {
  helperText: "Something went wrong",
  multiline: true,
  status: "error",
  value: "Handle 123\nHandle 456\nHandle 789",
}

export const TextAreaSuccess = Template.bind({})
TextAreaSuccess.args = {
  helperText: "Changes have been saved",
  multiline: true,
  status: "success",
  value: "Handle 123\nHandle 456\nHandle 789",
}
