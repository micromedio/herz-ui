import { Switch, SwitchProps } from "./Switch"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Switch",
  component: Switch,
  decorators: [
    (Story) => (
      <div style={{ width: 150 }}>
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: Story<SwitchProps> = (props) => <Switch {...props} />

// Each story then reuses that template
export const Unchecked = Template.bind({})
Unchecked.args = {
  checked: false,
  disabled: false,
  color: "secondary",
}

export const Primary = Template.bind({})
Primary.args = {
  checked: true,
  disabled: false,
  color: "primary",
}

export const Secondary = Template.bind({})
Secondary.args = {
  checked: true,
  disabled: false,
  color: "secondary",
}

export const Success = Template.bind({})
Success.args = {
  checked: true,
  disabled: false,
  color: "success",
}

export const Text = Template.bind({})
Text.args = {
  checked: true,
  disabled: false,
  color: "text",
}

export const Warning = Template.bind({})
Warning.args = {
  checked: true,
  disabled: false,
  color: "warning",
}

export const Disabled = Template.bind({})
Disabled.args = {
  checked: true,
  disabled: true,
  color: "primary",
}

export const Labeled = Template.bind({})
Labeled.args = {
  checked: true,
  disabled: false,
  color: "primary",
  label: "Switch Label",
  id: "switch",
}
