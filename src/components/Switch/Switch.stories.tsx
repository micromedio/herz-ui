import { Switch, SwitchProps } from "./Switch"
import { Meta, Story } from "@storybook/react/types-6-0"
import { useEffect, useState } from "react"

export default {
  title: "Design System/Switch",
  component: Switch,
  decorators: [
    (Story) => (
      <div style={{ width: 50 }}>
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: Story<SwitchProps> = (props: SwitchProps) => {
  const [checked, setChecked] = useState(props.checked)
  useEffect(() => setChecked(props.checked), [props.checked])

  return (
    <Switch
      {...props}
      onChange={(event) => {
        setChecked(event.target.checked)
        props.onChange?.(event)
      }}
      checked={checked}
    />
  )
}

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
