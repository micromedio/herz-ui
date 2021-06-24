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

// Each story then reuses that template
export const Default = Template.bind({})
Default.args = {}
