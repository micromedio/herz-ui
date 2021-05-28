import EditableText, { EditableFieldTextProps } from "./Text"
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
