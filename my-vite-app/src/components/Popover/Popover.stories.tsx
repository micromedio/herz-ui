import Popover, { PopoverProps } from "./Popover"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Popover",
  component: Popover,
} as Meta

const Template: Story<PopoverProps> = (props) => <Popover {...props} />

// Each story then reuses that template
export const LightTheme = Template.bind({})
LightTheme.args = {
  isVisible: true,
  isInteractive: true,
  content: <div style={{ height: 50, width: 100 }}>Popover Content</div>,
  children: <button>Reference Element</button>,
  theme: "light",
}

export const DarkTheme = Template.bind({})
DarkTheme.args = {
  ...LightTheme.args,
  theme: "dark",
}

export const WithArrow = Template.bind({})
WithArrow.args = {
  ...DarkTheme.args,
  hasArrow: true,
}

export const WithBackgroundOverlay = Template.bind({})
WithBackgroundOverlay.args = {
  ...LightTheme.args,
  hasBackgroundOverlay: true,
}

export const Playground = Template.bind({})
Playground.decorators = [
  (Story) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 900,
        height: 900,
      }}
    >
      <Story />
    </div>
  ),
]
Playground.args = {
  children: (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "tomato",
        height: 200,
        width: 200,
        padding: 16,
        borderRadius: 8,
      }}
    >
      Scroll to see how the popover moves
    </div>
  ),
  content: <div style={{ height: 50, width: 100 }}>any kind of content</div>,
}
