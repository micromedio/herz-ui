import Spinner, { SpinnerProps } from "./Spinner"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Spinner",
  component: Spinner,
} as Meta

const Template: Story<SpinnerProps> = (props) => <Spinner {...props} />

// Each story then reuses that template
export const Default = Template.bind({})
Default.args = {}
