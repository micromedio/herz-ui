import Tag, { TagProps } from "./Tag"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Tag",
  component: Tag,
} as Meta

const Template: Story<TagProps> = (props) => <Tag {...props} />

// Each story then reuses that template
export const Default = Template.bind({})
Default.args = {
  children: "FLEURY",
}

export const Primary = Template.bind({})
Primary.args = {
  ...Default.args,
  color: "primary",
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Default.args,
  color: "secondary",
}

export const Success = Template.bind({})
Success.args = {
  ...Default.args,
  color: "success",
}

export const Text = Template.bind({})
Text.args = {
  ...Default.args,
  color: "text",
}

export const WithRemoveButton = Template.bind({})
WithRemoveButton.args = {
  children: "FLEURY",
  showRemove: true,
}
