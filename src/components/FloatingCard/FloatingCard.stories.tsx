import FloatingCard, { FloatingCardProps } from "./FloatingCard"
import { Meta, Story } from "@storybook/react/types-6-0"
import Button from "../Button/Button"

export default {
  title: "Design System/FloatingCard",
  component: FloatingCard,
} as Meta

const Template: Story<FloatingCardProps> = (props) => (
  <FloatingCard {...props} />
)

// Each story then reuses that template
export const Default = Template.bind({})
Default.args = {
  title: "Card Title",
  body: "body",
  children: <Button>Open the Floating Card</Button>,
  isVisible: true,
}
