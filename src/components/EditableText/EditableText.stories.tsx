import EditableText, { EditableTextProps } from "./EditableText"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/EditableText",
  component: EditableText,
} as Meta

const Template: Story<EditableTextProps> = (props) => (
  <EditableText {...props} />
)

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
