import Divider from "./Divider"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Divider",
  component: Divider,
} as Meta

const Template: Story = (props) => (
  <div>
    Item 1
    <Divider {...props} />
    Item 2
  </div>
)

const TemplateVertical: Story = (props) => (
  <div style={{ display: "flex", gap: 8 }}>
    Item 1
    <Divider {...props} variant="vertical" />
    Item 2
    <Divider {...props} variant="vertical" />
    Item 3
    <Divider {...props} variant="vertical" />
    Item 4
  </div>
)

// Each story then reuses that template
export const Default = Template.bind({})
Default.args = {}

export const Vertical = TemplateVertical.bind({})
Vertical.args = {}
